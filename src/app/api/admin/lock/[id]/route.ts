import User from "@/models/Users";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { message: "Không tìm thấy người dùng" },
        { status: 404 }
      );
    }

    user.isActive = !user.isActive;

    await user.save();

    return NextResponse.json({
      success: true,
      message: user.isActive
        ? "Tài khoản đã được mở khóa"
        : "Tài khoản đã bị khóa",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Lỗi máy chủ" }, { status: 500 });
  }
}
