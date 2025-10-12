"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.error) {
      toast.error("Sai thông tin đăng nhập");
    } else {
      toast.success("Đăng nhập thành công!");
      router.push("/"); // chuyển về trang chủ
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-96 space-y-6 border border-gray-100"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Đăng Nhập</h2>
          <p className="text-gray-500 text-sm">Chào mừng bạn trở lại</p>
        </div>

        <div className="space-y-4">
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
              value={data.email}
              onChange={handleOnChange}
              placeholder="Vui lòng nhập email của bạn..."
              className="w-full text-black px-4 py-3 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
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
              value={data.password}
              onChange={handleOnChange}
              placeholder="Vui lòng nhập mật khẩu của bạn..."
              className="w-full text-black px-4 py-3 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-600">Ghi nhớ đăng nhập</span>
          </label>
          <a
            href="#"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            Quên mật khẩu?
          </a>
        </div>

        <div className="flex justify-between gap-3">
          <button
            type="submit"
            className="w-full max-h-15 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Đăng Nhập
          </button>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full max-h-15 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Đăng nhập Google
          </button>
        </div>

        <div className="text-center pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <a
              href="/register"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Đăng ký ngay
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
