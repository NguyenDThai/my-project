/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import Orders from "@/models/Orders";
import stripe from "@/lib/stripe";

export async function POST(req: Request) {
  await connectDB();

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return new Response("Missing signature", { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook verify failed:", err.message);
    return new Response("Webhook error", { status: 400 });
  }

  // PAYMENT THÀNH CÔNG
  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object as any;

    const orderId = intent.metadata.orderId;

    await Orders.findByIdAndUpdate(orderId, {
      paymentStatus: "completed",
    });
  }

  // PAYMENT THẤT BẠI
  if (event.type === "payment_intent.payment_failed") {
    const intent = event.data.object as any;

    const orderId = intent.metadata.orderId;

    await Orders.findByIdAndUpdate(orderId, {
      paymentStatus: "failed",
    });
  }

  return new Response("OK", { status: 200 });
}
