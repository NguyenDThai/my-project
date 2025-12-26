"use client";

import React, { Suspense, useEffect, useState } from "react";

import Link from "next/link";
import {
  FaArrowRight,
  FaCheckCircle,
  FaClock,
  FaDownload,
  FaShoppingBag,
} from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { LuShare2 } from "react-icons/lu";
import { RiMvAiLine } from "react-icons/ri";
import { useSearchParams } from "next/navigation";

type ProductDetail = {
  _id?: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}[];

type OrderDetailType = {
  _id: string;
  address: string;
  items: ProductDetail;
  name: string;
  phone: string;
  totalPrice: number;
  deliveryMethod: string;
  shippingFee: number;
  paymentStatus: string;
};

const SuccessPayment = () => {
  const searchParam = useSearchParams();
  const orderId = searchParam.get("orderId");
  const [orderDetail, setOrderDetail] = useState<OrderDetailType | null>(null);

  useEffect(() => {
    if (!orderId) return;

    fetch(`/api/order/${orderId}`)
      .then((res) => res.json())
      .then((data) => setOrderDetail(data));
  }, [orderId]);

  // Mock data - bạn có thể thay thế bằng dữ liệu thực từ API
  const orderDetails = {
    orderId: "ORD-789456",
    date: new Date().toLocaleDateString("vi-VN"),
    time: new Date().toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    amount: "1,250,000 ₫",
    paymentMethod: "Thẻ Visa - **** 4242",
    customerEmail: "customer@example.com",
    estimatedDelivery: "3-5 ngày làm việc",
    items: [
      { name: "Áo thun Premium", quantity: 2, price: "250,000 ₫" },
      { name: "Quần jeans Slim Fit", quantity: 1, price: "450,000 ₫" },
      { name: "Giày thể thao", quantity: 1, price: "300,000 ₫" },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white mt-20">
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Success Card */}
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
                <FaCheckCircle className="w-16 h-16 text-green-600" />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Thanh toán thành công! 🎉
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được xác nhận và đang
              được xử lý.
            </p>

            {/* Order ID Badge */}
            <div className="inline-flex items-center gap-3 bg-green-50 text-green-800 px-6 py-3 rounded-full mb-8">
              <GoPackage className="w-5 h-5" />
              <span className="font-semibold">
                Mã đơn hàng: {orderDetail?._id || orderId}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-lg">
                <FaDownload className="w-5 h-5" />
                Tải hóa đơn
              </button>
              <button className="flex items-center justify-center gap-2 border-2 border-gray-300 hover:border-green-600 text-gray-700 hover:text-green-600 font-medium py-3 px-6 rounded-lg transition-all duration-200">
                <LuShare2 className="w-5 h-5" />
                Chia sẻ
              </button>
              <Link
                href="/orders"
                className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Theo dõi đơn hàng
                <FaArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Order Details */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                Chi tiết đơn hàng
              </h2>

              <div className="space-y-6">
                {/* Order Items */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">
                    Sản phẩm đã mua
                  </h3>
                  <div className="space-y-4">
                    {orderDetail?.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {item?.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Số lượng: {item?.quantity}
                          </p>
                        </div>
                        <p className="font-semibold text-gray-900">
                          {item.price.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Tạm tính:</span>
                    <span>{orderDetail?.totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Phí vận chuyển:</span>
                    <span>
                      {orderDetail?.deliveryMethod === "delivery"
                        ? orderDetail?.shippingFee.toLocaleString()
                        : 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <span className="text-lg font-bold text-gray-900">
                      Tổng cộng:
                    </span>
                    <span className="text-2xl font-bold text-green-600">
                      {(
                        (orderDetail?.totalPrice ?? 0) +
                        (orderDetail?.shippingFee ?? 0)
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Information */}
            <div className="space-y-8">
              {/* Delivery Info */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                  Thông tin giao hàng
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <GoPackage className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Thời gian giao hàng dự kiến
                      </h3>
                      <p className="text-gray-600">
                        {orderDetails.estimatedDelivery}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaClock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Thời gian đặt hàng
                      </h3>
                      <p className="text-gray-600">
                        {orderDetails.date} - {orderDetails.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <RiMvAiLine className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Email xác nhận
                      </h3>
                      <p className="text-gray-600 break-all">
                        {orderDetails.customerEmail}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Hóa đơn đã được gửi đến email của bạn
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                  Thông tin thanh toán
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Phương thức thanh toán:
                    </span>
                    <span className="font-medium text-gray-900">
                      {orderDetails.paymentMethod}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trạng thái:</span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      <FaCheckCircle className="w-4 h-4" />
                      Đã thanh toán
                    </span>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                <h3 className="font-bold text-gray-900 mb-4">Bước tiếp theo</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <span className="text-gray-700">
                      Xác nhận đơn hàng đã được gửi đến email
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <span className="text-gray-700">
                      Theo dõi trạng thái đơn hàng trong tài khoản
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <span className="text-gray-700">
                      Nhận thông báo khi đơn hàng được giao
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Continue Shopping */}
          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              <FaShoppingBag className="w-5 h-5" />
              Tiếp tục mua sắm
            </Link>
            <p className="text-gray-500 mt-4">
              Cần hỗ trợ?{" "}
              <a
                href="/contact"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Liên hệ với chúng tôi
              </a>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              © 2024 E-Shop. Tất cả các quyền được bảo lưu.
            </p>
            <div className="flex justify-center gap-6">
              <a
                href="/privacy"
                className="text-gray-500 hover:text-green-600 transition-colors duration-200"
              >
                Chính sách bảo mật
              </a>
              <a
                href="/terms"
                className="text-gray-500 hover:text-green-600 transition-colors duration-200"
              >
                Điều khoản sử dụng
              </a>
              <a
                href="/faq"
                className="text-gray-500 hover:text-green-600 transition-colors duration-200"
              >
                Câu hỏi thường gặp
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function SuccessPaymentPage() {
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <SuccessPayment />
    </Suspense>
  );
}
