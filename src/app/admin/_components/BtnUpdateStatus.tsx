/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";

interface BtnUpdateStatusProps {
  order: any;
  orderId: string;
  currentStatus: string;
  onStatusUpdated?: (newStatus: string) => void;
}

const BtnUpdateStatus: React.FC<BtnUpdateStatusProps> = ({
  order,
  orderId,
  currentStatus,
  onStatusUpdated,
}) => {
  const [open, setOpen] = useState(false);
  const [newStatus, setNewStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/order/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Cập nhật thất bại");

      // Callback để cập nhật UI bên ngoài
      if (onStatusUpdated) onStatusUpdated(newStatus);

      toast.success("Cập nhật trạng thái thành công!");
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Có lỗi xảy ra khi cập nhật trạng thái");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        disabled={currentStatus === "completed"}
        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200
    ${
      currentStatus === "completed"
        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
        : "text-green-600 bg-green-50 hover:bg-green-100"
    }`}
      >
        Cập nhật TT
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Cập nhật trạng thái đơn hàng
            </h2>

            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="pending">Chờ xử lý</option>
              <option value="processing">Đang xử lý</option>
              <option value="completed">Hoàn thành</option>
              <option value="cancelled">Đã hủy</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                disabled={loading}
              >
                Hủy
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-1.5 text-sm text-white bg-green-600 cursor-pointer  rounded-md hover:bg-green-700 transition"
                disabled={loading}
              >
                {loading ? "Đang cập nhật..." : "Lưu"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BtnUpdateStatus;
