/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import BtnUpdateStatus from "@/app/admin/_components/BtnUpdateStatus";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const RenderAllOrder = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [value, setValue] = useState("");
  const [filteredOrder, setFilteredOrder] = useState<any[]>([]);
  const [filterStatus, setFilterStatus] = useState("");

  const fetchAllOrder = async () => {
    const res = await fetch("/api/admin/order");
    const data = await res.json();
    setOrders(data.data);
    setFilteredOrder(data.data);
  };

  useEffect(() => {
    fetchAllOrder();
  }, []);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Status badge color
  const getStatusColor = (status: string) => {
    const colors: any = {
      processing: "bg-blue-100 text-blue-800 border-blue-200",
      completed: "bg-green-100 text-green-800 border-green-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  // Handle filter order
  const handleSearch = () => {
    const keyword = value.toLowerCase().trim();
    const result = orders.filter((order) => {
      const matchKeyWord =
        order.name.toLowerCase().includes(keyword) ||
        order.phone.toString().includes(keyword) ||
        order._id.slice(-8).toLowerCase().includes(keyword);

      const matchStatus = filterStatus === "" || order.status === filterStatus;

      return matchKeyWord && matchStatus;
    });

    setFilteredOrder(result);
  };

  const handleClearInput = () => {
    setValue("");
    fetchAllOrder();
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">
              Quản lý đơn hàng
            </h1>
            <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
              Tổng số {filteredOrder.length} đơn hàng
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch xs:items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 xs:flex-none">
              <input
                type="text"
                placeholder="Nhập tên hoặc số điện thoại"
                className="w-full xs:w-[200px] sm:w-[250px] p-2 sm:p-3 border border-gray-600 rounded-lg sm:rounded-xl text-sm sm:text-base"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              {value && (
                <div
                  onClick={handleClearInput}
                  className="absolute p-1 top-1/2 right-1 -translate-y-1/2 cursor-pointer"
                >
                  <IoMdClose size={18} className="sm:w-5 sm:h-5" />
                </div>
              )}
            </div>

            <button
              className="lg:hidden p-2 bg-orange-500 text-white rounded-lg text-sm font-medium"
              onClick={handleSearch}
            >
              Tìm kiếm
            </button>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-600 p-2 sm:p-2 rounded-lg text-sm sm:text-base w-full xs:w-auto"
            >
              <option value="">Tất cả đơn hàng</option>
              <option value="completed">Hoàn thành</option>
              <option value="processing">Đang xử lý</option>
              <option value="pending">Chờ xử lý</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid gap-4 sm:gap-6">
          {filteredOrder.length > 0 ? (
            filteredOrder.map((order: any, index: number) => (
              <div
                key={index}
                className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                {/* Order Header */}
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="bg-blue-50 rounded-lg p-2 sm:p-3 flex-shrink-0">
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          Đơn hàng #{order._id.slice(-8).toUpperCase()}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 self-start sm:self-auto">
                      <span
                        className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status === "processing"
                          ? "Đang xử lý"
                          : order.status === "completed"
                          ? "Hoàn thành"
                          : order.status === "cancelled"
                          ? "Đã hủy"
                          : "Chờ xử lý"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Body */}
                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                    {/* Customer Info */}
                    <div className="space-y-3 sm:space-y-4">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                        Thông tin khách hàng
                      </h4>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <svg
                            className="w-4 h-4 text-gray-400 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          <span className="text-gray-900 font-medium text-sm sm:text-base truncate">
                            {order.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <svg
                            className="w-4 h-4 text-gray-400 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          <span className="text-gray-600 text-sm sm:text-base">
                            +84 {order.phone}
                          </span>
                        </div>
                        <div className="flex items-start gap-2 sm:gap-3">
                          <svg
                            className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span className="text-gray-600 text-sm sm:text-base break-words flex-1">
                            {order.address}
                          </span>
                        </div>
                      </div>

                      {order.note && (
                        <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                          <p className="text-xs sm:text-sm text-yellow-800">
                            <span className="font-medium">Ghi chú:</span>{" "}
                            {order.note}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Order Items */}
                    <div className="lg:col-span-2">
                      <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">
                        Sản phẩm
                      </h4>
                      <div className="space-y-2 sm:space-y-3">
                        {order.items.map((item: any, itemIndex: number) => (
                          <div
                            key={itemIndex}
                            className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                                <Image
                                  src={item.image}
                                  alt="item-image"
                                  width={100}
                                  height={100}
                                  className="h-full w-full object-cover rounded"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="font-medium text-gray-900 text-sm sm:text-base truncate">
                                  {item.name}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-500">
                                  Số lượng: {item.quantity} ×{" "}
                                  {formatCurrency(item.price)}
                                </p>
                              </div>
                            </div>
                            <span className="font-semibold text-gray-900 text-sm sm:text-base ml-2 flex-shrink-0">
                              {formatCurrency(item.quantity * item.price)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Order Summary */}
                      <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
                        <div className="space-y-1 sm:space-y-2">
                          <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                            <span>Tạm tính:</span>
                            <span>
                              {formatCurrency(
                                order.totalPrice - order.shippingFee
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                            <span>Phí vận chuyển:</span>
                            <span>{formatCurrency(order.shippingFee)}</span>
                          </div>
                          <div className="flex justify-between text-base sm:text-lg font-semibold text-gray-900 pt-2 border-t border-gray-200">
                            <span>Tổng cộng:</span>
                            <span>{formatCurrency(order.totalPrice)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Footer */}
                <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Cập nhật: {formatDate(order.updatedAt)}
                    </div>

                    <div className="flex gap-2 self-end sm:self-auto">
                      <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 whitespace-nowrap">
                        Xem chi tiết
                      </button>
                      <BtnUpdateStatus
                        order={order}
                        orderId={order._id}
                        currentStatus={order.status}
                        onStatusUpdated={(newStatus) => {
                          setOrders((prev) =>
                            prev.map((o: any) =>
                              o._id === order._id
                                ? { ...o, status: newStatus }
                                : o
                            )
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 sm:py-12">
              <div className="bg-gray-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 sm:mb-2">
                Không có đơn hàng phù hợp
              </h3>
              <p className="text-gray-500 text-sm sm:text-base">
                Không tìm thấy đơn hàng theo từ khóa bạn nhập.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RenderAllOrder;
