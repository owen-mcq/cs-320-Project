"use client"

import Link from "next/link";
import { useState } from "react";
import { ExerciseForm } from "@/components/ui/workout-form";
import List from '@/components/ui/exerciseList';
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
  const [exercise, setExercise] = useState([]);
  // console.log(status)

  async function handleSubmit(event) {
    event.preventDefault();
    let muscles = await (await fetch("api/?" + new URLSearchParams({muscle: ['abs', 'calves']}))).json();
    
    setExercise(muscles);
  }

  return (
    <div className="min-h-screen">
      <main className="w-full">
        <ExerciseForm handleSubmit={handleSubmit}/>
        <List exercises={exercise}/>
      </main>
    </div>
  );
}
