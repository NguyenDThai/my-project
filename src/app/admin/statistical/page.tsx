/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import OrderChart from "@/app/admin/_components/OrderChart";
import ProductStatistic from "@/app/admin/_components/ProductStatistic";
import UserStatistic from "@/app/admin/_components/UserStatistic";
import React, { useEffect, useState } from "react";

const StatisticalPage = () => {
  const [stat, setStat] = useState<any>(null);
  console.log("🚀 ~ StatisticalPage ~ stat:", stat);
  const [activeTab, setActiveTab] = useState<"users" | "orders" | "products">(
    "users"
  );

  const fetchStat = async () => {
    const res = await fetch("/api/admin/statistical");
    const data = await res.json();
    setStat(data.data);
  };

  useEffect(() => {
    fetchStat();
  }, []);

  if (!stat) {
    return <div>Đang tải thống kê</div>;
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Nút chuyển tab - Scroll horizontal trên mobile */}
      <div className="flex gap-2 sm:gap-3 md:gap-4 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        <button
          className={`px-4 py-3 rounded-xl font-semibold text-sm sm:text-base whitespace-nowrap flex-shrink-0 min-w-[140px] sm:min-w-0 ${
            activeTab === "users"
              ? "bg-orange-600 text-white shadow-lg border-2 border-orange-500"
              : "bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-300"
          } transition-all duration-200 transform hover:scale-105`}
          onClick={() => setActiveTab("users")}
        >
          <div className="flex items-center justify-center gap-2">
            <span>👥</span>
            <span>Người dùng</span>
          </div>
        </button>

        <button
          className={`px-4 py-3 rounded-xl font-semibold text-sm sm:text-base whitespace-nowrap flex-shrink-0 min-w-[140px] sm:min-w-0 ${
            activeTab === "orders"
              ? "bg-orange-600 text-white shadow-lg border-2 border-orange-500"
              : "bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-300"
          } transition-all duration-200 transform hover:scale-105`}
          onClick={() => setActiveTab("orders")}
        >
          <div className="flex items-center justify-center gap-2">
            <span>📦</span>
            <span>Đơn hàng</span>
          </div>
        </button>

        <button
          className={`px-4 py-3 rounded-xl font-semibold text-sm sm:text-base whitespace-nowrap flex-shrink-0 min-w-[140px] sm:min-w-0 ${
            activeTab === "products"
              ? "bg-orange-600 text-white shadow-lg border-2 border-orange-500"
              : "bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-300"
          } transition-all duration-200 transform hover:scale-105`}
          onClick={() => setActiveTab("products")}
        >
          <div className="flex items-center justify-center gap-2">
            <span>🏷️</span>
            <span>Sản phẩm</span>
          </div>
        </button>
      </div>

      {/* Content area */}
      <div className="min-h-[400px]">
        {activeTab === "users" && <UserStatistic stat={stat} />}
        {activeTab === "orders" && (
          <OrderChart totalRevenue={stat.totalRevenue} />
        )}
        {activeTab === "products" && <ProductStatistic stat={stat} />}
      </div>
    </div>
  );
};

export default StatisticalPage;
