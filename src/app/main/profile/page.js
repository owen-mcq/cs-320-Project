import MachineSelector from "@/components/ui/machineSelector"
import { saveEquipment } from "@/actions/saveEquipment"
// import { useEffect, useState } from "react";

function PastWorkouts({ workouts }) {
  return (
  <ol>{
    workouts.map(elem => {
      return (<li>1</li>);
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
      <PastWorkouts workouts={[]}/>
    </>
  );
  }
  