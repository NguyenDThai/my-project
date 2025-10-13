/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import User from "@/models/Users";
import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session?.user?.email) {
      return NextResponse.json(
        { message: "Bạn chưa đăng nhập" },
        { status: 401 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email: session.user?.email }).select(
      "name image email"
    );

    if (!user) {
      return NextResponse.json(
        { message: "Không tìm thấy thông tin người dùng" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Lỗi khi lấy profile:", error);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
