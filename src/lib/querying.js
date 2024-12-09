const { MongoClient } = require("mongodb");
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import User  from "@/models/User";

async function getEquipment() {
  const connection = await mongoose.connect("mongodb://127.0.0.1:27017/workoutAppBackend");
  const session = await getServerSession(authOptions);
  const username = session.user.username;

  // const coll1 = client.db("workoutAppBackend").collection("users");
  const equipment = await (await User.findOne({ username: username })).get('equipment');
  return equipment;
}

export default async function findExercise(bodyPartList, _includedEquipment) {

  // bodyParts - array of strings i.e. ["waist", "chest"]
  // includedEquipment - array of strings i.e. ["band", "barbell"]

  const client = new MongoClient("mongodb://localhost:27017/");
  console.log(bodyPartList);
  try {
    await client.connect();

    // Database name: workoutAppBackend
    // Collection name: exercises
    const coll = client.db("workoutAppBackend").collection("exercises");
    const equipment = await getEquipment()

    // const workouts = await coll.find(query).limit(12).toArray();
    // console.log(workouts)
    // // returns an array of workout documents that match the query
    // // limited to a maximum of 12 exercises
    // return workouts;

    const exerciseCount = 12;
    const perBodyPart = Math.floor(exerciseCount / bodyPartList.length);
    const remaining = exerciseCount % bodyPartList.length;

    const exerciseCount = 12;
    const perBodyPart = Math.floor(exerciseCount / bodyPartList.length);
    const remaining = exerciseCount % bodyPartList.length;

    let exerciseList = [];

    for (let i = 0; i < bodyPartList.length; i++) {
      const bodyPart = bodyPartList[i];
      const limit = i < remaining ? perBodyPart + 1 : perBodyPart;

      const query = {
        bodyParts: bodyPart,
        exEquipment: { $nin: includedEquipment },
      };

      const exercises = await coll.find(query).limit(limit).toArray();
      exerciseList = exerciseList.concat(exercises);
    }

    // Shuffle the final results
    exerciseList = exerciseList.sort(() => Math.random() - 0.5);

    return exerciseList;

  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch workouts");
  } finally {
    await client.close();
  }
}



// async function storeWorkout(exercises) {
//   "use server";
//   const client = new MongoClient("mongodb://localhost:27017");
//   try {
//     await client.connect();

//     const coll = client.db("workoutAppBackend").collection("workouts");
//     const exercises = workoutToSave.exercises;

//     const insertPromises = workoutToSave.map((exercise) =>
//       coll.updateOne(
//         { exerciseId: exercise.exerciseId },
//         { $set: exercise },
//         { upsert: true },
//       ),
//     );
//     await Promise.all(insertPromises);
//   } catch (error) {
//     console.error(error);
//   } finally {
//     await client.close();
//   }

// }