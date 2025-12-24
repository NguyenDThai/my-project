/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderMethod } from "@/components/StepOrderTwo";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaPen } from "react-icons/fa";

type CartItem = {
  _id: string;
  name: string;
  image?: string;
  price: number;
  quantity: number;
};

type OrderDetail = {
  cart: CartItem[];
  selectedMethod: OrderMethod;
  total: number;
  shippingFee: number;
};

const OrderDetail = ({
  cart,
  selectedMethod,
  total,
  shippingFee,
}: OrderDetail) => {
  return (
    <div className="lg:w-96">
      <div className="bg-[#f5f1e6] rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            CHI TIẾT ĐƠN HÀNG
          </h3>
          <Link href="/menu">
            <FaPen
              size={15}
              className="hover:text-orange-400 transition-all duration-300 cursor-pointer"
            />
          </Link>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="space-y-4 max-h-80 overflow-y-auto mb-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200"
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

          {selectedMethod === "delivery" && (
            <div className="flex justify-between text-gray-600">
              <span>Phí vận chuyển:</span>
              <span>{shippingFee.toLocaleString()} đ</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-bold text-orange-600 border-t border-gray-200 pt-2">
            <span>Tổng cộng:</span>
            <span>
              {(selectedMethod === "delivery"
                ? total + shippingFee
                : total
              ).toLocaleString()}{" "}
              đ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
