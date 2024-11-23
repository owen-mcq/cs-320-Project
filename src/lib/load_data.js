import mongoose from "mongoose";
import Exercise from "@/lib/models/Exercise.js";
import { getExercises } from "@/lib/get_exercises.js";

async function run() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");

  try {
    const test = new Exercise({
      exerciseId: "131231",
      name: "pull up",
      bodyParts: ["back"],
      targetMuscles: ["waist"],
      equipment: ["body weight"],
      instructions: ["foo"],
    });

    await test.save();
    console.log("exercise saved");
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.connection.close();
  }
}

run();
