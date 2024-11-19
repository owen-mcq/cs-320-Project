// import Form from "@/components/exerciseForm";
import Link from "next/link";
import SideNav from "@/app/components/side-nav";
const { MongoClient } = require('mongodb');

async function storeWorkout(workout) {
  "use server";
  const client = new MongoClient("mongodb://localhost:27017");
  try {
    // Connect the client
    await client.connect();

    const coll = client.db("workoutAppBackend").collection("workouts");
    const exercises = workoutToSave.exercises;

    const insertPromises = workoutToSave.map((exercise) =>
      coll.updateOne(
        { exerciseId: exercise.exerciseId },
        { $set: exercise },
        { upsert: true },
      ),
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
    <div className="min-h-screen">
      <main className="w-full">
        <ExerciseForm />
      </main>
    </div>
    </div>
    </div>
    </>
  );
}
