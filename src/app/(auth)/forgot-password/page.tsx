"use client";

import React, { useState } from "react";
import { MdOutlineEmail, MdOutlineKeyboardArrowLeft } from "react-icons/md";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        console.log("Api error", res.status);
        return;
      }

      const data = await res.json();

      if (data.success) {
        window.location.href = `reset-password?token=${data.token}`;
      }
    } catch (error) {
      console.error("Error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 mb-4">
              <svg
                className="w-7 h-7 text-white"
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
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Quên mật khẩu?
            </h1>
            <p className="text-gray-600 text-sm">
              Đừng lo lắng! Hãy nhập email và chúng tôi sẽ gửi liên kết đặt lại
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email đăng ký
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3.5 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center justify-center gap-2">
                <MdOutlineEmail size={20} />
                Gửi liên kết khôi phục
              </span>
            </button>
          </form>

          {/* Message */}
          {message && (
            <div
              className={`mt-6 p-4 rounded-lg ${
                message.includes("thành công") || message.includes("kiểm tra")
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.includes("thành công") ||
                    message.includes("kiểm tra")
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {message.includes("thành công") ||
                  message.includes("kiểm tra")
                    ? "✓"
                    : "!"}
                </div>
                <p
                  className={`text-sm ${
                    message.includes("thành công") ||
                    message.includes("kiểm tra")
                      ? "text-green-800"
                      : "text-red-800"
                  }`}
                >
                  {message}
                </p>
              </div>
            </div>
          )}

          {/* Back to login */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <a
              href="/login"
              className="flex items-center justify-center text-sm text-gray-600 hover:text-orange-600 transition-colors"
            >
              <MdOutlineKeyboardArrowLeft size={20} />
              Quay lại trang đăng nhập
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
