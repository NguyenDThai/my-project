"use client";

import { useCart } from "@/context/CartItem";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaPen } from "react-icons/fa";

const StepOrderTwo = () => {
  const { cart, total } = useCart();
  const [shippingFee, setShippingFee] = useState(15000);

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl text-center font-bold text-orange-600 mb-6">
        THÔNG TIN ĐƠN HÀNG
      </h2>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form thông tin khách hàng */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold pb-4">GIAO HÀNG ĐẾN</h3>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Họ và tên
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số điện thoại
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Địa chỉ
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ghi chú
              </label>
              <textarea className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none" />
            </div>
          </div>
        </div>

        {/* Chi tiết đơn hàng */}
        <div className="lg:w-96">
          <div className="bg-[#f5f1e6] rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 ">
                CHI TIẾT ĐƠN HÀNG
              </h3>

              <Link href="/menu">
                <FaPen
                  size={15}
                  className="hover:text-orange-400 transition-all duration-300"
                />
              </Link>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="space-y-4 min-h-80 overflow-y-auto mb-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-3 p-3 bg-[#f5f1e6] rounded-lg border border-gray-200"
                >
                  <Image
                    src={item.image || "/placeholder.png"}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-sm truncate">
                      {item.name}
                    </h4>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-orange-500 font-bold">
                        {item.price.toLocaleString()} đ
                      </span>
                      <span className="text-gray-600 text-sm">
                        x{item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tổng tiền */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Tạm tính:</span>
                <span>{total.toLocaleString()} đ</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Phí vận chuyển:</span>
                <span>{shippingFee.toLocaleString()} đ</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-orange-600 border-t border-gray-200 pt-2">
                <span>Tổng cộng:</span>
                <span>{(total + shippingFee).toLocaleString()} đ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOrderTwo;
