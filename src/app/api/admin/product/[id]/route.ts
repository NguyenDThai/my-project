/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import Product from "@/models/Products";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json(
      { message: "Bạn không có quyền chỉnh sửa" },
      { status: 403 }
    );
  }

  const data = await req.json();

  const updateProduct = await Product.findByIdAndUpdate(params.id, data, {
    new: true,
  });

  if (!updateProduct) {
    return NextResponse.json(
      { message: "Không tìm thấy sản phẩm" },
      { status: 404 }
    );
  }
  return NextResponse.json(
    { message: "Cập nhật sản phẩm thành công", product: updateProduct },
    { status: 200 }
  );
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json(
      { message: "Bạn không có quyền xóa sản phẩm" },
      { status: 403 }
    );
  }

  const deleteProduct = await Product.findByIdAndDelete(params.id);

  if (!deleteProduct) {
    return NextResponse.json(
      { message: "Không tìm thấy sản phẩm" },
      { status: 404 }
    );
  }
  return NextResponse.json({ message: "Xóa sản phẩm thành công" });
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { message: "Bạn không có quyền truy cập" },
        { status: 403 }
      );
    }

    await connectDB();

    const product = await Product.findById(params.id).lean();

    if (!product) {
      return NextResponse.json(
        { message: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product }, { status: 200 });
  } catch (error: any) {
    console.error("Lỗi lấy sản phẩm:", error);
    return NextResponse.json(
      { message: "Lỗi server", error: error.message },
      { status: 500 }
    );
  }
}
