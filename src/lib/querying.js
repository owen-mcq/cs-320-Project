const { MongoClient } = require("mongodb");

export default async function findWorkout(bodyPartList, includedEquipment) {
  // bodyParts - array of strings i.e. ["waist", "chest"]
  // includedEquipment - array of strings i.e. ["band", "barbell"]

  const client = new MongoClient("mongodb://localhost:27017");
  console.log(bodyPartList);
  try {
    await client.connect();

    // database name: workoutAppBackend 
    // collection name: exercises
    const coll = client.db("workoutAppBackend").collection("exercises");

    const query = {
      bodyParts: { $in: bodyPartList },
      exEquipment: { $in: includedEquipment }
    };

    const exercises = await coll.find(query).limit(12).toArray();

    // returns an array of exercises documents that match the query
    // limited to a maximum of 12 exercises
    return exercises;

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