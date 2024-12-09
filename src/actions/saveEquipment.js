"use server";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import User from '@/models/User'


export async function saveEquipment(previousState, form) {
    const connection = await mongoose.connect("mongodb://127.0.0.1:27017/workoutAppBackend");
    const session = await getServerSession(authOptions);
    const username = session.user.username;

    if (form === undefined){
        console.log('daf')
        return JSON.stringify(await (await User.findOne({ username: username })).get('equipment'));
    }
       
    const data = Array.from(form.entries().filter(([_, value]) => value === 'on').map(([key, _]) => key));
    const equipment = await User.updateOne({ username: username }, {equipment: data});
    //   console.log(data)
      // console.log(data)
    return JSON.stringify(data);
}