import { connectDB } from "@/lib/db";
import Feedback from "@/models/Feedback";
import { NextResponse } from "next/server";

export async function POST(res: Request) {
  try {
    await connectDB();

    const body = await res.json();
    const { name, phone, message, email, subject } = body;

    if (!message) {
      return NextResponse.json(
        {
          message: "Nội dung phản hồi không được để trống",
        },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        {
          message: "Email không được để trống",
        },
        { status: 400 }
      );
    }

    await Feedback.create({
      name,
      phone,
      email,
      subject,
      message,
      status: "pending",
    });

    return NextResponse.json(
      { message: "Gửi phản hồi thành công" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
