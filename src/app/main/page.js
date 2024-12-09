'use client'

import { ExerciseForm } from "@/components/ui/workout-form";
import { useActionState, useState } from "react";
import handler from '@/actions/returnExercises';
import { MutableList } from '@/components/ui/exerciseList';

export default function Home() {
  // State is serialized data
  const [state, innerformAction] = useActionState(handler, "[]");
  const formAction = data => { innerformAction(data); setLocalState(JSON.parse(state));};
  const [localState, setLocalState] = useState(JSON.parse(state));
  return (
    <div className="min-h-screen">
      <main className="w-full">
        <ExerciseForm handler={formAction}/>
        <MutableList exercises={localState} setLocalState={setLocalState}/>
      </main>
    </div>
  );
}
