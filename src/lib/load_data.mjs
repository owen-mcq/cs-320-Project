// script to load data from api and store in local database
import mongoose from "mongoose";
import Exercise from "../models/Exercise.js";
import connectDB from "./mongodb.js";

const api = "http://exercisedb-api.vercel.app";

// get all exercises from the api
export async function getExercises() {
  const h = async (url) => (await (await fetch(url)).json()).data;
  const results = [];
  // Get for all pages
  for (
    let nextUrl = `${api}/api/v1/exercises?offset=0&limit=100`,
      data = await h(nextUrl);
    data.nextPage;
    nextUrl = data.nextPage, data = await h(nextUrl)
  ) {
    results.push(data.exercises);
  }
  return results.flat();
}

async function run() {
  await connectDB();
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
          gifUrl: exercise.gifUrl,
          bodyParts: exercise.bodyParts,
          targetMuscles: exercise.targetMuscles,
          equipment: exercise.equipments,
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
