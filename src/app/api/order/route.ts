/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Orders from "@/models/Orders";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Bạn cần đăng nhập để đặt hàng" },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await req.json();

    const {
      name,
      phone,
      address,
      note,
      cart,
      total,
      shippingFee,
      deliveryMethod,
    } = body;

    if (!name || !phone || !address || !cart || cart.length === 0) {
      return NextResponse.json(
        {
          message: "Thiếu thông tin đơn hàng hoặc giỏ hàng trống",
        },
        { status: 400 }
      );
    }

    const newOrder = await Orders.create({
      userId: session.user.id,
      name,
      phone,
      address,
      note,
      items: cart.map((item: any) => ({
        productId: item._id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      })),
      totalPrice: total,
      shippingFee: shippingFee || 15000,
      deliveryMethod: deliveryMethod || "delivery",
    });

    return NextResponse.json(
      { message: "Tạo đơn hàng thành công", order: newOrder },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Lỗi khi tạo đơn hàng:", error);
    return NextResponse.json(
      { message: "Đã xảy ra lỗi khi tạo đơn hàng" },
      { status: 500 }
    );
  }
}
