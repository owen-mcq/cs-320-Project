import mongoose from "mongoose";

// define schema for how data is formatted and stored
const exerciseSchema = new mongoose.Schema({
  exerciseId: { type: String, required: true },
  name: { type: String, required: true },
  targetMuscles: { type: [String], required: true },
  equipment: { type: [String], required: true },
  instructions: { type: [String], required: true },
});

export default Exercise = mongoose.model("Exericise", exerciseSchema);
