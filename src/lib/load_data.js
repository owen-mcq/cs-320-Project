// script to load data from api and store in local database
import mongoose from "mongoose";
import Exercise from "../models/Exercise.js";
import { getExercises } from "./get_exercises.js";

async function run() {
  await mongoose.connect("mongodb://127.0.0.1:27017/workoutAppBackend");

  try {
    // returns 14 x 100 (ish) array of exercises
    const data = await getExercises();

    for (const page of data) {
      for (const exercise of page) {
        // checks if exercise is already in database (prevent dupes)
        const exists = await Exercise.findOne({
          exerciseId: exercise.exerciseId,
        });
        if (!exists) {
          const newExercise = new Exercise({
            exerciseId: exercise.exerciseId,
            name: exercise.name,
            bodyParts: exercise.bodyParts,
            targetMuscles: exercise.targetMuscles,
            equipment: exercise.equipment,
            instructions: exercise.instructions,
          });

          // save this specific exercise to mongo
          await newExercise.save();
        }
      }
    }
    console.log("exercises saved");
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.connection.close();
  }
}

run();
