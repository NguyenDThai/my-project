import mongoose, { model, models } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false, minLength: 6 },
    image: { type: String, default: "" },
    provider: { type: String, default: "credentials" }, //Để biết user đăng nhập bằng hình thức gì
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);

export default User;
