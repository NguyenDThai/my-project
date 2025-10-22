"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SiZalo } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Về FoodDev",
      links: [
        { name: "Giới thiệu", href: "/about" },
        { name: "Tin tức", href: "/news" },
        { name: "Tuyển dụng", href: "/careers" },
        { name: "Liên hệ", href: "/contact" },
      ],
    },
    {
      title: "Dịch vụ",
      links: [
        { name: "Đặt hàng online", href: "/menu" },
        { name: "Giao hàng", href: "/delivery" },
        { name: "Catering", href: "/catering" },
        { name: "Ưu đãi", href: "/promotions" },
      ],
    },
    {
      title: "Hỗ trợ",
      links: [
        { name: "Câu hỏi thường gặp", href: "/faq" },
        { name: "Hướng dẫn đặt hàng", href: "/help" },
        { name: "Chính sách bảo mật", href: "/privacy" },
        { name: "Điều khoản sử dụng", href: "/terms" },
      ],
    },
    {
      title: "Liên hệ",
      links: [
        { name: "📞 0869240149", href: "tel:0869240149" },
        {
          name: "📧 thainguyen4646@gmail.com",
          href: "mailto:thainguyen4646@gmail.com",
        },
        { name: "📍 Toàn TP.HCM", href: null },
        { name: "🕒 6:00 - 23:00", href: null },
      ],
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      href: "https://www.facebook.com/nguyen.uc.thai.201420",
      color: "hover:bg-blue-500",
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      href: "https://www.instagram.com/ducthai4646/",
      color: "hover:bg-pink-500",
    },
    {
      name: "Zalo",
      icon: <SiZalo />,
      href: "https://zalo.me/",
      color: "hover:bg-blue-400",
    },
    {
      name: "TikTok",
      icon: <FaTiktok />,
      href: "https://www.tiktok.com/@nguyendthai18",
      color: "hover:bg-black",
    },
  ];

  const paymentMethods = [
    { name: "COD", icon: "💰" },
    { name: "Momo", icon: "📱" },
    { name: "ZaloPay", icon: "💙" },
    { name: "Banking", icon: "🏦" },
    { name: "Visa", icon: "💳" },
  ];

  const appStores = [
    {
      name: "App Store",
      icon: "📱",
      href: "#",
      description: "Tải trên iOS",
    },
    {
      name: "Google Play",
      icon: "🤖",
      href: "#",
      description: "Tải trên Android",
    },
  ];

  return (
    <footer className="bg-gray-900 text-white  ">
      {/* Main Footer */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <Link href="/" className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  <Image
                    src="/header-logo.png"
                    alt="logo-header"
                    width={500}
                    height={500}
                    className="rounded-full"
                  />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                  FoodDev
                </span>
              </Link>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Mang đến những bữa ăn ngon nhất, giao tận nhà nhanh chóng. Trải
                nghiệm ẩm thực chất lượng ngay tại không gian của bạn.
              </p>

              {/* Social Links */}
              <div className="flex gap-3 mb-6">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-lg transition-all duration-300 ${social.color} hover:text-white`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>

              {/* App Download */}
              <div className="space-y-3">
                <p className="text-gray-300 text-sm font-semibold">
                  Tải ứng dụng
                </p>
                <div className="flex gap-3">
                  {appStores.map((store, index) => (
                    <motion.a
                      key={store.name}
                      href={store.href}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      <span className="text-lg">{store.icon}</span>
                      <div className="text-left">
                        <div className="text-xs text-gray-400">
                          {store.description}
                        </div>
                        <div className="text-sm font-semibold">
                          {store.name}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Links Sections */}
            {footerSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
              >
                <h3 className="text-lg font-semibold mb-4 text-orange-400">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: sectionIndex * 0.1 + linkIndex * 0.05,
                      }}
                    >
                      {link.href ? (
                        <Link
                          href={link.href}
                          className="text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center gap-2"
                        >
                          {link.name}
                        </Link>
                      ) : (
                        <span className="text-gray-400 flex items-center gap-2">
                          {link.name}
                        </span>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment & Trust Badges */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Payment Methods */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center flex-wrap gap-4"
            >
              <span className="text-gray-400 text-sm">
                Chấp nhận thanh toán:
              </span>
              <div className="flex gap-2 flex-wrap">
                {paymentMethods.map((method, index) => (
                  <motion.div
                    key={method.name}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-gray-800 px-3 py-1 rounded-lg text-sm flex items-center gap-1"
                  >
                    <span>{method.icon}</span>
                    <span>{method.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-6 text-sm text-gray-400"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Đảm bảo vệ sinh</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Giao hàng nhanh</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span>Hỗ trợ 24/7</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-400 text-sm text-center md:text-left"
          >
            © {currentYear} FoodDev. All rights reserved
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-6 text-sm text-gray-400"
          >
            <Link
              href="/privacy"
              className="hover:text-orange-400 transition-colors"
            >
              Chính sách bảo mật
            </Link>
            <Link
              href="/terms"
              className="hover:text-orange-400 transition-colors"
            >
              Điều khoản sử dụng
            </Link>
            <Link
              href="/sitemap"
              className="hover:text-orange-400 transition-colors"
            >
              Sitemap
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Floating Order Button (Mobile) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="fixed bottom-6 right-6 md:hidden"
      >
        <Link
          href="/menu"
          className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 font-semibold"
        >
          <span>🍔</span>
          Đặt hàng ngay
        </Link>
      </motion.div>
    </footer>
  );
};

export default Footer;
