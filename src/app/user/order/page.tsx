/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import RenderOrderUsers from "@/components/RenderOrderUsers";
import { IOrder } from "@/models/Orders";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export interface OrderUserType extends IOrder {
  _id: string;
}

const OrderPage = () => {
  const [orderUser, setOrderUser] = useState<OrderUserType>(
    {} as OrderUserType
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchOrderUser = async () => {
        const res = await fetch("/api/user/order");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Lỗi khi lấy đơn hàng");
        }
        setOrderUser(data.orderUser);
      };
      fetchOrderUser();
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading)
    return <div className="mt-20 text-center">Đang tải đơn hàng</div>;

  return <RenderOrderUsers orderUser={orderUser} />;
};

export default OrderPage;
