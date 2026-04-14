import Patient from "../models/Patient.js";
import Hospital from "../models/Hospital.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import generateHealthId from "../utils/generateHealthId.js";
import generateQR from "../utils/qrGenerator.js";

/* ======================================================
   PATIENT REGISTRATION
====================================================== */
export const registerPatient = async (req, res) => {
  try {
    const { name, phone, aadhaar, email } = req.body;

    if (!name || !phone || !aadhaar) {
      return res.status(400).json({ message: "Name, phone, and aadhaar required" });
    }

    // check existing patient using phone
    const existingPatient = await Patient.findOne({ phone });
    if (existingPatient) {
      return res.status(400).json({ message: "Patient already registered" });
    }

    // generate HealthID
    const healthId = generateHealthId();

    // generate QR code
    const qrCode = await generateQR(healthId);

    const patient = await Patient.create({
      name,
      phone,
      aadhaar,
      email,
      healthId,
      qrCode,
      role: "PRIMARY",
    });

    res.status(201).json({
      message: "Patient registered successfully",
      patient,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Patient registration failed" });
  }
};

/* ======================================================
   SEND OTP (mock — logs to console for dev)
====================================================== */
export const sendPatientOTP = async (req, res) => {
  try {
    const { phone } = req.body;

    const patient = await Patient.findOne({ phone });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // store temporarily in DB
    patient.loginOTP = otp;
    patient.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 mins
    await patient.save();

    // In development, log OTP. In production, integrate Twilio.
    console.log(`\n📱 OTP for ${phone}: ${otp}\n`);

    res.status(200).json({ message: "OTP sent successfully", devOTP: otp });
  } catch (error) {
    console.error("OTP error:", error);
    res.status(500).json({ message: "OTP sending failed" });
  }
};

/* ======================================================
   VERIFY OTP
====================================================== */
export const verifyPatientOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const patient = await Patient.findOne({ phone });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    if (patient.loginOTP !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (patient.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // clear OTP
    patient.loginOTP = null;
    patient.otpExpiry = null;
    await patient.save();

    // create JWT
    const token = jwt.sign(
      { id: patient._id, role: "patient" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(200).json({
      message: "Login successful",
      token,
      patient,
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};

/* ======================================================
   HOSPITAL REGISTRATION
====================================================== */
export const registerHospital = async (req, res) => {
  try {
    const {
      hospitalName,
      regNumber,
      address,
      email,
      phone,
      password,
    } = req.body;

    const existing = await Hospital.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Hospital already exists" });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // File path from local upload (if multer middleware ran)
    const licencePdf = req.file ? `/uploads/${req.file.filename}` : null;

    const hospital = await Hospital.create({
      hospitalName,
      regNumber,
      address,
      email,
      phone,
      password: hashedPassword,
      licencePdf,
      status: "pending",
    });

    res.status(201).json({
      message: "Hospital registration submitted. Pending admin approval.",
      hospital: {
        _id: hospital._id,
        hospitalName: hospital.hospitalName,
        email: hospital.email,
        status: hospital.status,
      },
    });
  } catch (error) {
    console.error("Hospital registration error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};

/* ======================================================
   HOSPITAL LOGIN
====================================================== */
export const loginHospital = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hospital = await Hospital.findOne({ email });
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    if (hospital.status !== "approved") {
      return res.status(403).json({
        message: "Hospital not verified by admin yet",
      });
    }

    const isMatch = await bcrypt.compare(password, hospital.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: hospital._id, role: "hospital" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(200).json({
      message: "Login successful",
      token,
      hospital: {
        _id: hospital._id,
        hospitalName: hospital.hospitalName,
        email: hospital.email,
        status: hospital.status,
        regNumber: hospital.regNumber,
        address: hospital.address,
        phone: hospital.phone,
      },
    });
  } catch (error) {
    console.error("Hospital login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};
