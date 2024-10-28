"use client";
import { useState } from "react";

export default function Form() {
  // list of exercises state
  const [exercises, setExercises] = useState([]);
  // isloading state so that user can only request one workout at a time
  const [isLoading, setIsLoading] = useState(false);
  const [muscles, setMuscles] = useState("");

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      // const res = await fetch("http://localhost:3000/api/");
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
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <form action={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="muscles" className="text-sm font-medium">
            Enter muscle group:
          </label>
          <input
            id="muscles"
            type="text"
            value={muscles}
            onChange={(e) => setMuscles(e.target.value)}
            placeholder="e.g. abs, triceps, biceps"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !muscles.trim()}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {isLoading ? "Loading..." : "Generate Workout"}
        </button>
      </form>

      {/* if exercises were successfully fetched */}
      {exercises.length > 0 && (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Exercises</h1>
          <ul className="grid grid-cols-1 md:grid-cols2 lg:grid-cols-4 gap-4">
            {exercises.map((item, index) => (
              <li key={index} className="p-4 border rounded-lg shodow-sm">
                <div className="space-y-2">
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
        </div>
      )}
    </div>
  );
}
