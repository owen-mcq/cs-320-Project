"use client";

// imports for ui components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PartSelector, EquipmentSelector } from "@/components/selectors";

import { useState } from "react";

/**
 * This is a form that contains selectors for bodyparts and excluded equipment
 */
export function ExerciseForm() {
  // arrays to store the equipment and bodyparts that are selected
  const [equipment, setEquipment] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);

  // test onSubmit handler just to make sure everything works
  // TODO: make this work with API
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(equipment, bodyParts);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
      <div className="flex flex-row gap-2">
        <Card className="w-3/5">
          <CardHeader>
            <CardTitle>Workout Type</CardTitle>
          </CardHeader>
          <CardContent>
            <PartSelector
              selectedParts={bodyParts}
              setSelectedParts={setBodyParts}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Exclude Equipment</CardTitle>
            <CardDescription>
              Specify equipment to exlude from exercises
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EquipmentSelector
              selectedEquipment={equipment}
              setSelectedEquipment={setEquipment}
            />
          </CardContent>
        </Card>
      </div>
      <Button type="submit" className="h-10 w-1/2">
        Generate
      </Button>
    </form>
  );
}
