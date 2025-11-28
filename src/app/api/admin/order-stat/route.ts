import { NextResponse } from "next/server";
import Orders from "@/models/Orders";
import { connectDB } from "@/lib/db";

export async function GET() {
  await connectDB();

  const aggregate = await Orders.aggregate([
    {
      $group: {
        _id: { $month: "$createdAt" },
        total: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return NextResponse.json({ data: aggregate });
}
