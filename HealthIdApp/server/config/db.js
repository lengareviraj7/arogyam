import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;

const connectDB = async () => {
  try {
    // Try real MongoDB first
    if (process.env.MONGO_URI && process.env.MONGO_URI !== "mongodb://localhost:27017/healthid") {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("✅ Connected to MongoDB (remote)");
      return;
    }

    // Try local MongoDB
    try {
      await mongoose.connect("mongodb://localhost:27017/healthid", {
        serverSelectionTimeoutMS: 3000,
      });
      console.log("✅ Connected to local MongoDB");
      return;
    } catch (localErr) {
      console.log("⚠️  Local MongoDB not running, starting in-memory server...");
    }

    // Fallback to in-memory MongoDB
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    console.log("✅ Connected to in-memory MongoDB (dev mode)");
    console.log("⚠️  Data will be lost on server restart!");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    throw error;
  }
};

export default connectDB;
