import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },

    recordType: {
      type: String,
      default: "General",
    },

    fileUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("MedicalRecord", medicalRecordSchema);
