import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/db";
import { authOptions } from "@/lib/authOptions";
import Orders from "@/models/Orders";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Hãy đăng nhập để xem thông tin đơn hàng" },
        { status: 401 }
      );
    }

    await connectDB();

    const orderUser = await Orders.findOne({ userId: session.user.id });

    if (!orderUser) {
      return NextResponse.json(
        { message: "Không tìm thấy đơn hàng của bạn" },
        { status: 400 }
      );
    }

    return NextResponse.json({ orderUser });
  } catch (error) {
    console.error("Lỗi khi lấy đơn hàng:", error);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
