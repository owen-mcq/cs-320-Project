import mongoose from "mongoose";

// define schema for how data is formatted and stored
const workoutSchema = new mongoose.Schema({
    date: Date,
    username: String,
    exerciseIds: [String],

});

const Workout =
  mongoose.models.Workout ||
  mongoose.model("Workout", workoutSchema, "workouts");
export default Workout;
