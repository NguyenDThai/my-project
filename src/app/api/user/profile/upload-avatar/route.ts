/* eslint-disable @typescript-eslint/no-explicit-any */
import cloudinary from "@/lib/cloudinary";
import User from "@/models/Users";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Bạn chưa đăng nhập" },
        { status: 401 }
      );
    }

    await connectDB();

    const formData = await req.formData();
    const file = formData.get("avatar") as File;

    if (!file) {
      return NextResponse.json({ message: "File trong" }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload lên Cloudinary bằng stream
    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "avatars" }, // Folder trên cloudinary
          (err, result) => {
            if (err) reject(err);
            resolve(result);
          }
        )
        .end(buffer);
    });

    // Lấy user theo email session
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json(
        { message: "Không tìm thấy user" },
        { status: 404 }
      );
    }

    // Luu link anh vao db
    user.image = uploadResult.secure_url;
    await user.save();

    return NextResponse.json(
      { message: "Upload avatar thành công", image: uploadResult.secure_url },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload avatar error:", error);

    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
