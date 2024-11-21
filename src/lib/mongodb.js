import mongoose from "mongoose";
const { MONGODB_URI } = process.env;

export async function connectDB() {
  try {
    // attempt to connect to mongoDB
    const { connection } = mongoose.connect(MONGODB_URI);
    // connection successful
    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    // connection failed
    return Promise.reject(error);
  }
}
