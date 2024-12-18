'use client'

import { ExerciseForm } from "@/components/ui/workout-form";
import { useActionState, useEffect, useState } from "react";
import handler from '@/actions/returnExercises';
import { MutableList } from '@/components/ui/exerciseList';

export default function Home() {
  // State is serialized data

  const [state, formAction] = useActionState(handler, "[]");
  const [localState, setLocalState] = useState([]);
  useEffect(() => {
    setLocalState(JSON.parse(state));
  }, [state]);

  return (
    <div className="min-h-screen">
      <main className="w-full">
        <ExerciseForm handler={formAction}/>
        <MutableList exercises={localState} setLocalState={setLocalState}/>
      </main>
    </div>
  );
}
