/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Products } from "@/app/admin/product/page";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import ShoppingButton from "@/components/ShoppingButton";
import { useCart } from "@/context/CartItem";

// Animation variants
const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: any = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const categoryButtonVariants: any = {
  inactive: {
    scale: 1,
    backgroundColor: "#f3f4f6",
    color: "#374151",
  },
  active: {
    scale: 1.05,
    backgroundColor: "#f97316",
    color: "#ffffff",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  hover: {
    scale: 1.02,
    backgroundColor: "#e5e7eb",
    transition: {
      duration: 0.2,
    },
  },
};

const imageHoverVariants: any = {
  rest: {
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

const buttonHoverVariants: any = {
  rest: {
    scale: 1,
    backgroundColor: "#f97316",
  },
  hover: {
    scale: 1.05,
    backgroundColor: "#ea580c",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  tap: {
    scale: 0.95,
  },
};

const loadingVariants: any = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

const MenuPage = () => {
  const [products, setProducts] = useState<Products | []>([]);
  const [filtersProducts, setFilterProducts] = useState<Products | []>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();

  //   Danh sach cac laoi san pham

  const categories = [
    { id: "all", name: "Tất cả" },
    { id: "combo", name: "Combo" },
    { id: "chickenfried", name: "Gà Rán" },
    { id: "hamburger", name: "Hamburger" },
    { id: "pizza", name: "Pizza" },
    { id: "drink", name: "Đồ Uống" },
    { id: "dessert", name: "Tráng Miệng" },
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/products");

        const data = await res.json();
        setProducts(data.products || []);
        setFilterProducts(data.products || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilterProducts(products);
    } else {
      const filterd = products.filter(
        (product) => product.category === selectedCategory
      );
      setFilterProducts(filterd);
    }
  }, [selectedCategory, products]);

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Get category name
  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          variants={loadingVariants}
          animate="animate"
          className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-gray-600 ml-4"
        >
          Đang tải sản phẩm...
        </motion.p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 menu-page-background mt-[70px]"
    >
      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white shadow-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <motion.h1
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-4xl font-bold text-gray-900 mb-4"
              >
                Thực Đơn
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-lg text-gray-600 max-w-2xl mx-auto"
              >
                Khám phá những món ăn ngon và đa dạng từ thực đơn của chúng tôi
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto py-4 gap-2 hide-scrollbar justify-center">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  variants={categoryButtonVariants}
                  initial="inactive"
                  animate={
                    selectedCategory === category.id ? "active" : "inactive"
                  }
                  whileHover="hover"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex-shrink-0 px-6 py-3 rounded-full font-medium"
                >
                  {category.name}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >
            <p className="text-gray-600">
              Hiển thị{" "}
              <span className="font-semibold">{filtersProducts.length}</span>{" "}
              sản phẩm
              {selectedCategory !== "all" && (
                <span>
                  {" "}
                  trong danh mục{" "}
                  <span className="font-semibold">
                    {getCategoryName(selectedCategory)}
                  </span>
                </span>
              )}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {filtersProducts.length === 0 ? (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="text-center py-12"
              >
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
                  <motion.svg
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 text-gray-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </motion.svg>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Không tìm thấy sản phẩm
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {selectedCategory !== "all"
                      ? `Không có sản phẩm nào trong danh mục ${getCategoryName(
                          selectedCategory
                        )}`
                      : "Hiện chưa có sản phẩm nào trong menu"}
                  </p>
                  {selectedCategory !== "all" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory("all")}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                    >
                      Xem tất cả sản phẩm
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="products-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                <AnimatePresence>
                  {filtersProducts.map((product, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      layout
                      initial="hidden"
                      animate="visible"
                      exit={{
                        opacity: 0,
                        scale: 0.8,
                        transition: { duration: 0.2 },
                      }}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden group"
                    >
                      {/* Product Image */}
                      <div className="relative h-48 bg-gray-100 overflow-hidden">
                        <motion.div
                          variants={imageHoverVariants}
                          initial="rest"
                          whileHover="hover"
                          className="w-full h-full"
                        >
                          <Image
                            src={product.image || "/default-food.jpg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </motion.div>
                        {/* Category Badge */}
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.5 }}
                          className="absolute top-3 right-3"
                        >
                          <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                            {getCategoryName(product.category)}
                          </span>
                        </motion.div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <motion.h3
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.6 }}
                          className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1"
                        >
                          {product.name}
                        </motion.h3>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.7 }}
                          className="text-gray-600 text-sm mb-3 line-clamp-2"
                        >
                          {product.description}
                        </motion.p>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + 0.8 }}
                          className="flex items-center justify-between"
                        >
                          <span className="text-2xl font-bold text-orange-600">
                            {formatPrice(product.price)}
                          </span>
                          <motion.button
                            variants={buttonHoverVariants}
                            initial="rest"
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => addToCart(product)}
                            className="bg-orange-500 text-white py-2 px-4 rounded-lg font-medium text-sm flex items-center gap-1"
                          >
                            <motion.svg
                              whileHover={{ rotate: 90 }}
                              transition={{ duration: 0.2 }}
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </motion.svg>
                            Thêm
                          </motion.button>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <style jsx>{`
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>

      {/* Cart shopping */}
      <ShoppingButton />
    </motion.div>
  );
};

export default MenuPage;
