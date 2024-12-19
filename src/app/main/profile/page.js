import MachineSelector from "@/components/ui/machineSelector"
import { saveEquipment } from "@/actions/saveEquipment"
import { getWorkouts } from "@/actions/getWorkouts";
import './profile.css';
import { DisplayList } from "@/components/ui/exerciseList";
// import { useEffect, useState } from "react";



async function PastWorkouts({ workouts }) {
  'use client';
  
  return (
  <ol>{
    workouts.map(elem => {
      return (
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      <DisplayList toptext={elem.date.toDateString()} pexercises={elem.exercises}/>
      </li>);
    })
  }</ol>);
}

export default async function Home() {
  // const [pastWorkouts, setPastWorkouts] = useState([]);
  // useEffect(() => {

  // },[pastWorkouts]);
  return (
    <>
      <MachineSelector init={await saveEquipment()}></MachineSelector>
      <section>
        <h2>Your Past Workouts</h2>
        <PastWorkouts workouts={await getWorkouts()}/>
      </section>
    </>
  );
  }
  