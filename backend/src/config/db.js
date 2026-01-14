import mongoose from "mongoose";

let isConnected = false; // track connection

const connectDB = async () => {
  if (isConnected) return; // already connected

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    isConnected = conn.connections[0].readyState === 1;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
};

export default connectDB;
