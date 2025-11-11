/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

const ReviewModal = ({ setShowModal, orderId, fetchOrder }: any) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleSubmit = async (id: string) => {
    try {
      const res = await fetch("/api/user/review", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          orderId: id,
          rating,
          comment,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setShowModal(false);
        fetchOrder();
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-11/12 max-w-md p-6 relative animate-fade-in">
        <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
          Đánh giá đơn hàng
        </h3>

        {/* Chọn sao */}
        <div className="flex justify-center mb-4">
          {[...Array(5)].map((_, i) => {
            const ratingValue = i + 1;
            return (
              <label key={i}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                  className="hidden"
                />
                <FaStar
                  size={30}
                  className={`cursor-pointer transition-colors duration-150 ${
                    ratingValue <= (hover || rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                />
              </label>
            );
          })}
        </div>

        {/* Nhập comment */}
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Viết nhận xét của bạn..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
        ></textarea>

        {/* Nút hành động */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 transition"
          >
            Hủy
          </button>
          <button
            onClick={() => handleSubmit(orderId)}
            className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition"
          >
            Gửi đánh giá
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
