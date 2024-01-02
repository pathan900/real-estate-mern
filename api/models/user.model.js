import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Pasword is required"],
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;