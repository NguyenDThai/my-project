"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (res.ok) {
        toast.success(result.message);
        setData({ name: "", email: "", password: "", confirmPassword: "" });
        router.push("/login");
      } else if (res.status === 400) {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-orange-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-96 space-y-6 border border-gray-100"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Đăng Ký</h2>
          <p className="text-gray-500 text-sm">Tạo tài khoản mới của bạn</p>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Họ và tên
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Nhập họ và tên của bạn"
              className="w-full outline-none px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orgring-orange-500 transition-all duration-200"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Nhập email của bạn"
              value={data.email}
              onChange={handleChange}
              className="w-full outline-none px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orring-orange-500 transition-all duration-200"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Nhập mật khẩu của bạn"
              value={data.password}
              onChange={handleChange}
              className="w-full outline-none px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orring-orange-500 transition-all duration-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nhập lại mật khẩu
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu của bạn"
              value={data.confirmPassword}
              onChange={handleChange}
              className="w-full outline-none px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orring-orange-500 transition-all duration-200"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-gradient-to-r bg-orange-600 text-white py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg ${
            loading
              ? "opacity-70 cursor-not-allowed"
              : "hover:bg-white hover:border hover:border-orange-500 hover:text-orange-500 cursor-pointer"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Đang tải vui lòng đợi...
            </div>
          ) : (
            "Đăng Ký"
          )}
        </button>

        <div className="text-center pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <a
              href="/login"
              className="text-orange-600 hover:text-orange-800 font-medium transition-colors duration-200"
            >
              Đăng nhập
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
