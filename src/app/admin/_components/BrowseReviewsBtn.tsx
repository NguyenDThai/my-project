/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { toast } from "react-toastify";

const BrowseReviewsBtn = ({
  reviewId,
  reviewItem,
  setRenderReview,
  fetchReview,
}: any) => {
  const handleApprove = async (id: string) => {
    try {
      const res = await fetch("/api/admin/approve-review", {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ orderId: id }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setRenderReview((prev: any) =>
          prev.map((r: any) =>
            r._id === id ? { ...r, review: { ...r.review, approve: true } } : r
          )
        );
        fetchReview();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi khi duyệt đánh giá");
    }
  };

  return (
    <button
      onClick={() => {
        handleApprove(reviewId);
      }}
      disabled={reviewItem.review.approved}
      className={`px-3 py-2 lg:px-4 lg:py-2 rounded-lg transition-all duration-200 font-medium flex items-center justify-center text-xs 
    ${
      reviewItem.review?.approved
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-orange-600 text-white hover:bg-orange-500"
    } lg:text-sm`}
    >
      {reviewItem.review?.approved ? "Đã duyệt phản hồi" : "Duyệt phản hồi"}
    </button>
  );
};

export default BrowseReviewsBtn;
