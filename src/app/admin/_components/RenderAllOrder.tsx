/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const RenderAllOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      const fetchAllOrder = async () => {
        const res = await fetch("/api/admin/order");
        const data = await res.json();
        setOrders(data.data);
      };

      fetchAllOrder();
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
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

  // Payment status color
  const getPaymentStatusColor = (status: string) => {
    const colors: any = {
      paid: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-orange-100 text-orange-800 border-orange-200",
      failed: "bg-red-100 text-red-800 border-red-200",
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Quản lý đơn hàng</h1>
          <p className="text-gray-600 mt-2">Tổng số {orders.length} đơn hàng</p>
        </div>

        {/* Orders Grid */}
        <div className="grid gap-6">
          {orders.map((order: any, index: number) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              {/* Order Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <svg
                        className="w-6 h-6 text-blue-600"
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
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Đơn hàng #{order._id.slice(-8).toUpperCase()}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
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
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getPaymentStatusColor(
                        order.paymentStatus
                      )}`}
                    >
                      {order.paymentStatus === "paid"
                        ? "Đã thanh toán"
                        : order.paymentStatus === "pending"
                        ? "Chờ thanh toán"
                        : "Lỗi TT"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Body */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Customer Info */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">
                      Thông tin khách hàng
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <svg
                          className="w-4 h-4 text-gray-400"
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
                        <span className="text-gray-900 font-medium">
                          {order.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg
                          className="w-4 h-4 text-gray-400"
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
                        <span className="text-gray-600">+84 {order.phone}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg
                          className="w-4 h-4 text-gray-400 mt-0.5"
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
                        <span className="text-gray-600">{order.address}</span>
                      </div>
                    </div>

                    {order.note && (
                      <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <p className="text-sm text-yellow-800">
                          <span className="font-medium">Ghi chú:</span>{" "}
                          {order.note}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Order Items */}
                  <div className="lg:col-span-2">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Sản phẩm
                    </h4>
                    <div className="space-y-3">
                      {order.items.map((item: any, itemIndex: number) => (
                        <div
                          key={itemIndex}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                              <Image
                                src={item.image}
                                alt="item-image"
                                width={100}
                                height={100}
                                className="h-full w-full"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {item.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                Số lượng: {item.quantity} ×{" "}
                                {formatCurrency(item.price)}
                              </p>
                            </div>
                          </div>
                          <span className="font-semibold text-gray-900">
                            {formatCurrency(item.quantity * item.price)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Order Summary */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="space-y-2">
                        <div className="flex justify-between text-gray-600">
                          <span>Tạm tính:</span>
                          <span>
                            {formatCurrency(
                              order.totalPrice - order.shippingFee
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Phí vận chuyển:</span>
                          <span>{formatCurrency(order.shippingFee)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-semibold text-gray-900 pt-2 border-t border-gray-200">
                          <span>Tổng cộng:</span>
                          <span>{formatCurrency(order.totalPrice)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg
                      className="w-4 h-4"
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

                  <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                      Xem chi tiết
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200">
                      Cập nhật TT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {orders.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Không có đơn hàng nào
            </h3>
            <p className="text-gray-500">
              Tất cả đơn hàng sẽ được hiển thị tại đây.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RenderAllOrder;
