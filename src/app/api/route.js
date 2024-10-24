import { NextResponse } from "next/server";
const api = 'https://exercisedb-api.vercel.app/';

export async function GET(request) {
    // Want exercise within muscle group parameters and within time if we have time data
    // favor exercises that the user liked
    for (const [key, value] of request.nextUrl.searchParams) {
        console.log(value.split(','));
    }
    const exercises = await (await fetch(api + `api/v1/bodyparts/${request}/exercises`)).json();
    // console.log(request.url);
    return NextResponse.json(exercises);
}
