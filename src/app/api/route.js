import { NextResponse } from "next/server";
const api = "http://exercisedb-api.vercel.app/";

export async function GET(request) {
  // Want exercise within muscle group parameters and within time if we have time data
  // favor exercises that the user liked
  let muscles = [];
  for (const [key, value] of request.nextUrl.searchParams) {
    if (key === "muscle") muscles = value.split(",");
  }
  console.log(muscles);
  const exercises = await Promise.all(
    muscles.map(async (muscle) =>
      (await fetch(api + `api/v1/muscles/${muscle}/exercises`)).json(),
    ),
  );

  return NextResponse.json(exercises);
}
