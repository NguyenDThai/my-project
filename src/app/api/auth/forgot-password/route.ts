import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/Users";

export async function POST(req: Request) {
  await connectDB();
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json(
      { message: "Vui lòng nhập email" },
      { status: 400 }
    );
  }

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    return NextResponse.json(
      { success: false, message: "Email không tồn tại" },
      { status: 404 }
    );
  }

  const crypto = await import("crypto");
  const token = crypto.randomBytes(32).toString("hex");
  const expiry = new Date(Date.now() + 3600000); // 1 hour from now

  user.resetToken = token;
  user.resetTokenExpiry = expiry;
  await user.save();

  return NextResponse.json({
    success: true,
    message: "Hay kiểm tra email của bạn để đặt lại mật khẩu",
  });
}
