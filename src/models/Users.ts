import mongoose, { model, models } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    addresses: {
      type: [
        {
          fullName: { type: String, required: true },
          phone: { type: String, required: true },
          address: { type: String, required: true },
          isDefault: { type: Boolean, default: false },
        },
      ],
      default: [],
    },
    phone: { type: Number, required: false },
    password: { type: String, required: false, minLength: 6 },
    image: { type: String, default: "" },
    role: { type: String, default: "user" },
    isActive: { type: Boolean, default: true },
    provider: { type: String, default: "credentials" }, //Để biết user đăng nhập bằng hình thức gì
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);

export default User;
