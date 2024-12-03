'use client'

import { ExerciseForm } from "@/components/ui/workout-form";
import { useActionState } from "react";
import handler from '@/actions/returnExercises';
import ExerciseList from '@/components/ui/exerciseList';

export default function Home() {
  // State is serialized data
  const [state, formAction] = useActionState(handler, "[]");
  return (
    <div className="min-h-screen">
      <main className="w-full">
        <ExerciseForm handler={formAction}/>
        <ExerciseList exercises={JSON.parse(state)}/>
      </main>
    </div>
  );
}
