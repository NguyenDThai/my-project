import Orders from "@/models/Orders";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log(id);

    // 🚨 BẮT BUỘC check
    if (!id || id === "null" || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Order ID không hợp lệ" },
        { status: 400 }
      );
    }

    await connectDB();

    const order = await Orders.findById(id).lean();

    if (!order) {
      return NextResponse.json(
        { message: "Không tìm thấy đơn hàng" },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("GET ORDER ERROR:", error);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
