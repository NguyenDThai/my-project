/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import User from "@/models/Users";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Vui lòng đăng nhập để thêm địa chỉ" },
        { status: 401 }
      );
    }

    await connectDB();

    const { userId, address } = await req.json();

    if (!userId || !address) {
      return NextResponse.json(
        { message: "Thiếu userId hoặc address" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "Không tìm thấy người dùng" },
        { status: 404 }
      );
    }

    if (address.isDefault) {
      user.addresses.forEach((addr: any) => (addr.isDefault = false));
    }

    user.addresses.push(address);
    await user.save();

    return NextResponse.json({ message: "Thêm địa chỉ thành công", user });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
