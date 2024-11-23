"use server";
import mongoose from "mongoose";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function register(values) {
  const { username, password } = values;

  try {
    const { connection } = await mongoose.connect('mongodb://127.0.0.1:27017/workoutAppBackend');
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
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
    await mongoose.disconnect();
  } catch (error) {
    console.log(error);
  }
}
