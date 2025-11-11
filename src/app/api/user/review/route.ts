import Orders from "@/models/Orders";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { orderId, rating, comment } = await req.json();

    if (!orderId || !rating) {
      return NextResponse.json(
        { message: "Thiếu thông tin orderId hoặc rating" },
        { status: 400 }
      );
    }

    const order = await Orders.findById(orderId);

    if (!order) {
      return NextResponse.json(
        { message: "Không tìm thấy đơn hàng" },
        { status: 404 }
      );
    }

    if (order.status !== "completed") {
      return NextResponse.json(
        { message: "Chỉ có thể đánh giá khi đơn hàng đã hoàn tất" },
        { status: 400 }
      );
    }

    // Nếu đơn hàng chưa có trường review thì tạo
    if (order.review === undefined) {
      order.review = null;
    }

    // Kiểm tra xem đã có review thật chưa
    if (order.review && order.review.rating) {
      return NextResponse.json(
        { message: "Đơn hàng này đã được đánh giá rồi" },
        { status: 400 }
      );
    }

    order.review = {
      rating,
      comment,
      created: new Date(),
    };

    await order.save();

    return NextResponse.json({ message: "Đánh giá thành công", order });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
