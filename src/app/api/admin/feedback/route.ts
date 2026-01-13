/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import Feedback from "@/models/Feedback";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const status = searchParams.get("status");

    const skip = (page - 1) * limit;

    const filter: any = {};
    if (status && status !== "all") {
      filter.status = status;
    }

    const [feedbacks, total] = await Promise.all([
      Feedback.find(filter).sort({ createdat: -1 }).skip(skip).limit(limit),
      Feedback.countDocuments(filter),
    ]);

    return NextResponse.json({
      data: feedbacks,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
