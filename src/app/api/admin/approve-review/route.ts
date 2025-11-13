import Orders from "@/models/Orders";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

// Api cho duyet danh gia san pham

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { message: "Không có quyền truy cập" },
        { status: 401 }
      );
    }

    await connectDB();

    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json({ message: "Thiếu OrderID" }, { status: 400 });
    }

    const order = await Orders.findById(orderId);

    if (!order || !order.review) {
      return NextResponse.json(
        { message: "Không tìm thấy đánh giá để duyệt" },
        { status: 404 }
      );
    }

    order.review.approved = true;

    order.save();

    return NextResponse.json({ message: "Duyệt đánh giá thành công", order });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
