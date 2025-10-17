import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import User from "@/models/Users";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          message: "Vui lòng đăng nhập để sử dụng chức năng",
        },
        { status: 401 }
      );
    }

    if (session.user.role !== "admin") {
      return NextResponse.json(
        { message: "Chức năng chỉ dành cho admin" },
        { status: 400 }
      );
    }

    await connectDB();
    const users = await User.find({}, "-password").sort({ createdAt: -1 });

    return NextResponse.json(
      { message: "Lấy danh sách user thành công", users },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lỗi khi lấy danh sách user:", error);
    return NextResponse.json(
      { message: "Lỗi server", error: (error as Error).message },
      { status: 500 }
    );
  }
}
