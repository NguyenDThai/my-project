"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

const ModalDetailUser = ({
  selectedUser,
  setShowModalDetailUser,
  fetchUser,
}: any) => {
  const handleLockUser = async () => {
    try {
      const res = await fetch(`/api/admin/lock/${selectedUser._id}`, {
        method: "PATCH",
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        setShowModalDetailUser(false);
        fetchUser();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra khi khóa tài khoản");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={() => setShowModalDetailUser(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <IoMdClose size={20} />
        </button>

        <h2 className="text-xl font-bold text-orange-600 mb-4 text-center">
          Thông Tin Người Dùng
        </h2>

        {/* info for user */}
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Họ và tên:</p>
            <p className="text-base font-semibold text-gray-900">
              {selectedUser?.name}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Email:</p>
            <p className="text-base text-gray-900">{selectedUser?.email}</p>
          </div>

          <div className="flex items-center gap-1">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-600"
            >
              Vai trò:
            </label>
            <p className="text-base text-gray-900">{selectedUser.role}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Địa chỉ:</p>
            <p className="text-base text-gray-900">
              {selectedUser.addresses?.find((addr: any) => addr.isDefault)
                ?.address || "Thông tin của người dùng chưa cập nhật"}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">
              Số điện thoại:
            </p>
            <p className="text-base text-gray-900">
              {selectedUser.addresses?.find((addr: any) => addr.isDefault)
                ?.phone || "Thông tin của người dùng chưa cập nhật"}
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleLockUser}
            className="px-4 py-2 rounded-lg mt-5 bg-orange-500 text-white hover:bg-orange-600"
          >
            {selectedUser.isActive ? "Khóa tài khoản" : "Mở tài khoản"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDetailUser;
