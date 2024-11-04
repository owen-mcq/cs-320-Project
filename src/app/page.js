import Form from "@/app/components/exerciseForm";
import Link from "next/link";
const { MongoClient } = require('mongodb');

async function storeWorkout(workout) {
  'use server'
    const client = new MongoClient('mongodb://localhost:27017');
    try {
        // Connect the client
        await client.connect();
        // Insert document without using a transaction
        const coll = client.db('workoutAppBackend').collection('workouts');
        await coll.updateOne({date: 0}, {$set: {exercises: workout}}, {upsert: true});
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
        <Link href='past'>View Past Workout</Link>
        <Form storeWorkout={storeWorkout} />
      </main>
    </div>
  );
}
