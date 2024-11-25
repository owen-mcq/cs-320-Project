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
import { PartSelector, EquipmentSelector } from "@/components/ui/selectors";

import { useState } from "react";

/**
 * This is a form that contains selectors for bodyparts and excluded equipment
 */
export function ExerciseForm({ handler }) {
  // arrays to store the equipment and bodyparts that are selected
  // const [equipment, setEquipment] = useState([]);
  // const [bodyParts, setBodyParts] = useState([]);

  return (
    <form
      action={handler}
      className="flex grow flex-col gap-2 items-center"
    >
      <div className="flex grow flex-rows justify-center gap-2">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Workout Type</CardTitle>
            <CardDescription>
              Select body parts to generate exercises for
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PartSelector
              // selectedParts={bodyParts}
              // setSelectedParts={setBodyParts}
            />
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Exclude Equipment</CardTitle>
            <CardDescription>
              Specify equipment to exlude from exercises
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EquipmentSelector
              // selectedEquipment={equipment}
              // setSelectedEquipment={setEquipment}
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
