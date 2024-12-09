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

export default async function findWorkout(bodyPartList, _excludedEquipment) {
  // bodyParts - array of strings i.e. ["waist", "chest"]
  // excludedEquipment - array of strings i.e. ["band", "barbell"]

  const client = new MongoClient("mongodb://localhost:27017/");
  console.log(bodyPartList);
  try {
    await client.connect();

    // database name: workoutAppBackend 
    // collection name: workouts
    const coll = client.db("workoutAppBackend").collection("exercises");
    const equipment = await getEquipment()
    const query = {
      bodyParts: { $in: bodyPartList },
      Equipment: { $in:  equipment}
    };

    const workouts = await coll.find(query).limit(12).toArray();
    console.log(workouts)
    // returns an array of workout documents that match the query
    // limited to a maximum of 12 exercises
    return workouts;

  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch workouts");
  } finally {
    await client.close();
  }
}


// async function storeWorkout(workout) {
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