"use client";
import "./exerciseForm.css";
import { useState } from "react";
import List from "@/components/exerciseList";

export default function Form({ storeWorkout }) {
  const [workout, setWorkout] = useState([]);
  const [muscles, setMuscles] = useState("");

  async function handleSubmit() {
    try {
      const workout = await (
        await fetch("api/?" + new URLSearchParams({ muscle: muscles }))
      ).json();
      console.log(workout);
      setWorkout(workout);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  }

  return (
    <>
      <button onClick={() => storeWorkout(workout)}>Save Workout</button>
      <search>
        <form action={handleSubmit} className="mb-8">
          <ul>
            <li>
              <label>Core</label>
              <input type="checkbox" name="core"></input>
              <ul>
                <li>
                  <label>Abs</label>
                  <input type="checkbox" name="abs"></input>
                </li>
              </ul>
            </li>
            <li>
              <label>Arms</label>
              <input type="checkbox"></input>
            </li>
            <li>
              <label>Legs</label>
              <input type="checkbox"></input>
            </li>
          </ul>
          <label className="block mb-2">Enter muscle group:</label>
          <input
            value={muscles}
            onChange={(e) => setMuscles(e.target.value)}
            placeholder="e.g. abs, triceps, biceps"
            className="w-full border p-2 rounded mb-4"
            required
          />

          <button
            type="submit"
            disabled={!muscles.trim()}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Generate Workout
          </button>
        </form>
      </search>

      <List exercises={workout} />
    </>
  );
}
