"use client";

import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

export function PartSelector({ selectedParts, setSelectedParts }) {
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
      items={bodyParts}
      columns={"4"}
      selectedValues={selectedParts}
      setSelectedValues={setSelectedParts}
    />
  );
}

export function EquipmentSelector({ selectedEquipment, setSelectedEquipment }) {
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

  return (
    <Selector
      items={equipment}
      columns={"6"}
      borderColor="red-500"
      selectedValues={selectedEquipment}
      setSelectedValues={setSelectedEquipment}
    />
  );
}

/**
 * Base selctor component that takes in a list of objects and makes them toggle components
 * TODO: Add a "clear selection" function
 */
export function Selector({
  items = [],
  columns = "4",
  borderColor = "black",
  selectedValues = [],
  setSelectedValues,
}) {
  return (
    <div className={`grid grid-cols-${columns} items-center gap-2`}>
      {items.map((item) => {
        const isPressed = selectedValues.includes(item);
        return (
          <Toggle
            key={item}
            className={cn(
              "flex items-center jusitfy-center text-black text-xs border-2",
              isPressed
                ? `border-${borderColor}`
                : "border-transparent bg-gray-50",
            )}
            pressed={isPressed}
            onPressedChange={(pressed) => {
              const newValue = pressed
                ? [...selectedValues, item]
                : selectedValues.filter((val) => val !== item);
              setSelectedValues(newValue);
            }}
          >
            {item}
          </Toggle>
        );
      })}
    </div>
  );
}
