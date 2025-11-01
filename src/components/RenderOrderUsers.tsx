/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";

const RenderOrderUsers = ({ orderUser }: any) => {
  return (
    <div className="mt-30 max-w-4xl min-h-screen mx-auto bg-white shadow-xl rounded-lg lg:rounded-2xl overflow-hidden border border-gray-100 lg:mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 lg:p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="text-center lg:text-left">
            <h1 className="text-2xl lg:text-3xl font-bold mb-2 lg:mb-3">
              Chi Tiết Đơn Hàng
            </h1>
            <div className="w-20 h-1.5 bg-orange-200 rounded-full mx-auto lg:mx-0"></div>
          </div>
          <div className="text-center lg:text-right">
            <p className="text-orange-100 text-sm">Mã đơn hàng</p>
            <p className="text-lg lg:text-xl font-mono font-bold tracking-wide break-all">
              {orderUser._id}
            </p>
          </div>
        </div>
      </div>

      {/* Order Information */}
      <div className="p-4 lg:p-8 border-b border-gray-100 bg-gray-50/50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Thông tin chính */}
          <div className="bg-white p-4 lg:p-6 rounded-lg lg:rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-blue-600 text-sm lg:text-lg">💰</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs lg:text-sm text-gray-500">Tổng giá trị</p>
                <p className="text-lg lg:text-2xl font-bold text-orange-600 truncate">
                  {new Intl.NumberFormat("vi-VN").format(
                    orderUser.totalPrice || 0
                  )}{" "}
                  VND
                </p>
              </div>
            </div>
          </div>

          {/* Ngày tạo */}
          <div className="bg-white p-4 lg:p-6 rounded-lg lg:rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-orange-600 text-sm lg:text-lg">📅</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs lg:text-sm text-gray-500">
                  Ngày đặt hàng
                </p>
                <p className="text-sm lg:text-base font-semibold text-gray-900 truncate">
                  {new Date(orderUser.createdAt).toLocaleDateString("vi-VN", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {new Date(orderUser.createdAt).toLocaleTimeString("vi-VN")}
                </p>
              </div>
            </div>
          </div>

          {/* Trạng thái */}
          <div className="bg-white p-4 lg:p-6 rounded-lg lg:rounded-xl shadow-sm border border-gray-200 md:col-span-2 lg:col-span-1">
            <div className="flex items-center">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-purple-600 text-sm lg:text-lg">📦</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs lg:text-sm text-gray-500">
                  Trạng thái đơn hàng
                </p>
                <span
                  className={`inline-flex items-center px-3 py-1 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-semibold mt-1 ${
                    orderUser.status === "completed"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : orderUser.status === "pending"
                      ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                      : orderUser.status === "cancelled"
                      ? "bg-red-100 text-red-800 border border-red-200"
                      : orderUser.status === "processing"
                      ? "bg-blue-100 text-blue-800 border border-blue-200"
                      : orderUser.status === "delivered"
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      : "bg-gray-100 text-gray-800 border border-gray-200"
                  }`}
                >
                  {orderUser.status === "completed"
                    ? "✅ Đã hoàn thành"
                    : orderUser.status === "pending"
                    ? "⏳ Chờ xử lý"
                    : orderUser.status === "cancelled"
                    ? "❌ Đã hủy"
                    : orderUser.status === "processing"
                    ? "🔄 Đang xử lý"
                    : orderUser.status === "delivered"
                    ? "🚚 Đã giao hàng"
                    : orderUser.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="p-4 lg:p-8">
        <div className="flex items-center mb-6 lg:mb-8">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg lg:rounded-xl flex items-center justify-center mr-3 lg:mr-4 shadow-lg flex-shrink-0">
            <span className="text-white text-lg lg:text-xl">🛒</span>
          </div>
          <div className="min-w-0">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 truncate">
              Danh Sách Sản Phẩm
            </h2>
            <p className="text-gray-600 text-sm lg:text-base mt-1">
              {orderUser.items?.length || 0} sản phẩm trong đơn hàng
            </p>
          </div>
        </div>

        <div className="space-y-3 lg:space-y-4">
          {orderUser.items?.map((item: any, index: number) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl lg:rounded-2xl p-4 lg:p-6 hover:shadow-lg transition-all duration-300 bg-white group hover:border-orange-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex items-start space-x-3 lg:space-x-5 flex-1 min-w-0">
                  {/* Product Image */}
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg lg:rounded-xl flex items-center justify-center overflow-hidden border border-gray-200 shadow-sm flex-shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xl lg:text-2xl text-gray-400">
                        📷
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-base lg:text-lg mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {item.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center px-2 py-1 lg:px-3 lg:py-1.5 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">
                        SL: {item.quantity}
                      </span>
                      <span className="inline-flex items-center px-2 py-1 lg:px-3 lg:py-1.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200">
                        {new Intl.NumberFormat("vi-VN").format(item.price)} VND
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-left sm:text-right ml-0 sm:ml-4">
                  <p className="text-lg lg:text-xl font-bold text-orange-600 mb-1">
                    {new Intl.NumberFormat("vi-VN").format(
                      item.price * item.quantity
                    )}{" "}
                    VND
                  </p>
                  <p className="text-xs lg:text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded">
                    {item.quantity} ×{" "}
                    {new Intl.NumberFormat("vi-VN").format(item.price)} VND
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tổng kết */}
        {orderUser.items?.length > 0 && (
          <div className="mt-6 lg:mt-8 bg-gradient-to-r from-orange-50 to-orange-50 border border-gray-200 rounded-xl lg:rounded-2xl p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
              <div className="text-center sm:text-left">
                <p className="text-gray-600 text-sm lg:text-base">
                  Tổng số sản phẩm
                </p>
                <p className="text-base lg:text-lg font-semibold text-gray-900">
                  {orderUser.items.reduce(
                    (total: number, item: any) => total + item.quantity,
                    0
                  )}{" "}
                  sản phẩm
                </p>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-gray-600 text-sm lg:text-base">
                  Tổng thanh toán
                </p>
                <p className="text-xl lg:text-2xl font-bold text-orange-600">
                  {new Intl.NumberFormat("vi-VN").format(
                    orderUser.totalPrice || 0
                  )}{" "}
                  VND
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 lg:p-8 border-t border-gray-200">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <p className="text-gray-700 font-medium text-sm lg:text-base mb-1 lg:mb-2">
              Cảm ơn bạn đã mua sắm với chúng tôi!
            </p>
            <p className="text-xs lg:text-sm text-gray-500">
              Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ với bộ phận hỗ trợ.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 lg:gap-3 w-full sm:w-auto order-1 lg:order-2">
            <button className="px-4 py-2 lg:px-6 lg:py-3 border border-gray-300 rounded-lg lg:rounded-xl text-gray-700 hover:bg-white hover:shadow-md transition-all duration-200 font-medium flex items-center justify-center text-sm lg:text-base">
              <span className="mr-2">🖨️</span>
              In hóa đơn
            </button>
            <button className="px-4 py-2 lg:px-6 lg:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg lg:rounded-xl hover:from-orange-600 hover:to-orange-700 hover:shadow-lg transition-all duration-200 font-medium flex items-center justify-center text-sm lg:text-base">
              <span className="mr-2">📍</span>
              Theo dõi đơn hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderOrderUsers;
