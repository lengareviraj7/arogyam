import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    phone: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      default: undefined,
    },

    email: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      default: undefined,
    },

    aadhaar: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      default: undefined,
    },

    healthId: {
      type: String,
      unique: true,
      required: true,
    },

    qrCode: String,

    loginOTP: String,
    otpExpiry: Date,

    bloodGroup: String,
    allergies: String,
    emergencyContact: String,

    // ================= FAMILY SYSTEM =================

    role: {
      type: String,
      enum: ["PRIMARY", "FAMILY"],
      default: "PRIMARY",
      required: true,
    },

    familyMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      default: null,
    },

    relation: String,
    age: Number,
  },
  { timestamps: true },
);

export default mongoose.model("Patient", patientSchema);
