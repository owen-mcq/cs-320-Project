const api = "http://exercisedb-api.vercel.app";

async function get(url) {
  const exercises = await fetch(url);
  const json = await exercises.json();
  const data = json.data;

  return data;
}

// get all exercises from the api
export async function getExercises() {
  const exercises = await fetch(`${api}/api/v1/exercises?offset=0&limit=100`);
  const json = await exercises.json();
  let data = json.data;

  console.log(data.exercises);

  let next = data.nextPage;

  while (next) {
    data = await get(next);

    next = data.nextPage;
    console.log(data.exercises);
  }
}
