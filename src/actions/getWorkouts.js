'use server';
import Workout from '@/models/Workout';
import mongoose, { connect } from 'mongoose';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Exercise from '@/models/Exercise';

export async function getWorkouts() {
    'use server';
    await connectDB();
    const session = await getServerSession(authOptions);
    const username = session.user.username;
    let workouts = await Workout.find({username: username}).exec();
    workouts = await Promise.all(workouts.map(async workout => {
        return {
            date: workout.date,
            exercises: await Promise.all(workout.exerciseIds.map(async exercise => {
            // console.log(await Exercise.find({exerciseId: exercise}))
            return await Exercise.find({exerciseId: exercise})
        }))};
    }));
    console.log(workouts)
    return workouts;
}

export async function getWorkoutsClient() {
    return JSON.stringify(await getWorkouts());
}