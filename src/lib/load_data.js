import { getExercises } from "./get_exercises.js";

async function run() {
  const data = await getExercises();

  for (const page of data) {
    for (const exercise of page) {
    }
  }
}

run();
