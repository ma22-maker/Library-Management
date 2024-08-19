import mongoose from "mongoose";

const connectDB = async (MONGO_URL) => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
