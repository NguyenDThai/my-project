/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import Product from "@/models/Products";
import { connectDB } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Bạn chưa đăng nhập" },
        { status: 401 }
      );
    }

    if (session.user.role !== "admin") {
      return NextResponse.json(
        {
          message: "Chức năng chỉ được phép sử dụng bởi Admin",
        },
        { status: 403 }
      );
    }

    await connectDB();

    const formData = await request.formData();

    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const image = formData.get("image") as File | null;

    let imageUrl = "";

    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(new Uint8Array(bytes));

      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "products" }, (error, result) => {
            if (error) return reject(error);
            resolve(result);
          })
          .end(buffer);
      });

      imageUrl = uploadResult.secure_url;
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      category,
      image: imageUrl,
    });

    return NextResponse.json({
      message: "Thêm sản phẩm thành công",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: "Lỗi khi thêm sản phẩm" },
      { status: 500 }
    );
  }
}
