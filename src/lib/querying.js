const { MongoClient } = require("mongodb");

export default async function findWorkout(bodyPartList, excludedEquipment) {
  // bodyParts - array of strings i.e. ["waist", "chest"]
  // excludedEquipment - array of strings i.e. ["band", "barbell"]

  const client = new MongoClient("mongodb://localhost:27017");
  console.log(bodyPartList);
  try {
    await client.connect();

    // database name: workoutAppBackend 
    // collection name: workouts
    const coll = client.db("workoutAppBackend").collection("exercises");

    const query = {
      bodyParts: { $in: bodyPartList },
      exEquipment: { $nin: excludedEquipment }
    };

    const workouts = await coll.find(query).limit(12).toArray();

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