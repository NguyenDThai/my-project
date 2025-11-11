/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";

const ReviewBtn = ({
  setShowModal,
  setSelectedOrderId,
  orderId,
  order,
}: any) => {
  const handleClickBtn = (id: string) => {
    setSelectedOrderId(id);
    setShowModal(true);
  };

  const hasReview = order.review && Object.keys(order.review).length > 0;

  return (
    <>
      <button
        onClick={() => handleClickBtn(orderId)}
        disabled={hasReview}
        className={`px-3 py-2 lg:px-4 lg:py-2 rounded-lg transition-all duration-200 font-medium flex items-center justify-center text-xs lg:text-sm ${
          hasReview
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 hover:shadow-lg"
        }`}
      >
        {hasReview ? "Đã đánh giá" : "Đánh giá"}
      </button>
    </>
  );
};

export default ReviewBtn;
