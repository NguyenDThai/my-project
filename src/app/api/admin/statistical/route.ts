/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import User from "@/models/Users";
import Orders from "@/models/Orders";
import Product from "@/models/Products";
import { connectDB } from "@/lib/db";

const categoryMap: any = {
  pizza: "Pizza",
  drink: "Đồ uống",
  dessert: "Tráng miệng",
  chickenfried: "Gà rán",
  combo: "Combo",
};

export async function GET() {
  try {
    await connectDB();

    // user
    const totalUser = await User.countDocuments();
    const totalUserRole = await User.countDocuments({ role: "user" });
    const totalAdminRole = await User.countDocuments({ role: "admin" });

    // Product
    const totalProduct = await Product.countDocuments();
    // category product
    const productByCategory = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    const productByCategoryVn = productByCategory.map((c) => ({
      category: categoryMap[c._id] || c._id,
      count: c.count,
    }));

    // Order
    const totalOrders = await Orders.countDocuments();

    // Doanh thu
    const totalRevenueAgg = await Orders.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ]);

    const totalRevenue = totalRevenueAgg[0]?.total || 0;

    return NextResponse.json({
      success: true,
      data: {
        totalUser,
        totalUserRole,
        totalAdminRole,
        totalProduct,
        totalOrders,
        totalRevenue,
        productByCategoryVn,
      },
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
