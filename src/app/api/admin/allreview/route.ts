import Orders from "@/models/Orders";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(_req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        {
          message: "Chức năng chỉ dành cho quản trị viên hoặc chưa đăng nhập",
        },
        { status: 401 }
      );
    }

    await connectDB();

    const reviewOrder = await Orders.find({
      review: { $exists: true, $ne: null },
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        message: "Lấy danh sách đơn hàng đã được đánh giá thành công",
        data: reviewOrder,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lỗi khi lấy danh sách review:", error);
    return NextResponse.json(
      { message: "Lỗi server khi lấy danh sách review" },
      { status: 500 }
    );
  }
}
