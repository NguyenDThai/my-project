/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/Users";
import { sendResetEmail } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
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
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const expiry = new Date(Date.now() + 3600000); // 1 hour from now

    // resetToken trong DB
    user.resetToken = resetTokenHash;
    user.resetTokenExpiry = expiry;
    await user.save();

    await sendResetEmail(email, resetToken);

    return NextResponse.json({
      success: true,
      message: "Hãy kiểm tra email của bạn để đặt lại mật khẩu",
      token: resetToken,
    });
  } catch (error: any) {
    console.error("Forgot password error:", error); // 👈 log lỗi
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
