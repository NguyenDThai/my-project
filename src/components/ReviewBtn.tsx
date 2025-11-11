/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";

const ReviewBtn = ({ setShowModal, setSelectedOrderId, orderId }: any) => {
  const handleClickBtn = (id: string) => {
    setSelectedOrderId(id);
    setShowModal(true);
  };

  return (
    <>
      <button
        onClick={() => handleClickBtn(orderId)}
        className="px-3 py-2 lg:px-4 lg:py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 hover:shadow-lg transition-all duration-200 font-medium flex items-center justify-center text-xs lg:text-sm cursor-pointer"
      >
        Đánh giá
      </button>
    </>
  );
};

export default ReviewBtn;
