import Orders from "@/models/Orders";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function GET(_req: Request) {
  try {
    await connectDB();

    const reviews = await Orders.find(
      { "review.approved": true },
      {
        name: 1,
        review: 1,
        items: 1,
      }
    )
      .sort({ "review.created": -1 })
      .limit(10);

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
