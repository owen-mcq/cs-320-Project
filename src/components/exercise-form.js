"use client";
import { useState } from "react";
import Image from "next/image";
import bodyParts from "@/data/body-parts";
import BodyCard from "@/components/ui/body-card";

/**
 * Form component that takes in options and generates exercises for
 * a workout
 */
export default function ExerciseForm() {
  const [exercises, setExercises] = useState([]);
  const [options, setOptions] = useState([]);

  const { upperBody, lowerBody, other } = bodyParts;
  console.log(upperBody);

  // On submit handler, fetches exercises and displays them
  const fetchExercises = async (event) => {
    // prevent page from refreshing
    event.preventDefault();

    try {
      const results = await Promise.all(
        options.map(async (option) => {
          const data = await fetch(
            `http://localhost:3000/api/exercises/${option}?limit=4`,
          );

          const json = await data.json();
          return json;
        }),
      );
      setExercises(results.flat());
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (option) => {
    // add option to options, unless already selected
    setOptions((prev) => {
      return prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option];
    });
  };

  return (
    <div className="flex flex-col h-full w-screen items-center justify-center">
      <form className="w-7/12 grid grid-cols-3 gap-2">
        <BodyCard
          title="Upper Body"
          parts={upperBody}
          options={options}
          handleChange={handleChange}
        />
        <BodyCard
          title="Lower Body"
          parts={lowerBody}
          options={options}
          handleChange={handleChange}
        />
        <BodyCard
          title="Other"
          parts={other}
          options={options}
          handleChange={handleChange}
        />
      </form>
      <button
        onClick={fetchExercises}
        className="text-3xl bg-black text-white rounded-md py-2 px-4 items-center"
      >
        Generate
      </button>

      <div className="grid grid-cols-2 gap-2">
        {exercises.length > 0
          ? exercises.map((exercise) => (
              <div
                key={exercise.name}
                className="flex w-full gap-2 rounded-xl shadow-card border border-slate-200"
              >
                <Image
                  src={exercise.gifUrl}
                  alt="Exercise gif"
                  width={150}
                  height={150}
                  unoptimized={true}
                  className="rounded-lg p-1"
                  loaded="lazy"
                />
                <div className="flex flex-col p-2">
                  <p className="font-bold">{exercise.name}</p>
                  <p>Target parts: {exercise.bodyParts}</p>
                  <p>Equipment: {exercise.equipment}</p>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
