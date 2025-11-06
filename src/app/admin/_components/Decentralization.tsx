"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

const Decentralization = ({
  setShowModal,
  selectedUser,
  setSelectedUser,
  fetchUser,
}: any) => {
  const handleSaveRole = async () => {
    try {
      const res = await fetch("/api/user/role", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userId: selectedUser._id,
          role: selectedUser.role,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        setShowModal(false);
        fetchUser();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        {/* Nút đóng */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <IoMdClose size={20} />
        </button>

        <h2 className="text-xl font-bold text-orange-600 mb-4 text-center">
          Phân Quyền Người Dùng
        </h2>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Họ và tên:</p>
            <p className="text-base font-semibold text-gray-900">
              {selectedUser.name}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Email:</p>
            <p className="text-base text-gray-900">{selectedUser.email}</p>
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Vai trò
            </label>
            <select
              id="role"
              defaultValue={selectedUser.role}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, role: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="user">Người dùng</option>
              <option value="admin">Quản trị viên</option>
            </select>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 mr-2"
            >
              Hủy
            </button>
            <button
              onClick={handleSaveRole}
              className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600"
            >
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Decentralization;
