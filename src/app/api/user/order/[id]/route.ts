/* eslint-disable @typescript-eslint/no-explicit-any */
import Orders from "@/models/Orders";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { status } = await request.json();
    const { id } = await params;
    await connectDB();

    const newStatus = await Orders.findByIdAndUpdate(
      id,
      {
        status,
        updateAt: new Date(),
      },
      { new: true }
    );

    return NextResponse.json({ success: true, newStatus }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
