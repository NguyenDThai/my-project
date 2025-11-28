/* eslint-disable @typescript-eslint/no-explicit-any */
import StatCard from "@/app/admin/_components/StatCard";
import React from "react";

const ProductStatistic = ({ stat }: any) => {
  const productBycategory = stat.productByCategoryVn;

  return (
    <div className="space-y-8">
      {/* Tổng số */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Tổng sản phẩm"
          value={stat.totalProduct}
          color="orange"
        />
      </div>

      {/* Liệt kê tất cả loại sản phẩm */}
      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h3 className="text-xl font-semibold mb-8 text-gray-800 flex items-center">
          <svg
            className="w-5 h-5 mr-2 text-orange-500 border-orange-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
            <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
            <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
          </svg>
          Thống kê theo từng loại sản phẩm
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productBycategory.map((item: any, index: number) => (
            <div
              key={item.category}
              className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 hover:border-orange-300 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
                  {item.category}
                </p>
                <div className="w-8 h-8 bg-orborder-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-400 border-orange-200 transition-colors">
                  <span className="text-orange-500 border-orange-600 font-bold text-sm group-hover:text-white">
                    {index + 1}
                  </span>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {item.count}
              </p>
              <p className="text-sm text-gray-500">Sản phẩm</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductStatistic;
