import { NextResponse } from "next/server";
const { MongoClient } = require('mongodb');
const api = "http://exercisedb-api.vercel.app/";

export async function GET(request) {
  // Want exercise within muscle group parameters and within time if we have time data
  // favor exercises that the user liked
  let muscles = [];
  for (const [key, value] of request.nextUrl.searchParams) {
    if (key === "muscle") muscles = value.split(",");
  }
 
  const exercises = await Promise.all(
    muscles.map(async (muscle) =>
      (await fetch(api + `api/v1/muscles/${muscle}/exercises`)).json(),
    ),
  );
//   console.log(exercises);
  return NextResponse.json(exercises);
}

export async function POST(request) {
    const workoutToSave = await request.json();
    const client = new MongoClient('mongodb://localhost:27017');
 
    try {
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


        console.log(await coll.findOne({date: 0}))
        console.log('Above is the inserted example of a workout');
        await client.close();
        return new Response();
    } catch (error) {
        console.error(error);
        await client.close();
    }
}
