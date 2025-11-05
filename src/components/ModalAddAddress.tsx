/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ModalAddAddress = ({
  userId,
  onClose,
  onSuccess,
  addresses = [],
  fetchAddress,
}: any) => {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    isDefault: false,
  });

  const [mode, setMode] = useState<"select" | "add">("select");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSelectedAddress = (index: number) => {
    const selected = addresses[index];
    onSuccess?.(selected);
    onClose();
  };

  const handleSubmit = async () => {
    if (!form.fullName || !form.phone || !form.address) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    const res = await fetch("/api/user/address", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, address: form }),
    });

    const data = await res.json();
    if (res.ok) {
      toast.success(data.message);
      onClose();
      onSuccess?.(data.address);
      fetchAddress();
    } else {
      toast.error(data.message || "Lỗi khi thêm địa chỉ");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {mode === "select" ? "Chọn địa chỉ giao hàng" : "Thêm địa chỉ mới"}
          </h2>
        </div>

        {/* Chế độ chọn địa chỉ */}
        {mode === "select" && (
          <div className="p-6 space-y-3 max-h-[300px] overflow-y-auto">
            {addresses.length === 0 ? (
              <p className="text-gray-500 text-center">Chưa có địa chỉ nào.</p>
            ) : (
              addresses.map((addr: any, i: number) => (
                <div
                  key={i}
                  onClick={() => handleSelectedAddress(i)}
                  className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                    addr.isDefault ? "border-orange-400" : "border-gray-200"
                  }`}
                >
                  <p className="font-medium text-gray-800">{addr.fullName}</p>
                  <p className="text-sm text-gray-600">{addr.phone}</p>
                  <p className="text-sm text-gray-600">{addr.address}</p>
                  {addr.isDefault && (
                    <span className="text-xs text-orange-500 font-medium">
                      Địa chỉ mặc định
                    </span>
                  )}
                </div>
              ))
            )}
            <button
              onClick={() => setMode("add")}
              className="w-full mt-4 py-2 border border-orange-400 text-orange-500 rounded-lg hover:bg-orange-50 font-medium"
            >
              + Thêm địa chỉ mới
            </button>
          </div>
        )}

        {/* Chế độ thêm địa chỉ */}
        {mode === "add" && (
          <>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Họ và tên
                </label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Nhập họ và tên"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số điện thoại
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Nhập số điện thoại"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Địa chỉ cụ thể
                </label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Nhập địa chỉ cụ thể"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 cursor-pointer">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={form.isDefault}
                  onChange={handleChange}
                  className="w-4 h-4 text-orange-500"
                />
                <span className="text-gray-700 font-medium">
                  Đặt làm địa chỉ mặc định
                </span>
              </label>
            </div>

            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-lg flex justify-between">
              <button
                onClick={() => setMode("select")}
                className="px-4 py-2 text-gray-600 hover:underline"
              >
                ← Quay lại
              </button>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Lưu địa chỉ
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalAddAddress;
