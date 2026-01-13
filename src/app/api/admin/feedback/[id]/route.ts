import { connectDB } from "@/lib/db";
import Feedback from "@/models/Feedback";
import { NextResponse } from "next/server";

export async function PATCH(
  res: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = await params;

    const { status } = await res.json();

    if (!["approved", "rejected"].includes(status)) {
      return NextResponse.json(
        { message: "Trạng thái không hợp lệ" },
        { status: 400 }
      );
    }

    const feedback = await Feedback.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    return NextResponse.json(feedback);
  } catch (error) {
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
