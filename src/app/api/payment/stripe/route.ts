import { connectDB } from "@/lib/db";
import Orders from "@/models/Orders";
import strite from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { orderId, amount } = await req.json();

    if (!orderId || !amount) {
      return NextResponse.json(
        { message: "Thiếu orderId hoặc amount" },
        { status: 400 }
      );
    }

    // kiểm tra order tồn tại
    const order = await Orders.findById(orderId);
    if (!order) {
      return NextResponse.json(
        { message: "Order không tồn tại" },
        { status: 404 }
      );
    }

    const paymentIntent = strite.paymentIntents.create({
      amount: amount * 100, // VND → đơn vị nhỏ nhất
      currency: "vnd",
      metadata: {
        orderId: order._id.toString(),
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: (await paymentIntent).client_secret,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json({ message: "Stripe error" }, { status: 500 });
  }
}
