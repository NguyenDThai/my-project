import { NextResponse } from "next/server";
import User from "@/models/Users";
import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { token, password, confirmPass } = await req.json();

    if (confirmPass !== password) {
      return NextResponse.json(
        { message: "Mật khẩu xác nhận không khớp" },
        { status: 400 }
      );
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Token không hợp lệ hoặc đã hết hạn" },
        { status: 400 }
      );
    }

    const salt = bcrypt.genSaltSync(10);

    user.password = bcrypt.hashSync(password, salt);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({
      message: "Mật khẩu của bạn đã được đặt lại thành công",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
