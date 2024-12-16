import mongoose from "mongoose";

// define schema for how data is formatted and stored
const exerciseSchema = new mongoose.Schema({
  exerciseId: { type: String, required: true },
  name: { type: String, required: true },
  gifUrl: { type: String, required: false },
  bodyParts: { type: [String], required: true },
  targetMuscles: { type: [String], required: true },
  equipment: { type: [String], required: true },
  instructions: { type: [String], required: true },
});

// create model and specify collection name
// exercises will be stored in "exercises" collection
const Exercise =
  // check if Exercise schema already exists so as to not redefine it
  mongoose.models.Exercise ||
  mongoose.model("Exercise", exerciseSchema, "exercises");

export default Exercise;
