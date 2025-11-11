/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";

const ReceivedProductBtn = ({ orderId }: any) => {
  const [loading, setLoading] = useState(false);

  const handleReceived = async (id: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/user/order/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ status: "completed" }),
      });

      if (res.ok) {
        toast.success("Xác nhận đơn hàng thành công, Chúc bạn ngon miệng");
      } else {
        throw new Error("Cập nhật thất bại");
      }
    } catch (error: any) {
      toast.error("Có lỗi xảy ra khi cập nhật trạng thái");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={() => handleReceived(orderId)}
      className="px-3 py-2 lg:px-4 lg:py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 hover:shadow-lg transition-all duration-200 font-medium flex items-center justify-center text-xs lg:text-sm cursor-pointer"
    >
      Đã nhận được hàng
    </button>
  );
};

export default ReceivedProductBtn;
