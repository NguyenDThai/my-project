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
      "_id name image email addresses phone"
    );

    if (!user) {
      return NextResponse.json(
        { message: "Không tìm thấy thông tin người dùng" },
        { status: 404 }
      );
    }

    // Lay dia chi mac dinh neu co
    const defaultAddress =
      user.addresses.find((addr: any) => addr.isDefault) || null;

    const userData = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      image: user.image,
      phone: defaultAddress?.phone || "",
      address: defaultAddress?.address || "",
      addresses: user.addresses,
    };

    return NextResponse.json({ user: userData });
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

    if (!user) {
      return NextResponse.json(
        { message: "Không tìm thấy người dùng" },
        { status: 404 }
      );
    }

    // Cap nhat thong tin co ban
    user.name = name || user.name;

    if (!Array.isArray(user.addresses)) {
      user.addresses = [];
    }
    // Tim dia chi mac dinh
    const defaultIndex = user.addresses.findIndex(
      (addr: any) => addr.isDefault
    );

    if (defaultIndex >= 0) {
      user.addresses[defaultIndex].fullName =
        name || user.addresses[defaultIndex].fullName;
      user.addresses[defaultIndex].phone =
        phone || user.addresses[defaultIndex].phone;
      user.addresses[defaultIndex].address =
        address || user.addresses[defaultIndex].address;
    } else {
      user.addresses.push({
        fullName: name,
        phone,
        address,
        isDefault: true,
      });
    }

    const updatedUser = await user.save();

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
