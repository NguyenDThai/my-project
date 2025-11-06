/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import User from "@/models/Users";
import { connectDB } from "@/lib/db";
import { authOptions } from "@/lib/authOptions";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json(
      { message: "Chức năng được phát triển cho admin" },
      { status: 401 }
    );
  }

  try {
    await connectDB();

    const { userId, role } = await req.json();

    if (!userId || !role) {
      return NextResponse.json(
        { message: "Thiếu userId hoặc role" },
        { status: 400 }
      );
    }

    const validRole = ["user", "admin"];
    if (!validRole.includes(role)) {
      return NextResponse.json(
        { message: "Role không hợp lệ" },
        { status: 400 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { role } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: "Không tìm thấy người dùng" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Cập nhật vai trò thành công",
      user: updatedUser,
    });
  } catch (error: any) {
    console.error("Lỗi cập nhật role:", error);
    return NextResponse.json(
      { message: "Lỗi server.", error: error.message },
      { status: 500 }
    );
  }
}
