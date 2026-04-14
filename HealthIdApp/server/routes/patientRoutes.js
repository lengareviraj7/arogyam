import express from "express";
import {
  getPatientProfile,
  getMyRecords,
  getMyConsents,
  getMyHospitals,
  getHealthCard,
  updateMedicalProfile,
  addFamilyMember,
  getFamilyMembers,
  removeFamilyMember,
  updateFamilyMedical,
} from "../controllers/patientController.js";

import { protectPatient } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes protected (patient must be logged in)
router.use(protectPatient);

router.get("/profile", getPatientProfile);
router.get("/records", getMyRecords);
router.get("/consents", getMyConsents);
router.get("/hospitals", getMyHospitals);
router.get("/healthcard", getHealthCard);
router.put("/profile/update-medical", updateMedicalProfile);

/* ======================================================
   👨‍👩‍👧 FAMILY MANAGEMENT
====================================================== */
router.post("/family/add", addFamilyMember);
router.get("/family", getFamilyMembers);
router.delete("/family/:memberId", removeFamilyMember);
router.put("/family/:memberId/medical", updateFamilyMedical);
export default router;
