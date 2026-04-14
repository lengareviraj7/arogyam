import Patient from "../models/Patient.js";
import MedicalRecord from "../models/MedicalRecord.js";
import Consent from "../models/Consent.js";
import HospitalPatient from "../models/HospitalPatient.js";
import generateHealthId from "../utils/generateHealthId.js";
import generateQR from "../utils/qrGenerator.js";

/* ======================================================
   GET PROFILE
====================================================== */
export const getPatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findById(req.patient._id);

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

/* ======================================================
   GET MY RECORDS
====================================================== */
export const getMyRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find({
      patient: req.patient._id,
    }).populate("hospital", "hospitalName email");

    res.status(200).json({
      totalRecords: records.length,
      records,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch records" });
  }
};

/* ======================================================
   GET MY CONSENTS
====================================================== */
export const getMyConsents = async (req, res) => {
  try {
    const consents = await Consent.find({
      patientId: req.patient._id,
    }).populate("hospitalId", "hospitalName email");

    res.status(200).json(consents);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch consents" });
  }
};

/* ======================================================
   GET MY HOSPITALS
====================================================== */
export const getMyHospitals = async (req, res) => {
  try {
    const hospitalLinks = await HospitalPatient.find({
      patientId: req.patient._id,
    }).populate("hospitalId", "hospitalName email address phone");

    res.status(200).json(hospitalLinks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch hospitals" });
  }
};

/* ======================================================
   GET HEALTH CARD
====================================================== */
export const getHealthCard = async (req, res) => {
  try {
    const patient = await Patient.findById(req.patient._id);

    res.status(200).json({
      name: patient.name,
      healthId: patient.healthId,
      qrCode: patient.qrCode,
      bloodGroup: patient.bloodGroup,
      phone: patient.phone,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch health card" });
  }
};

/* ======================================================
   UPDATE MEDICAL PROFILE
====================================================== */
export const updateMedicalProfile = async (req, res) => {
  try {
    const { bloodGroup, allergies, emergencyContact } = req.body;

    const patient = await Patient.findById(req.patient._id);

    if (!patient) return res.status(404).json({ message: "Patient not found" });

    if (bloodGroup) patient.bloodGroup = bloodGroup;
    if (allergies) patient.allergies = allergies;
    if (emergencyContact) patient.emergencyContact = emergencyContact;

    await patient.save();

    res.json({
      message: "Medical profile updated",
      patient,
    });
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

/* ======================================================
   ADD FAMILY MEMBER (AADHAAR BASED)
====================================================== */
export const addFamilyMember = async (req, res) => {
  try {
    const { name, phone, aadhaar, relation, age, bloodGroup, allergies } =
      req.body;

    const mainPatient = await Patient.findById(req.patient._id);

    if (!mainPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const cleanAadhaar = aadhaar && aadhaar.trim() !== "" ? aadhaar.trim() : undefined;

    /* 🔍 CHECK EXISTING BY AADHAAR */
    let existing = null;

    if (cleanAadhaar) {
      existing = await Patient.findOne({ aadhaar: cleanAadhaar });
    }

    if (existing) {
      if (mainPatient.familyMembers.includes(existing._id)) {
        return res.status(400).json({
          message: "Family member already added",
        });
      }

      mainPatient.familyMembers.push(existing._id);
      await mainPatient.save();

      return res.json({
        message: "Existing family member linked",
        member: existing,
      });
    }

    /* 🆕 CREATE NEW MEMBER */

    const cleanPhone = phone && phone.trim() !== "" ? phone.trim() : undefined;

    const uniqueBase = cleanAadhaar || cleanPhone || `${name}-${Date.now()}`;

    const healthId = generateHealthId(uniqueBase);
    const qrCode = await generateQR(healthId);

    const newMember = await Patient.create({
      name,
      phone: cleanPhone,
      aadhaar: cleanAadhaar,
      age,
      relation,
      bloodGroup,
      allergies,
      healthId,
      qrCode,
      createdBy: req.patient._id,
      role: "FAMILY", // ⭐ IMPORTANT
    });

    mainPatient.familyMembers.push(newMember._id);
    await mainPatient.save();

    return res.status(201).json({
      message: "Family member added",
      member: newMember,
    });
  } catch (error) {
    console.log("Add Family Error:", error);
    return res.status(500).json({ message: "Failed to add member" });
  }
};

/* ======================================================
   GET FAMILY MEMBERS
====================================================== */
export const getFamilyMembers = async (req, res) => {
  try {
    const patient = await Patient.findById(req.patient._id).populate(
      "familyMembers",
      "-aadhaar -loginOTP -otpExpiry",
    );

    res.json({
      total: patient.familyMembers.length,
      familyMembers: patient.familyMembers,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch family" });
  }
};

/* ======================================================
   REMOVE FAMILY MEMBER
====================================================== */
export const removeFamilyMember = async (req, res) => {
  try {
    const { memberId } = req.params;

    const patient = await Patient.findById(req.patient._id);

    patient.familyMembers = patient.familyMembers.filter(
      (id) => id.toString() !== memberId,
    );

    await patient.save();

    res.json({ message: "Family member removed" });
  } catch (error) {
    res.status(500).json({ message: "Remove failed" });
  }
};

/* ======================================================
   UPDATE FAMILY MEMBER MEDICAL
====================================================== */
export const updateFamilyMedical = async (req, res) => {
  try {
    const { memberId } = req.params;
    const { bloodGroup, allergies, emergencyContact } = req.body;

    const member = await Patient.findById(memberId);

    if (!member) return res.status(404).json({ message: "Member not found" });

    // 🔐 only owner can edit
    if (member.createdBy?.toString() !== req.patient._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (bloodGroup) member.bloodGroup = bloodGroup;
    if (allergies) member.allergies = allergies;
    if (emergencyContact) member.emergencyContact = emergencyContact;

    await member.save();

    res.json({
      message: "Family medical updated",
      member,
    });
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};
