"use server";
import mongoose from "mongoose";
import User from "@/models/User";
import bcrypt from "bcrypt";
import connectDB from "@/lib/mongodb";

export async function register(values) {
  const { username, password } = values;

  try {
    // await mongoose.connect("mongodb://127.0.0.1:27017/workoutAppBackend");
    await connectDB();
    const userFound = await User.findOne({ username });
    if (userFound) {
      return {
        error: "user with username already exists!",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      username,
      password: hashedPassword,
    });
    await user.save();
  } catch (error) {
    console.log(error);
  } finally {
    // await mongoose.disconnect();
  }
}
