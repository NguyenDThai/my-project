/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import Orders from "@/models/Orders";
import { connectDB } from "@/lib/db";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { status } = await req.json();
    const { id } = await params;

    await connectDB();

    const order = await Orders.findByIdAndUpdate(
      id,
      {
        status,
        updateAt: new Date(),
      },
      { new: true }
    );

    return NextResponse.json({ success: true, order }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
