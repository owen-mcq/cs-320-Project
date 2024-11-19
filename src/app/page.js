import Form from "@/app/components/exerciseForm";
import Link from "next/link";
import Nav from '@/app/components/nav'
const { MongoClient } = require('mongodb');

async function storeWorkout(workout) {
  'use server'
    const client = new MongoClient('mongodb://localhost:27017');
    try {
        // Connect the client
        await client.connect();
        
        const coll = client.db('workoutAppBackend').collection('workouts');
        const exercises = workoutToSave.exercises;

        const insertPromises = workoutToSave.map(exercise =>
            coll.updateOne(
                { exerciseId: exercise.exerciseId },
                { $set: exercise },
                { upsert: true }
            )
        );
        await Promise.all(insertPromises);
    } catch (error) {
        console.error(error);
    } finally {
      await client.close();
    }
    // Save workoutToSave into the database
}

export default async function Home() {
  return (
    <div className="min-h-screen p-4">
      <main className="max-w-4xl mx-auto">
        <a href="/api/logout">Logout</a>
        <Link href='past'>View Past Workout</Link>
        <Form storeWorkout={storeWorkout} />
      </main>
    </div>
  );
}
