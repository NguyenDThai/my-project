"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import BtnSignOut from "./BtnSignOut";

const Header = () => {
  const { data: session, status } = useSession();
  const [isScroll, setIsScroll] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Trang Chủ", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Giới Thiệu", href: "/about" },
    { name: "Tin Tức", href: "/news" },
    { name: "Liên Hệ", href: "/contact" },
  ];

  const userMenuItems = [
    {
      href: "/user/profile",
      text: "Tài khoản",
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    },
    {
      href: "/user/order",
      text: "Đơn hàng",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    },
  ];

  return (
    <>
      {/* Desktop Header */}
      <motion.header
        initial={false}
        animate={{
          height: isScroll ? "60px" : "80px",
          backgroundColor: isScroll ? "rgba(255,255,255,0.98)" : "#ffffff",
          boxShadow: isScroll
            ? "0 4px 20px rgba(0,0,0,0.08)"
            : "0 1px 4px rgba(0,0,0,0.05)",
        }}
        style={{ display: isMobileMenuOpen ? "none " : "flex" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed w-full items-center justify-between px-4 sm:px-6 lg:px-8 top-0 z-50 border-b border-gray-100 backdrop-blur-md"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center z-50">
          <motion.div
            animate={{ scale: isScroll ? 0.9 : 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Image
              src="/header-logo.png"
              alt="FoodExpress"
              width={isScroll ? 60 : 80}
              height={isScroll ? 40 : 50}
              className="object-contain transition-all duration-300 h-full"
              priority
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation Menu */}
        <nav className="hidden lg:flex flex-1 max-w-2xl mx-8">
          <ul
            className={`flex items-center justify-center gap-6 font-medium ${
              isScroll ? "text-sm" : "text-base"
            } transition-all duration-300`}
          >
            {navItems.map((item, index) => (
              <motion.li key={index} whileHover={{ y: -2 }}>
                <Link
                  href={item.href}
                  className="relative px-3 py-2 text-gray-700 hover:text-orange-600 transition-colors duration-300 group font-semibold"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* User Section */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Cart Icon - Always Visible */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 text-gray-600 hover:text-orange-600 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
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
            <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
              0
            </span>
          </motion.button>

          {status === "loading" ? (
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ) : session ? (
            /* Desktop User Menu */
            <div className="hidden lg:flex relative group">
              <div className="flex items-center gap-2 cursor-pointer">
                <motion.div
                  animate={{ scale: isScroll ? 0.9 : 1 }}
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
                <span className="text-gray-800 font-medium max-w-32 truncate group-hover:text-orange-600 transition-colors duration-300 text-sm hidden lg:block">
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
              <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 backdrop-blur-md">
                <div className="p-2">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="font-semibold text-gray-900 text-sm">
                      {session.user?.name}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {session.user?.email}
                    </p>
                  </div>

                  {userMenuItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 rounded-lg text-sm font-medium"
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

                  <hr className="my-2 border-gray-100" />
                  <BtnSignOut className="w-full justify-start px-3 py-2.5 text-sm font-medium" />
                </div>
              </div>
            </div>
          ) : (
            /* Login Button */
            <Link href="/login" className="hidden sm:block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
              >
                Đăng nhập
              </motion.button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="lg:hidden p-2 text-gray-600 hover:text-orange-600 transition-colors duration-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 w-80 h-full bg-white shadow-2xl z-60 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                    <Image
                      src="/header-logo.png"
                      alt="FoodExpress"
                      width={120}
                      height={40}
                      className="object-contain"
                    />
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-gray-500 hover:text-orange-600 transition-colors"
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

                {/* User Info */}
                {session && (
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl mb-6">
                    <Image
                      src={session.user?.image || "/default-image.jpg"}
                      alt="User avatar"
                      width={48}
                      height={48}
                      className="rounded-full border-2 border-orange-200"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">
                        {session.user?.name}
                      </p>
                      <p className="text-gray-500 text-xs truncate">
                        {session.user?.email}
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation Links */}
                <nav className="mb-8">
                  <ul className="space-y-2">
                    {navItems.map((item, index) => (
                      <li key={index}>
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all duration-200 font-medium"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* User Menu Items */}
                {session ? (
                  <div className="space-y-2 mb-6">
                    {userMenuItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all duration-200 text-sm font-medium"
                      >
                        <svg
                          className="w-5 h-5"
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
                  </div>
                ) : (
                  <div className="mb-6">
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg">
                        Đăng nhập
                      </button>
                    </Link>
                  </div>
                )}

                {/* Additional Mobile Actions */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 py-2 bg-gray-50 hover:bg-orange-50 text-gray-700 rounded-lg transition-colors text-sm font-medium">
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
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      Liên hệ
                    </button>
                    <button className="flex items-center justify-center gap-2 py-2 bg-gray-50 hover:bg-orange-50 text-gray-700 rounded-lg transition-colors text-sm font-medium">
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
                          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Trợ giúp
                    </button>
                  </div>
                </div>

                {/* Sign Out for Mobile */}
                {session && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <BtnSignOut className="w-full justify-center py-3 text-sm font-medium" />
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
