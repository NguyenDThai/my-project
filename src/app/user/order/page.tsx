/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import RenderOrderUsers from "@/components/RenderOrderUsers";
import { IOrder } from "@/models/Orders";
import React, { useEffect, useState } from "react";

export interface OrderUserType extends IOrder {
  _id: string;
}

const OrderPage = () => {
  const [orderUser, setOrderUser] = useState<OrderUserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState("");

  const fetchOrderUser = async () => {
    try {
      const res = await fetch("/api/user/order");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Lỗi khi lấy đơn hàng");
      }

      setOrderUser(data.orderUser);
    } catch (error: any) {
      console.error("Lỗi khi fetch đơn hàng:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderUser();
  }, []);

  if (loading) {
    return <div className="mt-20 text-center">Đang tải đơn hàng...</div>;
  }

  if (error) {
    return <div className="mt-20 text-center text-red-500">{error}</div>;
  }

  if (!orderUser) {
    return (
      <div className="mt-20 text-center">
        Không có đơn hàng nào để hiển thị.
      </div>
    );
  }

  return (
    <div className="mt-20">
      <RenderOrderUsers
        orderUser={orderUser}
        showModal={showModal}
        setShowModal={setShowModal}
        selectedOrderId={selectedOrderId}
        setSelectedOrderId={setSelectedOrderId}
        fetchOrder={fetchOrderUser}
      />
    </div>
  );
};

export default OrderPage;
