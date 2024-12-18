"use server";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import User from '@/models/User'


export async function saveEquipment(_previousState, form) {
    await mongoose.connect("mongodb://127.0.0.1:27017/workoutAppBackend");
    const session = await getServerSession(authOptions);
    const username = session.user.username;

    if (form === undefined){
        return JSON.stringify(await (await User.findOne({ username: username })).get('equipment'));
    }
       
    const data = Array.from(form.entries().filter(([_, value]) => value === 'on').map(([key, _]) => key));
    await User.updateOne({ username: username }, {equipment: data});
    await mongoose.disconnect();
    return JSON.stringify(data);
}