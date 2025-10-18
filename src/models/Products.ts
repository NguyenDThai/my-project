import mongoose, { model, models } from "mongoose";

const productsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    category: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

const Product = models.Product || model("Product", productsSchema);

export default Product;
