import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import User from "@/models/User";
import Exercise from "@/models/Exercise";
import connectDB from "@/lib/mongodb";

async function getEquipment() {
  // const connection = await mongoose.connect("mongodb://127.0.0.1:27017/workoutAppBackend");
  const session = await getServerSession(authOptions);
  const username = session.user.username;
  const equipment =  await User.findOne({ username: username }, 'equipment').exec();
  return equipment.equipment;
}

export default async function findExercise(bodyPartList, _includedEquipment) {
  // bodyParts - array of strings i.e. ["waist", "chest"]
  // includedEquipment - array of strings i.e. ["band", "barbell"]

  await connectDB();
  // await mongoose.connect("mongodb://localhost:27017/workoutAppBackend");
  console.log(bodyPartList);
  try {
    // Database name: workoutAppBackend
    // Collection name: exercises
    const equipment = await getEquipment();
    const exerciseCount = 12;
    const perBodyPart = Math.floor(exerciseCount / bodyPartList.length);
    const remaining = exerciseCount % bodyPartList.length;
    
    let exerciseList = [];

    for (let i = 0; i < bodyPartList.length; i++) {
      const bodyPart = bodyPartList[i];
      const limit = i < remaining ? perBodyPart + 1 : perBodyPart;

      const query = {
        bodyParts: bodyPart,
        equipment: {$in: equipment}
        
      };

      const exercises = await (Exercise.find(query).limit(limit).exec());
      // console.log(exercises)
      exerciseList = exerciseList.concat(exercises);
    }

    // Shuffle the final results
    exerciseList = exerciseList.sort(() => Math.random() - 0.5);
    return exerciseList;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch workouts");
  } finally {
    // await mongoose.disconnect();
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
