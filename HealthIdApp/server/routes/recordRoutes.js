import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";
import {
  uploadRecord,
  getPatientRecords,
} from "../controllers/recordController.js";
import { protectHospital } from "../middleware/hospitalAuth.js";

const router = express.Router();

/* ======================================================
   1️⃣ Upload Medical Record (Hospital Only)
   POST /api/records/upload
====================================================== */
router.post(
  "/upload",
  protectHospital, // hospital must be logged in
  upload.single("file"), // Cloudinary upload middleware
  uploadRecord,
);

/* ======================================================
   2️⃣ Get Patient Records (After OTP Consent)
   GET /api/records/:healthId
====================================================== */
router.get("/:healthId", protectHospital, getPatientRecords);

export default router;
