import mongoose, { Schema } from "mongoose";

export interface IOrder extends Document {
  userId: string;
  name: string;
  phone: string;
  address: string;
  note?: string;
  items: {
    productId: string;
    name: string;
    category?: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  totalPrice: number;
  shippingFee: number;
  paymentStatus: "pending" | "paid" | "failed";
  deliveryMethod: "delivery" | "pickup";
  status: "processing" | "shipped" | "completed" | "cancelled";
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    note: { type: String },
    items: [
      {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        category: { type: String },
        image: { type: String },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    shippingFee: { type: Number, default: 15000 },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    deliveryMethod: {
      type: String,
      enum: ["delivery", "pickup"],
      default: "delivery",
    },
    status: {
      type: String,
      enum: ["processing", "shipped", "completed", "cancelled"],
      default: "processing",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model<IOrder>("Order", OrderSchema);
