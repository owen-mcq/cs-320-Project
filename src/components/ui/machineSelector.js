'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { useActionState, useEffect, useState } from "react";
  import { PartSelector, EquipmentSelector } from "@/components/ui/selectors";
  import {getEquipment, saveEquipment} from "@/actions/saveEquipment";
  
export default function MachineSelector({init}) {
const [state, innerformAction] = useActionState(saveEquipment, init);
// const formAction = data => { innerformAction(data); setLocalState(state); };

  
  
    return (
      <div className="min-h-screen">
        <main className="w-full">
          <Card className="w-full">
          <CardHeader>
            <CardTitle>My Equipment</CardTitle>
            <CardDescription>
              Specify equipment to use in exercises
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={innerformAction}>
              <EquipmentSelector
                // onLoad={onload}
                selectedEquipment={JSON.parse(state)}
              />
            </form>
          </CardContent>
        </Card>
        </main>
      </div>
    );
}