/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const OrderChart = ({ totalRevenue }: any) => {
  const [chartData, setChartData] = useState<any>(null);

  const fetchOrderStat = async () => {
    const res = await fetch("/api/admin/order-stat");
    const data = await res.json();

    const months = data.data.map((x: any) => "Th" + x._id);
    const totals = data.data.map((x: any) => x.total);

    setChartData({
      labels: months,
      datasets: [
        {
          label: "Số đơn hàng theo tháng",
          data: totals,
          borderWidth: 3,
          borderColor: "rgb(99, 102, 241)",
          backgroundColor: "rgba(99, 102, 241, 0.3)",
          pointBackgroundColor: "rgb(99, 102, 241)",
          tension: 0.3,
        },
      ],
    });
  };

  useEffect(() => {
    fetchOrderStat();
  }, []);

  if (!chartData) return <div>Đang tải biểu đồ...</div>;
  return (
    <div className="bg-white p-3 sm:p-5 md:p-6 rounded-xl shadow">
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3 md:gap-4 mb-4 md:mb-6">
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-700 text-center xl:text-left">
          📊 Biểu đồ thống kê đơn hàng theo tháng
        </h2>

        <div className="bg-blue-50 px-4 py-3 rounded-lg border border-blue-200">
          <p className="font-semibold text-sm sm:text-base md:text-lg text-blue-800 text-center xl:text-left">
            Tổng doanh thu:{" "}
            <span className="text-blue-600">
              {totalRevenue.toLocaleString()} VND
            </span>
          </p>
        </div>
      </div>

      <div className="w-full h-[250px] xs:h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px]">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: "top",
                labels: {
                  boxWidth: 12,
                  font: {
                    size: window.innerWidth < 640 ? 10 : 12,
                  },
                },
              },
            },
            scales: {
              x: {
                ticks: {
                  font: {
                    size: window.innerWidth < 640 ? 10 : 12,
                  },
                },
              },
              y: {
                ticks: {
                  font: {
                    size: window.innerWidth < 640 ? 10 : 12,
                  },
                  callback: function (value) {
                    const num =
                      typeof value === "string" ? parseFloat(value) : value;
                    if (
                      typeof num === "number" &&
                      !isNaN(num) &&
                      window.innerWidth < 640
                    ) {
                      return num >= 1000 ? num / 1000 + "k" : num;
                    }
                    return value;
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default OrderChart;
