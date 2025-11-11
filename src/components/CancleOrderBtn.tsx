/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";

const CancleOrderBtn = ({ orderId, fetchOrder }: any) => {
  const [hiddenBtn, setHiddenBtn] = useState(true);

  const handleCancle = async (id: string) => {
    if (!confirm("Bạn có chắc muốn hủy đơn hàng chứ")) return;
    try {
      const res = await fetch(`/api/user/order/cancel/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ status: "cancelled" }),
      });

      if (res.ok) {
        toast.success("Đơn hàng đã được hủy");
        fetchOrder();
        setHiddenBtn(false);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {hiddenBtn && (
        <button
          onClick={() => handleCancle(orderId)}
          className="px-3 py-2 lg:px-4 lg:py-2 bg-orange-600 rounded-lg text-white hover:bg-orange-500 hover:shadow-md transition-all duration-200 font-medium flex items-center justify-center text-xs lg:text-sm cursor-pointer"
        >
          Hủy Đơn Hàng
        </button>
      )}
    </>
  );
};

export default CancleOrderBtn;
