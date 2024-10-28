"use client";
import { useState } from "react";

export default function Form() {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [muscles, setMuscles] = useState("");

  async function storeWorkout() {
    await fetch('api', {method: 'POST', body: JSON.stringify(exercises)});
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        "api/?" + new URLSearchParams({ muscle: muscles }),
      );
      const data = await res.json();
      setExercises(data[0].data.exercises);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (

    

    <div className="p-4">
      <form action={storeWorkout}>
    <button type="submit">
      Save Workout
    </button>
   </form>
      <form action={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block mb-2">Enter muscle group:</label>
          <input
            type="text"
            value={muscles}
            onChange={(e) => setMuscles(e.target.value)}
            placeholder="e.g. abs, triceps, biceps"
            className="w-full border p-2 rounded mb-4"
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !muscles.trim()}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          {isLoading ? "Loading..." : "Generate Workout"}
        </button>
      </form>

      {exercises.length > 0 && (
        <div>
          <h1 className="text-xl font-bold mb-4">Exercises</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exercises.map((item, index) => (
              <div key={index} className="border p-4 rounded">
                <p className="font-bold">Exercise: {item.name}</p>
                <p>Equipment: {item.equipments}</p>
                <div>
                  <p className="font-bold mt-2">Instructions:</p>
                  {item.instructions.map((step, stepIndex) => (
                    <p key={stepIndex} className="mt-1">
                      {step}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      
     
      )
     
    }
    </div>
  );
}
