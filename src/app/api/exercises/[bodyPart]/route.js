import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Exercise from "@/models/Exercise";
import assert from "assert";

/**
 * GET handler for fetching exercises from mongoDB
 *
 * @param request HTTP request object, should contain optional "equipment" and "limit" fields
 * @param params contains dynamic route segments, in this case just the "bodyPart"
 *
 * @returns JSON of fetched exercises
 */
export async function GET(request, { params }) {
  const { bodyPart } = await params;
  assert(bodyPart, "no body part specified");

  const { searchParams } = new URL(request.url);
  const equipment = searchParams.get("equipment");
  const limit = searchParams.get("limit");

  // pipeline of queries to sent to mongo
  const pipeline = [{ $match: { bodyParts: { $in: [bodyPart] } } }];

  // filter by equipment too if defined
  if (equipment) {
    pipeline.push({ $match: { equipment: { $in: [equipment] } } });
  }

  // randomly sample from results
  const size = limit ? Number(limit) : 4;
  pipeline.push({ $sample: { size: size } });

  await connectDB();
  const exercises = await Exercise.aggregate(pipeline);

  return NextResponse.json(exercises);
}
