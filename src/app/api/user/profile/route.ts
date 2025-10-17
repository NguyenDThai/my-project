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
      "name image email address phone"
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

// Api cho cap nhat thong tin user

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Vui lòng đăng nhập" },
        { status: 401 }
      );
    }

    await connectDB();
    const { name, address, phone } = await req.json();

    const user = await User.findOne({ email: session.user.email });

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        name,
        address,
        phone,
        updatedAt: new Date(),
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json(
        { message: "Người dùng không tồn tại" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Cập nhật thông tin thành công", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      { message: "Lỗi server, vui lòng thử lại sau" },
      { status: 500 }
    );
  }
}
