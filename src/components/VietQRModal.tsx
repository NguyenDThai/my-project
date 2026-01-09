"use client";
import { QRCodeCanvas } from "qrcode.react";
import { useState, useEffect } from "react";

export default function VietQRModal({
  amount,

  handlePaymented,
}: {
  amount: number;

  handlePaymented: () => void;
}) {
  const [qrText, setQrText] = useState("");

  useEffect(() => {
    async function fetchQR() {
      const res = await fetch("/api/vietqr/generate", {
        method: "POST",
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      setQrText(data.qrCode);
    }
    fetchQR();
  }, [amount]);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl flex flex-col items-center">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Thanh toán VietQR
      </h3>

      {qrText ? (
        <div className="relative p-2 border-8 border-orange-50 rounded-lg">
          <QRCodeCanvas
            value={qrText}
            size={250}
            level="H"
            includeMargin={true}
            imageSettings={{
              src: "/logo-bank.jpg",
              height: 40,
              width: 40,
              excavate: true,
            }}
          />
        </div>
      ) : (
        <div className="w-[250px] h-[250px] flex items-center justify-center bg-gray-100 animate-pulse">
          Đang tạo mã...
        </div>
      )}

      <div className="mt-4 text-center">
        <p className="text-2xl font-black text-orange-600">
          {amount.toLocaleString()}đ
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Nội dung:{" "}
          <span className="font-semibold text-gray-700">THANH TOAN</span>
        </p>
      </div>

      <div className="mt-6 w-full py-3 bg-gray-50 rounded-lg text-xs text-gray-400 text-center">
        Vui lòng giữ nguyên nội dung chuyển khoản để đơn hàng được duyệt tự
        động.
      </div>

      <div className="mt-6">
        <button
          className="p-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-all duration-300 cursor-pointer"
          onClick={handlePaymented}
        >
          Đã chuyển khoản
        </button>
      </div>
    </div>
  );
}
