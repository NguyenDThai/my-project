/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import crypto from "crypto";
import qs from "qs";

function formatDate(date: Date) {
  const pad = (n: number) => (n < 10 ? "0" + n : n);
  return (
    date.getFullYear().toString() +
    pad(date.getMonth() + 1) +
    pad(date.getDate()) +
    pad(date.getHours()) +
    pad(date.getMinutes()) +
    pad(date.getSeconds())
  );
}

export async function POST(req: Request) {
  const body = await req.json();
  const { amount, orderId } = body;

  const tmnCode = process.env.VNP_TMN_CODE!;
  const secretKey = process.env.VNP_HASH_SECRET!;
  const vnpUrl = process.env.VNP_URL!;
  const returnUrl = `${process.env.NEXTAUTH_URL}/vnpay-return`;

  const createDate = formatDate(new Date());

  const params: any = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: tmnCode,
    vnp_Locale: "vn",
    vnp_CurrCode: "VND",
    vnp_TxnRef: orderId.toString(),
    vnp_OrderInfo: `Thanh toan don hang ${orderId}`,
    vnp_OrderType: "other",
    vnp_Amount: amount * 100,
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: "127.0.0.1",
    vnp_CreateDate: createDate,
  };

  const sortedParams = Object.keys(params)
    .sort()
    .reduce((acc: any, key) => {
      acc[key] = params[key];
      return acc;
    }, {});

  const signData = qs.stringify(sortedParams, {
    encode: true,
    encoder: (str) => encodeURIComponent(str).replace(/%20/g, "+"),
  });

  const signed = crypto
    .createHmac("sha512", secretKey)
    .update(signData, "utf-8")
    .digest("hex");

  const paymentUrl =
    process.env.VNP_URL +
    "?" +
    signData +
    "&vnp_SecureHashType=SHA512" +
    "&vnp_SecureHash=" +
    signed;

  return NextResponse.json({ paymentUrl });
}
