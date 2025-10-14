"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Header = () => {
  const { data: session, status } = useSession();
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    const lastScrolly = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrolly && window.scrollY > 30) {
        setIsScroll(true);
      } else if (window.scrollY < lastScrolly) {
        setIsScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.header
      initial={false}
      animate={{
        height: isScroll ? "60px" : "80px",
        backgroundColor: isScroll ? "rgba(255,255,255,0.95)" : "#ffffff",
        boxShadow: isScroll
          ? "0 2px 8px rgba(0,0,0,0.1)"
          : "0 1px 4px rgba(0,0,0,0.05)",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed w-full flex items-center justify-between px-8 top-0 z-50 border-b border-gray-100 backdrop-blur-md"
    >
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <motion.div transition={{ duration: 0.3, ease: "easeInOut" }}>
          <Image
            src="/header-logo.png"
            alt="header-logo"
            width={isScroll ? 80 : 100}
            height={isScroll ? 32 : 40}
            className="object-contain rounded-2xl max-h-full"
            style={{ maxHeight: isScroll ? "60px" : "80px" }}
          />
        </motion.div>
      </Link>

      {/* Navigation Menu */}
      <nav className="flex-1 max-w-3xl mx-10">
        <ul
          className={`flex items-center justify-center gap-8 font-medium text-gray-800 ${
            isScroll ? "text-sm" : "text-base"
          } transition-all duration-300`}
        >
          {["Trang Chủ", "Menu", "Giới Thiệu", "Liên Hệ"].map((item, index) => (
            <li key={index}>
              <Link
                href={
                  item === "Trang Chủ"
                    ? "/"
                    : `/${item.toLowerCase().replace(" ", "-")}`
                }
                className="relative px-2 py-1 text-gray-700 hover:text-orange-600 transition-colors duration-300 group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Section */}
      <div className="flex items-center gap-4">
        {status === "loading" ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ) : session ? (
          <div className="flex items-center gap-4">
            {/* Cart Icon */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="relative p-1 text-gray-600 hover:text-orange-600"
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                0
              </span>
            </motion.button>

            {/* User Avatar & Dropdown */}
            <div className="relative group">
              <div className="flex items-center gap-2 cursor-pointer">
                <motion.div
                  animate={{
                    scale: isScroll ? 0.9 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={session.user?.image || "/default-image.jpg"}
                    alt="User avatar"
                    width={36}
                    height={36}
                    className="rounded-full border-2 border-gray-200 group-hover:border-orange-600 transition-all duration-300"
                  />
                </motion.div>
                <span className="text-gray-800 font-medium max-w-32 truncate group-hover:text-orange-600 transition-colors duration-300 text-sm">
                  {session.user?.name}
                </span>
                <svg
                  className="w-4 h-4 text-gray-500 group-hover:text-orange-600 transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {/* Dropdown Menu */}
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-1">
                  {[
                    {
                      href: "/user/profile",
                      text: "Tài khoản",
                      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
                    },
                    {
                      href: "/orders",
                      text: "Đơn hàng",
                      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
                    },
                  ].map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-all duration-200 rounded-md mx-1 text-sm"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={item.icon}
                        />
                      </svg>
                      {item.text}
                    </Link>
                  ))}
                  <hr className="my-1 border-gray-100" />
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-300 rounded-md text-sm text-left cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Đăng xuất
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-1.5 rounded-full font-medium transition-all duration-300 shadow-sm hover:shadow-md text-sm"
            >
              Đăng nhập
            </motion.button>
          </Link>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
