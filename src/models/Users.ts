import mongoose, { model, models } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 6 },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);

export default User;
