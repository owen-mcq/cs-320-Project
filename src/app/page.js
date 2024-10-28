'use client'

import Form from "@/app/components/exerciseForm";
import { useState } from "react";
import Image from "next/image";

export default function Home() {// list of exercises state
  const [exercises, setExercises] = useState([]);
  // isloading state so that user can only request one workout at a time
  const [isLoading, setIsLoading] = useState(false);
  const [muscles, setMuscles] = useState("");

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      // const res = await fetch("http://localhost:3000/api/");
      const res = await fetch("api/?" + new URLSearchParams({ muscle: ["abs", "biceps"] }));
      const data = await res.json();
      let exercises = [];
      // const t = data[0].data.exercises.length;
      for (let i = 0; i < 12 && i < data[0].data.exercises.length; i++) {
        exercises.push(data[0].data.exercises.splice(Math.random() * (data[0].data.exercises.length - i), 1)[0]);
        // console.log(data[0].data.exercises.splice(Math.random() * (data[0].data.exercises.length - i), 1));
      }
      console.log(exercises)
      setExercises(exercises);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <main className="max-w-4xl mx-auto">
        <a href='past'>View Past Workout</a>
        <Form />
      </main>
    </div>
  );
}
