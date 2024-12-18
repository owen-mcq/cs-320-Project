'use server'

import queryer from '@/lib/querying';
import Workout from '@/models/Workout';
import mongoose from 'mongoose';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";


async function storeWorkout(workout) {
  // await mongoose.connect("mongodb://127.0.0.1:27017/workoutAppBackend");
  
  await connectDB();
  const session = await getServerSession(authOptions);
  const username = session.user.username;
  let tommorrow = new Date();
  tommorrow.setDate(tommorrow.getDate() + 1);
  const exerciseIds = workout.map(exercise => exercise.exerciseId);
  await Workout.updateOne({username: username, date: {$gte: new Date().toDateString(), $lt: tommorrow}}, {exerciseIds: exerciseIds}, {upsert: true});
  // await mongoose.disconnect();
}

export default async function request(_, form) {
    const data = form.entries().filter(([_, value]) => value === 'on').map(([key, _]) => key);
    // console.log(form)
    // const h_check_seperator = pattern => data.map((value) => {
    //     const match = value.match(pattern);
    //     if (match) {
    //         return match[1];
    //     }
    // }).filter(Boolean);
    // const equipment = h_check_seperator(/equipment_(.*)/);
    // const muscles = h_check_seperator(/parts_(.*)/);
    const workout = await queryer(Array.from(data), []);
    await storeWorkout(workout);
    return JSON.stringify(workout);
  }