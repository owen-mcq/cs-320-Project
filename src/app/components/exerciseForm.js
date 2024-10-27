"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Form() {
  // list of exercises state
  const [exercises, setExercises] = useState([]);
  // isloading state so that user can only request one workout at a time
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:3000/api/");
      const data = await res.json();
      setExercises(data.data.exercises);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form action={handleSubmit}>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Generate Workout"}
        </Button>
      </form>

      {/* if exercises were successfully fetched */}
      {exercises.length > 0 && (
        <>
          <h1>Exercises</h1>
          <ul className="grid grid-cols-4 gap-4 items-center">
            {exercises.map((item, index) => (
              <li className="w-52 mx-4" key={index}>
                <div>
                  <p>Exercise: {item.name}</p>
                  <p>Equipment: {item.equipments}</p>
                  <div>
                    Instructions:
                    {item.instructions.map((step, stepIndex) => (
                      <p key={stepIndex}>{step}</p>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
