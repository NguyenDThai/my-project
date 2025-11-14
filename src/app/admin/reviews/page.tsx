/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import RenderReview from "@/app/admin/_components/RenderReview";
import { IOrder } from "@/models/Orders";
import React, { useEffect, useState } from "react";

interface ReviewRender extends IOrder {
  _id: string;
  updatedAt: Date;
}
const ReviewPageForAmin = () => {
  const [renderReview, setRenderReview] = useState<ReviewRender[]>([]);
  const [allReview, setAllReview] = useState<ReviewRender[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 5;

  const fetchReview = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/allreview");
      const result = await res.json();
      if (res.ok) {
        setAllReview(result.data);
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const start = (page - 1) * limit;
    const end = start + limit;

    setRenderReview(allReview.slice(start, end));
  }, [page, allReview]);

  useEffect(() => {
    fetchReview();
  }, []);

  const totalPages = Math.ceil(allReview.length / limit);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        Đang tải thông tin đánh giá xin vui lòng đợi...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Quản lý Đánh giá
          </h1>
          <p className="text-gray-600">
            Theo dõi và quản lý tất cả đánh giá từ khách hàng
          </p>
        </div>

        {renderReview.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">💬</span>
            </div>
            <p className="text-gray-500 text-lg">Không có đánh giá nào</p>
            <p className="text-gray-400 text-sm mt-2">
              Các đánh giá từ khách hàng sẽ xuất hiện ở đây
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            <RenderReview
              renderReview={renderReview}
              setRenderReview={setRenderReview}
              fetchReview={fetchReview}
            />

            <div className="flex justify-center items-center gap-3 mt-6">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
              >
                ← Trước
              </button>

              <span className="text-gray-600 text-sm">
                Trang {page} / {totalPages}
              </span>

              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
              >
                Sau →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewPageForAmin;
