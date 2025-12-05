import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/Users";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

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

    const { currentPass, newPass, confirmPass } = await req.json();

    if (!currentPass || !newPass || !confirmPass) {
      return NextResponse.json(
        { message: "Vui lòng nhập đầy đủ thông tin" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json(
        { message: "Không tìm thấy người dùng" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(currentPass, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Mật khẩu hiện tại không đúng" },
        { status: 400 }
      );
    }

    if (confirmPass !== newPass) {
      return NextResponse.json(
        {
          message: "Mật khẩu xác nhận không khớp",
        },
        {
          status: 400,
        }
      );
    }

    if (await bcrypt.compare(newPass, user.password)) {
      return NextResponse.json(
        { message: "Mật khẩu mới không được trùng với mật khẩu hiện tại" },
        { status: 400 }
      );
    }

    // Hash mat khau moi
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPass, salt);
    await user.save();

    return NextResponse.json(
      { message: "Cập nhật mật khẩu thành công" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json(
      { message: "Lỗi server, vui lòng thử lại sau" },
      { status: 500 }
    );
  }
}
