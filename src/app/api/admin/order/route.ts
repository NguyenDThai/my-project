import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Orders from "@/models/Orders";
import { connectDB } from "@/lib/db";
import { authOptions } from "@/lib/authOptions";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (session?.user.role !== "admin") {
      return NextResponse.json(
        { message: "Chức năng dành cho admin" },
        { status: 401 }
      );
    }
    await connectDB();

    const orders = await Orders.find({}).sort({ createdAt: -1 });

    if (orders.length === 0) {
      return NextResponse.json(
        { message: "Không có đơn hàng nào" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "Lấy danh sách đơn hàng thành công",
      data: orders,
    });
  } catch (error) {
    console.error("Lỗi khi lấy tất cả đơn hàng:", error);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
