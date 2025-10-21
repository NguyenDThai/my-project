"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NewsPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "Tất cả" },
    { id: "promotion", name: "Khuyến mãi" },
    { id: "news", name: "Tin tức" },
    { id: "event", name: "Sự kiện" },
    { id: "recipe", name: "Công thức" },
    { id: "health", name: "Sức khỏe" },
  ];

  const newsArticles = [
    {
      id: 1,
      title: "FoodExpress Tri Ân Khách Hàng - Giảm 50% Cho Đơn Hàng Đầu Tiên",
      excerpt:
        "Cơ hội trải nghiệm dịch vụ với ưu đãi cực sốc dành cho tân khách hàng. Áp dụng từ nay đến hết tháng...",
      image: "/news/promotion-1.jpg",
      category: "promotion",
      date: "15/12/2024",
      readTime: "2 phút",
      featured: true,
    },
    {
      id: 2,
      title: "Top 5 Món Ăn Được Yêu Thích Nhất Tháng 12",
      excerpt:
        "Khám phá những món ăn đang làm mưa làm gió trên thực đơn FoodExpress trong tháng vừa qua...",
      image: "/news/top-foods.jpg",
      category: "news",
      date: "12/12/2024",
      readTime: "3 phút",
      featured: true,
    },
    {
      id: 3,
      title: "Cách Làm Burger Tại Nhà Siêu Ngon Chuẩn Nhà Hàng",
      excerpt:
        "Bật mí bí quyết làm burger thơm ngon, đậm vị ngay tại căn bếp của bạn với nguyên liệu dễ tìm...",
      image: "/news/recipe-burger.jpg",
      category: "recipe",
      date: "10/12/2024",
      readTime: "5 phút",
      featured: false,
    },
    {
      id: 4,
      title: "FoodExpress Chính Thức Có Mặt Trên Ứng dụng GrabFood",
      excerpt:
        "Giờ đây bạn có thể đặt món FoodExpress dễ dàng hơn thông qua ứng dụng GrabFood với nhiều ưu đãi hấp dẫn...",
      image: "/news/grabfood.jpg",
      category: "news",
      date: "08/12/2024",
      readTime: "2 phút",
      featured: false,
    },
    {
      id: 5,
      title: "Lợi Ích Sức Khỏe Từ Các Món Ăn Vặt Thông Minh",
      excerpt:
        "Không phải đồ ăn vặt nào cũng không tốt. Cùng khám phá những lựa chọn ăn vặt thông minh cho sức khỏe...",
      image: "/news/healthy-snack.jpg",
      category: "health",
      date: "05/12/2024",
      readTime: "4 phút",
      featured: false,
    },
    {
      id: 6,
      title: 'Sự Kiện "Đêm Gà Rán" - Mua 1 Tặng 1 Duy Nhất 24/12',
      excerpt:
        "Chào đón Giáng Sinh với sự kiện đặc biệt: Mua 1 tặng 1 tất cả các món gà rán trong đêm 24/12...",
      image: "/news/christmas-event.jpg",
      category: "event",
      date: "01/12/2024",
      readTime: "1 phút",
      featured: false,
    },
    {
      id: 7,
      title: "Combo Gia Đình Mới - Tiết Kiệm Đến 40%",
      excerpt:
        "Ra mắt combo gia đình 4 người với ưu đãi cực hấp dẫn. Hoàn hảo cho bữa tối cuối tuần...",
      image: "/news/family-combo.jpg",
      category: "promotion",
      date: "28/11/2024",
      readTime: "2 phút",
      featured: false,
    },
    {
      id: 8,
      title: "Xu Hướng Ẩm Thực 2024: Healthy Fast Food Lên Ngôi",
      excerpt:
        "Cùng FoodExpress khám phá xu hướng ẩm thực nổi bật trong năm 2024 và những món ăn healthy được yêu thích...",
      image: "/news/food-trend.jpg",
      category: "news",
      date: "25/11/2024",
      readTime: "4 phút",
      featured: false,
    },
  ];

  const featuredArticles = newsArticles.filter((article) => article.featured);
  const filteredArticles =
    activeCategory === "all"
      ? newsArticles
      : newsArticles.filter((article) => article.category === activeCategory);

  const popularTags = [
    "Khuyến mãi",
    "Combo",
    "Gà rán",
    "Healthy",
    "Recipe",
    "Burger",
    "Pizza",
    "Đồ uống",
    "Sự kiện",
    "Tin mới",
  ];

  return (
    <div className="min-h-screen bg-gray-50 mt-[80px]">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-orange-500 to-amber-500 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold mb-6"
          >
            Tin Tức & Khuyến Mãi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto"
          >
            Cập nhật những tin tức mới nhất, khuyến mãi hấp dẫn và bí quyết ẩm
            thực từ FoodDev
          </motion.p>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-gray-900 mb-8 text-center"
          >
            Bài Viết Nổi Bật
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {featuredArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
              >
                <Link href={`/news/${article.id}`}>
                  <div className="relative h-64 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                      <span className="text-4xl">📰</span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          article.category === "promotion"
                            ? "bg-green-500 text-white"
                            : article.category === "news"
                            ? "bg-blue-500 text-white"
                            : "bg-purple-500 text-white"
                        }`}
                      >
                        {
                          categories.find((cat) => cat.id === article.category)
                            ?.name
                        }
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{article.date}</span>
                      <span>{article.readTime} đọc</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid with Filter */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Category Filter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="flex flex-wrap gap-2 mb-8"
              >
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                      activeCategory === category.id
                        ? "bg-orange-500 text-white shadow-md"
                        : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </motion.div>

              {/* News Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredArticles.map((article, index) => (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
                  >
                    <Link href={`/news/${article.id}`}>
                      <div className="flex flex-col h-full">
                        <div className="relative h-48 overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <span className="text-3xl">📸</span>
                          </div>
                          <div className="absolute top-3 left-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                article.category === "promotion"
                                  ? "bg-green-500 text-white"
                                  : article.category === "news"
                                  ? "bg-blue-500 text-white"
                                  : "bg-purple-500 text-white"
                              }`}
                            >
                              {
                                categories.find(
                                  (cat) => cat.id === article.category
                                )?.name
                              }
                            </span>
                          </div>
                        </div>

                        <div className="p-4 flex-1">
                          <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                            <span>{article.date}</span>
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>

              {/* Load More Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mt-12"
              >
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl">
                  Xem Thêm Tin Tức
                </button>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Popular Tags */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h3 className="font-bold text-gray-900 mb-4">Tags Phổ Biến</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="px-3 py-1 bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-600 rounded-full text-sm cursor-pointer transition-colors"
                    >
                      #{tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Newsletter */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl p-6 text-white"
              >
                <h3 className="font-bold text-lg mb-3">Đăng Ký Nhận Tin</h3>
                <p className="text-orange-100 text-sm mb-4">
                  Nhận thông báo về khuyến mãi và tin tức mới nhất
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Email của bạn"
                    className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-orange-200 text-white border border-orange-300 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button className="w-full bg-white text-orange-500 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Đăng Ký Ngay
                  </button>
                </div>
              </motion.div>

              {/* Recent Posts */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h3 className="font-bold text-gray-900 mb-4">
                  Bài Viết Gần Đây
                </h3>
                <div className="space-y-4">
                  {newsArticles.slice(0, 3).map((article, index) => (
                    <Link
                      key={article.id}
                      href={`/news/${article.id}`}
                      className="flex gap-3 group"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">📰</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 group-hover:text-orange-500 transition-colors line-clamp-2 text-sm">
                          {article.title}
                        </h4>
                        <p className="text-gray-500 text-xs mt-1">
                          {article.date}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
