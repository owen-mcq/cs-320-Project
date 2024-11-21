"use client"

import Link from "next/link";
import { ExerciseForm } from "@/components/ui/workout-form";
// const { MongoClient } = require("mongodb");
import { useSession } from "next-auth/react";

// async function storeWorkout(workout) {
//   "use server";
//   const client = new MongoClient("mongodb://localhost:27017");
//   try {
//     // Connect the client
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
//   // Save workoutToSave into the database
// }

export default function Home() {
  // const { data: session, status } = useSession();
  // console.log(status)

  return (
    <div className="min-h-screen">
      <main className="w-full">
        <ExerciseForm />
      </main>
    </div>
  );
}
