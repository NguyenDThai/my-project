/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const Categories = () => {
  const [categories, setCategories] = useState<any[]>([]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();

      if (res.ok) {
        // Trích xuất loại sản phẩm không trùng
        const uniqueCategories = Array.from(
          new Set(data.products.map((p: any) => p.category))
        ).map((cat: any) => {
          // Đếm số món
          const count = data.products.filter(
            (p: any) => p.category === cat
          ).length;

          // Map tên tiếng Việt + icon
          const categoryMap: Record<string, { vi: string; icon: string }> = {
            pizza: { vi: "Pizza", icon: "🍕" },
            burger: { vi: "Burger", icon: "🍔" },
            chickenfried: { vi: "Gà Rán", icon: "🍗" },
            dessert: { vi: "Tráng Miệng", icon: "🍰" },
            drink: { vi: "Đồ Uống", icon: "🥤" },
            combo: { vi: "Combo", icon: "🎁" },
          };

          const { vi, icon } = categoryMap[cat] || {
            vi: cat,
            icon: "🍽️",
          };

          return { name: cat, displayName: vi, icon, count };
        });

        setCategories(uniqueCategories);
      }
    } catch (error: any) {
      console.error("Lỗi khi lấy danh mục:", error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Danh Mục Món Ăn
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link key={index} href="/menu">
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition duration-300 cursor-pointer border border-gray-100"
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  {category.displayName}
                </h3>
                <p className="text-sm text-gray-500">{category.count} món</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
