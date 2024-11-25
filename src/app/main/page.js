"use client"

import Link from "next/link";
import { ExerciseForm } from "@/components/ui/workout-form";
// const { MongoClient } = require("mongodb");
import { useSession } from "next-auth/react";


export default function Home() {
  // const { data: session, status } = useSession();
  // console.log(status)

  return (
    <div className="min-h-screen">
      <main className="w-full">
        <ExerciseForm />
      </main>
    </div>
  );
}
