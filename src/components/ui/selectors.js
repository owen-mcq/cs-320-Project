"use client";

import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import "@/components/ui/selectors.css"
import { useActionState } from "react";
import handler from "@/actions/saveEquipment"
import { useState, useTransition } from 'react';



export function PartSelector({ selectedParts=[], onclick }) {
  const bodyParts = [
    "neck",
    "lower arms",
    "shoulders",
    "cardio",
    "upper arms",
    "chest",
    "lower legs",
    "back",
    "upper legs",
    "waist",
  ];
  return (
    <Selector
      // prefix="parts_"
      items={bodyParts}
      selectedValues={selectedParts}
      onclick={onclick}
    />
  );
}

export function EquipmentSelector({ selectedEquipment }) {
  const equipment = [
    "stepmill machine",
    "elliptical machine",
    "trap bar",
    "tire",
    "stationary bike",
    "wheel roller",
    "smith machine",
    "hammer",
    "skierg machine",
    "roller",
    "resistance band",
    "bosu ball",
    "weighted",
    "olympic barbell",
    "kettlebell",
    "upper body ergometer",
    "sled machine",
    "ez barbell",
    "dumbbell",
    "rope",
    "barbell",
    "band",
    "stability ball",
    "medicine ball",
    "assisted",
    "leverage machine",
    "cable",
    "body weight",
  ];

  // console.log(selectedEquipment)
  
  return (
    <Selector
      items={equipment}
      // selectedValues={selectedEquipment}
      onclick={event => event.target.form.requestSubmit()}
    />
  );
}

/**
 * Base selctor component that takes in a list of objects and makes them toggle components
 * TODO: Add a "clear selection" function
 */
export function Selector({
  // prefix,
  items = [],
  selectedValues = ["stepmill machine"],
  setSelectedValues,
  onclick = () => {},
}) {

  return (
    <div className={`grid grid-cols-4 items-center gap-2`}>
      {items.map((item, index) =>
        (
          <>
            <input
              type="checkbox"
              id={item}
              name={item}
              key={index + 1000}
              defaultChecked={selectedValues.includes(item)}
              onClick={onclick}
            />
            <label for={item} key={index}>{item}</label>
          </>
        )
      )}
    </div>
  );
}
