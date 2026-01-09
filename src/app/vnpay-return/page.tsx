/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Link from "next/link";

// format ngay thang
function formatVnPayDateVN(vnpPayDate?: string) {
  if (!vnpPayDate) return "";

  const date = new Date(
    `${vnpPayDate.slice(0, 4)}-${vnpPayDate.slice(4, 6)}-${vnpPayDate.slice(
      6,
      8
    )}T${vnpPayDate.slice(8, 10)}:${vnpPayDate.slice(
      10,
      12
    )}:${vnpPayDate.slice(12, 14)}+07:00`
  );

  return date.toLocaleString("vi-VN");
}

const VnPayReturn = async ({
  searchParams,
}: {
  searchParams: Promise<any>;
}) => {
  const params = await searchParams;

  const responseCode = params.vnp_ResponseCode;
  const orderId = params.vnp_TxnRef;
  const amount = params.vnp_Amount;
  const payDate = params.vnp_PayDate;

  const isSuccess = responseCode === "00";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        {isSuccess ? (
          <>
            <h1 className="text-2xl font-bold text-orange-600 mb-4">
              🎉 Thanh toán thành công
            </h1>
            <p className="mb-2">
              Mã đơn hàng: <b>{orderId}</b>
            </p>
            <p className="mb-2">
              Số tiền: <b>{(Number(amount) / 100).toLocaleString()} VNĐ</b>
            </p>
            <p className="mb-6">
              Thời gian thanh toán: <b>{formatVnPayDateVN(payDate)}</b>
            </p>

            <Link
              href="/user/order"
              className="inline-block bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
            >
              Xem đơn hàng
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              ❌ Thanh toán thất bại
            </h1>
            <p className="mb-2">
              Mã đơn hàng: <b>{orderId}</b>
            </p>
            <p className="mb-6">
              Mã lỗi VNPay: <b>{responseCode}</b>
            </p>

            <Link
              href="/checkout"
              className="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Thanh toán lại
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VnPayReturn;
