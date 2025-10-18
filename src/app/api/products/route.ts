import { connectDB } from "@/lib/db";
import Product from "@/models/Products";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find({}).select(
      "name price category description image"
    );

    return NextResponse.json(
      {
        message: "Lấy tất cả sản phẩm thành công",
        products,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error getting product:", error);
    return NextResponse.json(
      { message: "Lỗi khi lấy sản phẩm" },
      { status: 500 }
    );
  }
}
