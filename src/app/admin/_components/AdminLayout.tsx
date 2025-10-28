"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SlMenu } from "react-icons/sl";
import BtnSignOut from "@/components/BtnSignOut";
import { FaUsers } from "react-icons/fa6";
import { IoFastFood } from "react-icons/io5";
import { FaComment } from "react-icons/fa";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AdminSidebar({ session }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Nút mở sidebar trên mobile */}
      <button
        className="md:hidden flex items-start p-3 bg-orange-500 text-white rounded-lg shadow-lg hover:bg-orange-600 transition-all duration-300 m-4"
        onClick={() => setIsOpen(true)}
      >
        <SlMenu size={24} />
      </button>

      {/* Overlay khi sidebar mở */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-fadeIn"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar chính */}
      <aside
        className={`fixed md:relative top-0 left-0 h-screen w-80 bg-gradient-to-b from-orange-500 to-orange-600 text-white p-6 z-50 transform transition-all duration-300 shadow-2xl
      ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Nút đóng trên mobile */}
        <div className="flex justify-between items-center mb-8 md:mb-10">
          <h2 className="text-2xl font-bold bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
            🚀 Admin Panel
          </h2>
          <button
            className="md:hidden p-2 hover:bg-white/20 rounded-lg transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col justify-between h-[calc(100vh-120px)]">
          {/* Navigation Menu */}
          <nav className="space-y-3">
            <Link
              href="/admin"
              className="flex items-center gap-4 py-4 px-4 rounded-2xl hover:bg-white/20 transition-all duration-300 group border border-white/10 hover:border-white/30"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                📊
              </div>
              <span className="font-semibold text-lg">Tổng quan</span>
            </Link>

            <Link
              href="/admin/users"
              className="flex items-center gap-4 py-4 px-4 rounded-2xl hover:bg-white/20 transition-all duration-300 group border border-white/10 hover:border-white/30"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <FaUsers size={20} />
              </div>
              <span className="font-semibold text-lg">Quản lý người dùng</span>
            </Link>

            <Link
              href="/admin/product"
              className="flex items-center gap-4 py-4 px-4 rounded-2xl hover:bg-white/20 transition-all duration-300 group border border-white/10 hover:border-white/30"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <IoFastFood size={20} />
              </div>
              <span className="font-semibold text-lg">Quản lý sản phẩm</span>
            </Link>

            <Link
              href="/admin/order"
              className="flex items-center gap-4 py-4 px-4 rounded-2xl hover:bg-white/20 transition-all duration-300 group border border-white/10 hover:border-white/30"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                📦
              </div>
              <span className="font-semibold text-lg">Quản lý đơn hàng</span>
            </Link>

            <Link
              href="/admin/reviews"
              className="flex items-center gap-4 py-4 px-4 rounded-2xl hover:bg-white/20 transition-all duration-300 group border border-white/10 hover:border-white/30"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <FaComment size={20} />
              </div>
              <span className="font-semibold text-lg">Quản lý đánh giá</span>
            </Link>

            <Link
              href="/admin/statistical"
              className="flex items-center gap-4 py-4 px-4 rounded-2xl hover:bg-white/20 transition-all duration-300 group border border-white/10 hover:border-white/30"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                📈
              </div>
              <span className="font-semibold text-lg">Quản lý thống kê</span>
            </Link>
          </nav>

          {/* User Info Section */}
          <div className="bg-white/10 rounded-2xl p-4 border border-white/20 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-3">
              <Image
                src="/admin.jpg"
                alt="admin-avatar"
                width={100}
                height={100}
                className="rounded-full w-12 h-12 border-2 border-white/30"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate">
                  Xin chào {session?.user?.name || "Admin"}
                </p>
                <p className="text-white/80 text-sm">Quản trị viên</p>
              </div>
            </div>
            <BtnSignOut className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 py-3 rounded-xl font-semibold transition-all duration-300" />
          </div>
        </div>
      </aside>
    </>
  );
}
