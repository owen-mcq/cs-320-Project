import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: [true, "username already in use"],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    equipment: [String],
  },
  // require createdAt field when stored to db (I think?)
  { timestamps: true },
);

const User = mongoose.models?.User || model("User", UserSchema);
export default User;
