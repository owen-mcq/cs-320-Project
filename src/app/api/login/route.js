import { NextResponse } from "next/server";

export async function POST(request) {
    let data = await request.json();
    console.log("User login by " + data.username);
    return new NextResponse();
}