import mongoose from "mongoose";

// define schema for how data is formatted and stored
const exerciseSchema = new mongoose.Schema({
  exerciseId: { type: String, required: true },
  name: { type: String, required: true },
  bodyParts: { type: [String], required: true },
  targetMuscles: { type: [String], required: true },
  equipment: { type: [String], required: true },
  instructions: { type: [String], required: true },
});

// create model and specify collection name
// exercises will be stored in "exercises" collection
const Exercise = mongoose.models?.Exercise || mongoose.model("Exercise", exerciseSchema, "exercises");

export default Exercise;
