const { MongoClient } = require("mongodb");

async function findWorkout(bodyPartList, excludedEquipment) {
  // bodyParts - array of strings i.e. ["waist", "chest"]
  // excludedEquipment - array of strings i.e. ["band", "barbell"]

  const client = new MongoClient("mongodb://localhost:27017");

  try {
    await client.connect();

    // database name: workoutAppBackend 
    // collection name: workouts
    const coll = client.db("workoutAppBackend").collection("workouts");

    const query = {
      bodyParts: { $in: bodyPartList },
      exEquipment: { $nin: excludedEquipment }
    };

    const workouts = await coll.find(query).toArray();

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