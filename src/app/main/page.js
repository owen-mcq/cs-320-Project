"use client"

import { ExerciseForm } from "@/components/ui/workout-form";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="w-full">
        <ExerciseForm />
      </main>
    </div>
  );
}
