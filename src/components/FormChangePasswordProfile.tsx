/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

const FormChangePasswordProfile = ({ setOpenFormChangePass }: any) => {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/change-passowrd", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ currentPass, newPass, confirmPass }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      setOpenFormChangePass(false);
    } catch (error) {
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Thay đổi mật khẩu
              </h2>
            </div>
            <button
              className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              onClick={() => setOpenFormChangePass(false)}
            >
              <IoClose size={30} />
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Cập nhật mật khẩu mới cho tài khoản của bạn
          </p>
        </div>

        {/* Form */}
        <form
          className="px-6 py-5 space-y-5"
          onSubmit={handleChangePasswordSubmit}
        >
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <span className="text-red-500">*</span>
              Mật khẩu hiện tại
            </label>
            <input
              type="password"
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 placeholder-gray-400"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <span className="text-red-500">*</span>
              Mật khẩu mới
            </label>
            <input
              type="password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 placeholder-gray-400"
              placeholder="Ít nhất 8 ký tự"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <span className="text-red-500">*</span>
              Xác nhận mật khẩu mới
            </label>
            <input
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 placeholder-gray-400"
              placeholder="••••••••"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setOpenFormChangePass(false)}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormChangePasswordProfile;
