/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PaginationUi from "@/app/admin/_components/PaginationUi";
import { FeedBacks } from "@/types/feedback.type";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const FeedBackForAdmin = () => {
  const [feedbacks, setFeedbacks] = useState<FeedBacks[]>([]);
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const LIMIT = 5;

  useEffect(() => {
    fetchFeedBacks();
  }, [status, page]);

  // Hàm hiển thị tất cả feedback
  const fetchFeedBacks = async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: LIMIT.toString(),
      });

      if (status !== "all") {
        params.append("status", status);
      }
      const res = await fetch(`/api/admin/feedback?${params.toString()}`);
      const data = await res.json();

      setTotalPage(data.totalPages);
      if (!res.ok) {
        throw new Error("Đã có lỗi xảy ra khi lấy feedback");
      }
      setFeedbacks(data.data);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  // Hàm xử lý duyệt feedback
  const handleFeedbacks = async (
    id: string,
    status: "approved" | "rejected"
  ) => {
    try {
      const res = await fetch(`/api/admin/feedback/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      toast.success("Cập nhật phản hồi thành công");
      fetchFeedBacks();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // Hàm xử lý status khi lọc thì page về 1
  const handleChangeStatus = (value: string) => {
    setPage(1);
    setStatus(value);
  };

  return (
    <>
      <div className="flex justify-end mb-10">
        <select
          className="text-center border w-30 p-1"
          onChange={(e) => handleChangeStatus(e.target.value)}
        >
          <option value="all">Tất cả</option>
          <option value="pending">Chưa duyệt</option>
          <option value="approved">Đã duyệt</option>
          <option value="rejected">Từ chối</option>
        </select>
      </div>
      {feedbacks.map((fb) => {
        const subjectLabels: Record<string, string> = {
          order: "Đặt hàng & Giao hàng",
          quality: "Chất lượng món ăn",
          payment: "Thanh toán",
          feedback: "Góp ý & Phản hồi",
          other: "Khác",
        };

        const subjectLabel = subjectLabels[fb.subject] || fb.subject;

        const statusConfig = {
          pending: {
            label: "Đang chờ",
            icon: "⏳",
            bg: "bg-yellow-50",
            text: "text-yellow-800",
            border: "border-yellow-200",
          },
          approved: {
            label: "Đã duyệt",
            icon: "✅",
            bg: "bg-green-50",
            text: "text-green-800",
            border: "border-green-200",
          },
          rejected: {
            label: "Đã từ chối",
            icon: "❌",
            bg: "bg-red-50",
            text: "text-red-800",
            border: "border-red-200",
          },
        };

        const status = statusConfig[fb.status];

        return (
          <div
            key={fb._id}
            className="relative border border-gray-100 p-6 rounded-xl mb-4 shadow-sm hover:shadow-lg transition-all duration-300 bg-white group"
          >
            {/* Corner accent based on status */}
            <div
              className={`absolute top-0 left-0 w-1.5 h-full ${status.bg} rounded-l-xl`}
            ></div>

            <div className="ml-2">
              {/* Header với avatar và info */}
              <div className="flex items-start gap-4 mb-4">
                {/* Avatar circle */}
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                  <span className="font-bold text-lg text-orange-600">
                    {fb.name.charAt(0).toUpperCase()}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 truncate">
                        {fb.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {subjectLabel}
                        </span>
                      </div>
                    </div>

                    {/* Status badge với icon và animation */}
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${status.bg} ${status.text} ${status.border} border transition-all duration-300 group-hover:scale-105`}
                    >
                      <span className="text-base">{status.icon}</span>
                      {status.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Feedback content with better styling */}
              <div className="relative mb-4">
                <div className="absolute -left-2 top-0 text-2xl text-gray-300"></div>
                <div className="ml-4 pl-3 border-l-2 border-indigo-100">
                  <p className="text-gray-700 text-base leading-relaxed italic">
                    {fb.message}
                  </p>
                </div>
                <div className="absolute -right-2 bottom-0 text-2xl text-gray-300 rotate-180"></div>
              </div>

              {/* Contact info with improved icons */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4 pl-2">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="p-1.5 bg-white rounded-md shadow-sm">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <span className="font-medium">{fb.phone}</span>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="p-1.5 bg-white rounded-md shadow-sm">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <span className="font-medium truncate max-w-[500px]">
                    {fb.email}
                  </span>
                </div>
              </div>

              {/* Action buttons với gradient và hover effects */}
              {fb.status === "pending" && (
                <div className="flex gap-3 mt-5 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleFeedbacks(fb._id, "approved")}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-5 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <div className="p-1 bg-white/20 rounded-full">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span>Duyệt phản hồi</span>
                  </button>

                  <button
                    onClick={() => handleFeedbacks(fb._id, "rejected")}
                    className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white px-5 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <div className="p-1 bg-white/20 rounded-full">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    <span>Từ chối</span>
                  </button>
                </div>
              )}

              {/* Timestamp (optional - bạn có thể thêm createdAt vào type) */}
              <div className="mt-3 text-xs text-gray-400 text-right">
                ID: {fb._id.slice(-8)}
              </div>
            </div>
          </div>
        );
      })}
      <PaginationUi page={page} setPage={setPage} totalPage={totalPage} />
    </>
  );
};

export default FeedBackForAdmin;
