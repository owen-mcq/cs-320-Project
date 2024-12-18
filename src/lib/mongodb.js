import mongoose from "mongoose";

// establishes connection to local mongodb database
export default async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/workoutAppBackend");
  } catch (error) {
    console.log("Database connection failed ", error);
  }
}
