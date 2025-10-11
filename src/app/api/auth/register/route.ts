/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import User from "@/models/Users";
import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password, confirmPassword } = await req.json();

    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { message: "Vui lòng nhập đầy đủ thông tin" },
        { status: 400 }
      );
    }

    if (confirmPassword !== password) {
      return NextResponse.json(
        { message: "Vui lòng nhập đúng mật khẩu trên" },
        { status: 400 }
      );
    }

    await connectDB();

    // Kiem tra email da ton tai chua

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Emai đã tồn tại" }, { status: 400 });
    }

    // Ma hoa mat khau

    const hashedPassword = await bcrypt.hash(password, 10);

    // Tao moi nguoi dung

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "Đăng ký thành công", user: newUser },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Lỗi đăng ký", error);
    return NextResponse.json(
      { message: "Lỗi Server", error: error.message },
      { status: 500 }
    );
  }
}
