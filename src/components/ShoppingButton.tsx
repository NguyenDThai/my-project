"use client";

import { useCart } from "@/context/CartItem";
import Image from "next/image";
import React, { useState } from "react";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { GoPencil } from "react-icons/go";

const ShoppingButton = () => {
  const {
    total,
    cart,
    handleDeleteItem,
    allUtensilsSelected,
    handleToggleAllUtensils,
    handleToggleUtensil,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  } = useCart();
  const [cartDetail, setCartDetail] = useState(false);

  return (
    <>
      {/* Nút giỏ hàng thu gọn - Responsive */}
      <div
        onClick={() => setCartDetail(true)}
        className="fixed bottom-0 w-[90vw] max-w-[300px] h-[55px] sm:h-[65px] right-4 sm:right-16 bg-[#ffc120] flex items-center justify-between z-50 rounded-tl-2xl rounded-tr-2xl cursor-pointer shadow-lg border-2 border-yellow-400 px-4 sm:px-5"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <FaShoppingCart size={24} className="sm:w-7 sm:h-7" color="#000" />
          <span className="font-bold text-lg sm:text-2xl text-gray-900">
            {total.toLocaleString()} đ
          </span>
        </div>
        <RiArrowDropUpLine size={28} className="sm:w-8 sm:h-8" color="#000" />
      </div>

      {/* Panel giỏ hàng chi tiết - Responsive */}
      {cartDetail && (
        <div className="fixed bottom-0 w-[95vw] max-w-[956px] h-[80vh] max-h-[600px] right-1/2 translate-x-1/2 sm:right-16 sm:translate-x-0 bg-white flex flex-col z-50 rounded-tl-2xl rounded-tr-2xl shadow-2xl border-2 border-yellow-400 sm:w-[90vw] lg:w-[956px]">
          {/* Header */}
          <div className="bg-[#ffc120] rounded-tl-2xl rounded-tr-2xl p-3 sm:p-4 border-b-2 border-yellow-400">
            <div className="flex justify-between items-center">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                GIỎ HÀNG CỦA BẠN
              </h2>
              <div
                className="cursor-pointer hover:bg-yellow-300 rounded-full p-1 transition-colors"
                onClick={() => setCartDetail(false)}
              >
                <RiArrowDropDownLine
                  size={28}
                  className="sm:w-9 sm:h-9"
                  color="#000"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden bg-gray-50">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
                <FaShoppingCart
                  size={40}
                  className="sm:w-12 sm:h-12 mb-3 sm:mb-4 opacity-50"
                />
                <p className="text-base sm:text-lg font-medium">
                  Giỏ hàng trống
                </p>
              </div>
            ) : (
              <div className="h-full overflow-y-auto p-3 sm:p-4 lg:p-6 custom-scrollbar">
                {/* Danh sách sản phẩm */}
                <div className="space-y-3 sm:space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item._id}
                      className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border-2 border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
                        {/* Phần hình ảnh và thông tin sản phẩm */}
                        <div className="flex gap-3 sm:gap-4 flex-1">
                          {/* Hình ảnh sản phẩm */}
                          <div className="flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder-image.jpg"}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="rounded-lg object-cover w-16 h-16 sm:w-20 sm:h-20"
                            />
                          </div>

                          {/* Thông tin sản phẩm */}
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2 sm:mb-3">
                              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 uppercase flex-1">
                                {item.name}
                              </h3>

                              {/* Giá sản phẩm - Hiển thị trên mobile */}
                              <div className="sm:hidden text-right">
                                <div className="flex items-center gap-1 mb-1">
                                  <span className="text-base font-medium">
                                    x{item.quantity}
                                  </span>
                                  <span className="text-lg font-bold text-gray-900">
                                    {(
                                      item.price * item.quantity
                                    ).toLocaleString()}{" "}
                                    đ
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500">
                                  {item.price.toLocaleString()} đ/sản phẩm
                                </p>
                              </div>
                            </div>

                            {/* Nút tăng/giảm số lượng */}
                            <div className="flex flex-col gap-3 mb-3">
                              <div className="flex items-center border border-gray-300 rounded-lg max-w-[100px]">
                                <button
                                  onClick={() =>
                                    handleDecreaseQuantity(item._id)
                                  }
                                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-lg transition-colors"
                                  disabled={item.quantity <= 1}
                                >
                                  <span
                                    className={`text-lg font-bold ${
                                      item.quantity <= 1
                                        ? "text-gray-400"
                                        : "text-gray-700"
                                    }`}
                                  >
                                    -
                                  </span>
                                </button>
                                <span className="w-8 text-center font-semibold text-gray-900">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    handleIncreaseQuantity(item._id)
                                  }
                                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-lg transition-colors"
                                >
                                  <span className="text-lg font-bold text-gray-700">
                                    +
                                  </span>
                                </button>
                              </div>

                              {/* Option dụng cụ ăn uống - Có thể tick chọn */}
                              <div
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => handleToggleUtensil(item._id)}
                              >
                                <div
                                  className={`w-4 h-4 sm:w-5 sm:h-5 border-2 rounded flex items-center justify-center flex-shrink-0 transition-colors ${
                                    item.needUtensils
                                      ? "border-orange-500 bg-orange-500"
                                      : "border-gray-400 bg-white"
                                  }`}
                                >
                                  {item.needUtensils && (
                                    <svg
                                      className="w-2 h-2 sm:w-3 sm:h-3 text-white"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  )}
                                </div>
                                <span className="text-sm sm:text-lg text-gray-700">
                                  Lấy dụng cụ ăn uống nhựa
                                </span>
                              </div>
                            </div>

                            <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                              Chúng tôi sẽ gửi dụng cụ ăn uống nhựa như: muỗng,
                              nĩa...
                            </p>

                            {/* Mô tả hiển thị trên mobile */}
                            <p className="text-xs text-gray-600 mt-2 sm:hidden">
                              Chúng tôi sẽ gửi dụng cụ ăn uống nhựa như: muỗng,
                              nĩa...
                            </p>
                          </div>
                        </div>

                        {/* Phần giá và action buttons */}
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3">
                          {/* Giá sản phẩm - Hiển thị trên desktop */}
                          <div className="hidden sm:block text-right">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-lg font-medium">
                                x{item.quantity}
                              </span>
                              <span className="text-xl lg:text-2xl font-bold text-gray-900">
                                {(item.price * item.quantity).toLocaleString()}{" "}
                                đ
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">
                              {item.price.toLocaleString()} đ/sản phẩm
                            </p>
                          </div>

                          {/* Action buttons */}
                          <div className="flex items-center gap-2">
                            {/* Nút chỉnh sửa */}
                            <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-500 text-white flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors duration-200 shadow-sm">
                              <GoPencil size={14} className="sm:w-4 sm:h-4" />
                            </button>

                            {/* Nút xóa */}
                            <button
                              onClick={() => handleDeleteItem(item._id)}
                              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-500 text-white flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors duration-200 shadow-sm"
                            >
                              <FaTrashAlt size={14} className="sm:w-4 sm:h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Thêm dụng cụ ăn uống cho toàn bộ đơn hàng */}
                <div
                  className="mt-3 sm:mt-4 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border-2 border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={handleToggleAllUtensils}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div
                        className={`w-4 h-4 sm:w-6 sm:h-6 border-2 rounded flex items-center justify-center flex-shrink-0 transition-colors ${
                          allUtensilsSelected
                            ? "border-orange-500 bg-orange-500"
                            : "border-gray-400 bg-white"
                        }`}
                      >
                        {allUtensilsSelected && (
                          <svg
                            className="w-2 h-2 sm:w-4 sm:h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <div>
                        <span className="text-sm sm:text-lg font-medium text-gray-900 block">
                          Lấy dụng cụ ăn uống nhựa
                        </span>
                        <p className="text-xs sm:text-sm text-gray-600">
                          Chúng tôi sẽ gửi dụng cụ ăn uống nhựa như: muỗng,
                          nĩa...
                        </p>
                      </div>
                    </div>
                    <span className="text-sm sm:text-lg text-gray-600 sm:self-start">
                      Miễn phí
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer - Tổng cộng và nút thanh toán */}
          {cart.length > 0 && (
            <div className="border-t-2 border-gray-200 p-4 sm:p-6 bg-white">
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  Tổng Cộng :
                </span>
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                  {total.toLocaleString()} đ
                </span>
              </div>
              <button className="w-full bg-[#ffc120] text-gray-900 font-bold text-lg sm:text-xl lg:text-2xl py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl hover:bg-[#ffb300] transition-all duration-300 border-2 border-yellow-400 shadow-lg">
                THANH TOÁN
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShoppingButton;
