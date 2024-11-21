"use server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function register(values) {
  const { username, password } = values;

  try {
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
    const savedUser = await user.save();
  } catch (error) {
    console.log(error);
  }
}
