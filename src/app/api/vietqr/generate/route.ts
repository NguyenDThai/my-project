import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    const response = await fetch("https://api.vietqr.io/v2/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        accountNo: "9869240149", // STK của bạn
        accountName: "NGUYEN DUC THAI", // Tên chủ TK
        acqId: "970436", // Mã BIN ngân hàng (MB là 970422)
        amount: amount,
        addInfo: `THANH TOAN DON HANG`,
        format: "text", // Quan trọng: Lấy chuỗi text thay vì file ảnh
        template: "compact",
      }),
    });

    const result = await response.json();
    return NextResponse.json(result.data); // Trả về chuỗi qrCode
  } catch (error) {
    return NextResponse.json({ error: "Lỗi tạo chuỗi QR" }, { status: 500 });
  }
}
