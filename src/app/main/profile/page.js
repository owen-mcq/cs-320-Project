

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { useActionState, useEffect, useState } from "react";
// import { PartSelector, EquipmentSelector } from "@/components/ui/selectors";
// import {getEquipment, saveEquipment} from "@/actions/saveEquipment";
import MachineSelector from "@/components/ui/machineSelector"
import { saveEquipment } from "@/actions/saveEquipment"

export default async function Home() {
  return <MachineSelector init={await saveEquipment()}></MachineSelector>
  // const [isPending, startTransition] = useTransition();
  // const [data, setData] = useState("[]");
  // function onload() {startTransition(async () => {
  //   setData(await saveEquipment());
  // })
// }
// const [localState, setLocalState] = useState("[]");
// useEffect(() => {
//   saveEquipment().then(resp => setLocalState(resp));
// });
// console.log(localState)

  }
  