/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import React from "react";
import { FaComments, FaRegAddressCard } from "react-icons/fa";

const RenderReview = ({ renderReview }: any) => {
  return (
    <>
      {renderReview.map((item: any) => {
        if (!item.review) return null;

        return (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 transform hover:-translate-y-1"
          >
            {/* Header với thông tin khách hàng */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6 pb-6 border-b border-gray-100">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === "completed"
                            ? "bg-green-100 text-green-800 border border-green-200"
                            : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                        }`}
                      >
                        {item.status === "completed"
                          ? "✅ Hoàn thành"
                          : "⏳ Đang xử lý"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">📞</span>
                    <span>{item.phone}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">
                        <FaRegAddressCard />
                      </span>
                      <span className="truncate">{item.address}</span>
                    </div>
                    <button className="px-3 py-2 lg:px-4 lg:py-2 rounded-lg transition-all duration-200 font-medium flex items-center justify-center text-xs bg-orange-600 text-white hover:bg-orange-500 cursor-pointer lg:text-sm">
                      Duyệt phản hồi
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sản phẩm và Review */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sản phẩm */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="text-blue-500">🛒</span>
                  Sản phẩm đã mua
                </h4>
                <div className="space-y-3">
                  {item.items &&
                    item.items.map((product: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={100}
                          height={100}
                          className="w-14 h-14 rounded-lg object-cover border border-gray-200"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-800 truncate">
                            {product.name}
                          </p>
                          <p className="text-orange-600 font-semibold">
                            {product.price.toLocaleString("vi-VN")}đ
                          </p>
                          <p className="text-xs text-gray-500 capitalize">
                            {product.category}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Review */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-100">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                    <span className="text-yellow-500">⭐</span>
                    Đánh giá từ khách hàng
                  </h4>
                  <div className="flex items-center bg-white px-3 py-1 rounded-full border border-yellow-200">
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        className={`text-lg ${
                          index < item.review.rating
                            ? "text-yellow-400 drop-shadow-sm"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="ml-2 text-sm font-semibold text-gray-700">
                      {item.review.rating}/5
                    </span>
                  </div>
                </div>

                {item.review.comment && (
                  <div className="mt-3">
                    <div className="bg-white rounded-lg p-4 border border-yellow-200 shadow-sm">
                      <div className="flex items-start gap-2">
                        <span className="text-orange-400 text-lg mt-0.5">
                          <FaComments />
                        </span>
                        <p className="text-gray-700 leading-relaxed italic">
                          {`"${item.review.comment}"`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Thông tin thêm */}
                <div className="mt-4 pt-3 border-t border-yellow-200">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Tổng đơn hàng:</span>
                    <span className="font-semibold text-gray-800">
                      {item.totalPrice?.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>Phí vận chuyển:</span>
                    <span>{item.shippingFee?.toLocaleString("vi-VN")}đ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
              <div className="text-xs text-gray-500">
                Mã đơn hàng: <span className="font-mono">{item._id}</span>
              </div>
              <div className="text-xs text-gray-500">
                Cập nhật: {new Date(item.updatedAt).toLocaleDateString("vi-VN")}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default RenderReview;
