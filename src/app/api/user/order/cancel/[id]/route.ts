/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import Orders from "@/models/Orders";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const { status } = await req.json();

    const newStatus = await Orders.findByIdAndUpdate(
      id,
      {
        status,
        updateAt: new Date(),
      },
      {
        new: true,
      }
    );

    return NextResponse.json({ success: true, newStatus }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
