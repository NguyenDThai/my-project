/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@/models/Users";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(res: Request) {
  try {
    const { email, password } = await res.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Vui lòng nhập email hoặc mật khẩu" },
        { status: 400 }
      );
    }

    await connectDB();

    // Tim nguoi dung trong mongoDB

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json(
        { message: "Người dùng không tồn tại" },
        { status: 404 }
      );
    }

    // Kiem tra mat khau

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Vui lòng nhập mật khẩu chính xác" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Đăng nhập thành công",
        user: { id: user._id, name: user.name, email: user.email },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Lỗi khi đăng nhập:", error);
    return NextResponse.json(
      { message: "Lỗi server", error: error.message },
      { status: 500 }
    );
  }
}
