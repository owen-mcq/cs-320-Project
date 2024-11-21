import mongoose from "mongoose";
const { MONGODB_URI } = process.env;

// establish connection to local db
export async function connectDB() {
  try {
    // NOTE: I don't know the details as to how and why this works
    // but it works :/
    const { connection } = await mongoose.connect(MONGODB_URI);
    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}
