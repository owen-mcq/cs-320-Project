// script to load data from api and store in local database
import mongoose from "mongoose";
import Exercise from "../models/Exercise.js";
// import { getExercises } from "./get_exercises.mjs";

const api = "http://exercisedb-api.vercel.app";

// get all exercises from the api
export async function getExercises() {
  const h = async url => (await ((await fetch(url)).json())).data;
  const results = [];
  // Get for all pages
  for (let nextUrl = `${api}/api/v1/exercises?offset=0&limit=100`, data = await h(nextUrl); data.nextPage; nextUrl = data.nextPage, data = await h(nextUrl)) {
    results.push(data.exercises);
  }
  return results.flat();
}


async function run() {
  await mongoose.connect("mongodb://127.0.0.1:27017/workoutAppBackend");
  // returns 14 x 100 (ish) array of exercises
  const data = await getExercises();
  try {
    for (const exercise of data) {
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
    console.log("exercises saved");
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.connection.close();
  }
}

run();
