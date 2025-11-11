/* eslint-disable @typescript-eslint/no-explicit-any */
import ReceivedProductBtn from "@/components/ReceivedProductBtn";
import ReviewBtn from "@/components/ReviewBtn";
import ReviewModal from "@/components/ReviewModal";
import Image from "next/image";
import React from "react";

const RenderOrderUsers = ({
  orderUser,
  showModal,
  setShowModal,
  selectedOrderId,
  setSelectedOrderId,
  fetchOrder,
}: any) => {
  // Kiểm tra nếu orderUser là mảng và có dữ liệu
  if (!Array.isArray(orderUser) || orderUser.length === 0) {
    return (
      <div className="mt-8 max-w-4xl min-h-screen mx-auto bg-white shadow-xl rounded-lg lg:rounded-2xl overflow-hidden border border-gray-100 lg:mx-auto">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white text-center">
          <h1 className="text-2xl lg:text-3xl font-bold mb-3">
            Đơn Hàng Của Tôi
          </h1>
        </div>
        <div className="p-8 text-center">
          <p className="text-gray-600 text-lg">Bạn chưa có đơn hàng nào.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl min-h-screen mx-auto lg:mx-auto">
      {/* Header chung */}
      <div className="mt-30 bg-gradient-to-r from-orange-500 to-orange-600 p-4 lg:p-8 text-white mb-6 rounded-lg lg:rounded-2xl">
        <div className="text-center">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2 lg:mb-3">
            Đơn Hàng Của Tôi
          </h1>
          <div className="w-20 h-1.5 bg-orange-200 rounded-full mx-auto"></div>
          <p className="text-orange-100 text-sm mt-2">
            Tổng số đơn hàng: {orderUser.length}
          </p>
        </div>
      </div>

      {/* Danh sách các đơn hàng */}
      <div className="space-y-6">
        {orderUser.map((order, orderIndex) => (
          <div
            key={order._id || orderIndex}
            className="bg-white shadow-xl rounded-lg lg:rounded-2xl overflow-hidden border border-gray-100"
          >
            {/* Header cho từng đơn hàng */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 lg:p-6 text-white">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-2 lg:space-y-0">
                <div className="text-center lg:text-left">
                  <h2 className="text-xl lg:text-2xl font-bold">
                    Đơn Hàng #{orderIndex + 1}
                  </h2>
                  <p className="text-blue-100 text-sm">
                    Mã đơn hàng: {order._id}
                  </p>
                </div>
                <div className="text-center lg:text-right">
                  <span
                    className={`inline-flex items-center px-3 py-1 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-semibold ${
                      order.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : order.status === "processing"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "shipped"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status === "completed"
                      ? "✅ Đã hoàn thành"
                      : order.status === "pending"
                      ? "⏳ Chờ lấy hàng"
                      : order.status === "cancelled"
                      ? "❌ Đã hủy"
                      : order.status === "processing"
                      ? "🔄 Đang xử lý"
                      : order.status === "shipped"
                      ? "🚚 Đã giao hàng"
                      : order.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Thông tin đơn hàng */}
            <div className="p-4 lg:p-6 border-b border-gray-100 bg-gray-50/50">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {/* Tổng giá trị */}
                <div className="bg-white p-4 lg:p-6 rounded-lg lg:rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-blue-600 text-sm lg:text-lg">
                        💰
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs lg:text-sm text-gray-500">
                        Tổng giá trị
                      </p>
                      <p className="text-lg lg:text-2xl font-bold text-orange-600 truncate">
                        {new Intl.NumberFormat("vi-VN").format(
                          order.totalPrice || 0
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
                      <span className="text-orange-600 text-sm lg:text-lg">
                        📅
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs lg:text-sm text-gray-500">
                        Ngày đặt hàng
                      </p>
                      <p className="text-sm lg:text-base font-semibold text-gray-900 truncate">
                        {new Date(order.createdAt).toLocaleDateString("vi-VN", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {new Date(order.createdAt).toLocaleTimeString("vi-VN")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Số lượng sản phẩm */}
                <div className="bg-white p-4 lg:p-6 rounded-lg lg:rounded-xl shadow-sm border border-gray-200 md:col-span-2 lg:col-span-1">
                  <div className="flex items-center">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-purple-600 text-sm lg:text-lg">
                        📦
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs lg:text-sm text-gray-500">
                        Số lượng sản phẩm
                      </p>
                      <p className="text-lg lg:text-xl font-bold text-purple-600">
                        {order.items?.length || 0} sản phẩm
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="p-4 lg:p-6">
              <div className="flex items-center mb-4 lg:mb-6">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mr-3 shadow-lg flex-shrink-0">
                  <span className="text-white text-sm lg:text-lg">🛒</span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900">
                    Sản Phẩm Đã Đặt
                  </h3>
                </div>
              </div>

              <div className="space-y-3 lg:space-y-4">
                {order.items?.map((item: any, itemIndex: number) => (
                  <div
                    key={itemIndex}
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
                              {new Intl.NumberFormat("vi-VN").format(
                                item.price
                              )}{" "}
                              VND
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
                          {new Intl.NumberFormat("vi-VN").format(item.price)}{" "}
                          VND
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer cho từng đơn hàng */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 lg:p-6 border-t border-gray-200">
              <div className="flex flex-col lg:flex-row justify-between items-center space-y-3 lg:space-y-0">
                <div className="text-center lg:text-left">
                  <p className="text-gray-700 font-medium text-sm lg:text-base">
                    Tổng thanh toán:{" "}
                    <span className="text-orange-600 font-bold">
                      {new Intl.NumberFormat("vi-VN").format(
                        order.totalPrice || 0
                      )}{" "}
                      VND
                    </span>
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 lg:gap-3">
                  {order.status === "pending" &&
                    order.deliveryMethod === "delivery" && (
                      <ReceivedProductBtn
                        orderId={order._id}
                        fetchOrder={fetchOrder}
                      />
                    )}

                  {order.status === "completed" && (
                    <ReviewBtn
                      setShowModal={setShowModal}
                      setSelectedOrderId={setSelectedOrderId}
                      orderId={order._id}
                      order={order}
                    />
                  )}
                  <button className="px-3 py-2 lg:px-4 lg:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-white hover:shadow-md transition-all duration-200 font-medium flex items-center justify-center text-xs lg:text-sm">
                    <span className="mr-1">🖨️</span>
                    In hóa đơn
                  </button>
                </div>
              </div>

              {showModal && (
                <ReviewModal
                  setShowModal={setShowModal}
                  orderId={selectedOrderId}
                  fetchOrder={fetchOrder}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Tổng kết tất cả đơn hàng */}
      <div className="mt-6 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl lg:rounded-2xl p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <div className="text-center sm:text-left">
            <p className="text-gray-700 text-sm lg:text-base font-medium">
              Tổng số đơn hàng:{" "}
              <span className="text-green-600 font-bold">
                {orderUser.length}
              </span>
            </p>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-gray-700 text-sm lg:text-base font-medium">
              Tổng tiền đã chi:{" "}
              <span className="text-green-600 font-bold text-lg lg:text-xl">
                {new Intl.NumberFormat("vi-VN").format(
                  orderUser.reduce(
                    (total: number, order: any) =>
                      total + (order.totalPrice || 0),
                    0
                  )
                )}{" "}
                VND
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderOrderUsers;
