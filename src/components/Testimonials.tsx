/* eslint-disable react/no-unescaped-entities */
"use client";

import StarRating from "@/components/StarRating";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Chị Lan Anh",
      role: "Khách hàng thân thiết",
      comment:
        "Gà rán ở đây giòn tan, thơm ngon khó cưỡng. Giao hàng nhanh, nhân viên thân thiện. Tôi sẽ ủng hộ dài lâu!",
      rating: 5,
      avatar: "👩‍💼",
    },
    {
      id: 2,
      name: "Anh Minh Quân",
      role: "Food Blogger",
      comment:
        "Pizza đúng chuẩn Ý, phô mai kéo sợi cực đã. Combo giá hợp lý, chất lượng xứng đáng 5 sao!",
      rating: 5,
      avatar: "👨‍🍳",
    },
    {
      id: 3,
      name: "Bé Nhím",
      role: "Khách hàng nhí",
      comment:
        "Con thích hamburger ở đây lắm! Bánh mềm, nhân nhiều, mỗi tuần con đều đòi mẹ mua cho ăn.",
      rating: 5,
      avatar: "👧",
    },
    {
      id: 4,
      name: "Chị Hương Giang",
      role: "Văn phòng",
      comment:
        "Đồ uống ở đây pha chế rất ngon, đặc biệt là trà sữa. Ship tận nơi cho dân văn phòng rất tiện!",
      rating: 4,
      avatar: "👩‍💻",
    },
    {
      id: 5,
      name: "Anh Tuấn Nguyễn",
      role: "Gia đình",
      comment:
        "Combo gia đình rất tiết kiệm, đủ cho 4 người ăn. Món ăn đa dạng, con cái đều thích.",
      rating: 5,
      avatar: "👨‍👩‍👧‍👦",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Khách Hàng Nói Gì Về Chúng Tôi?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hàng ngàn khách hàng đã tin tưởng và hài lòng với dịch vụ của chúng
            tôi
          </p>
        </motion.div>

        {/* Testimonial Slider */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8 mx-auto max-w-2xl"
            >
              {/* Rating */}
              <StarRating rating={testimonials[currentSlide].rating} />

              {/* Comment */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-700 text-lg text-center mb-6 leading-relaxed italic"
              >
                "{testimonials[currentSlide].comment}"
              </motion.p>

              {/* Customer Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center gap-4"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xl">
                  {testimonials[currentSlide].avatar}
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900">
                    {testimonials[currentSlide].name}
                  </h4>
                  <p className="text-gray-500 text-sm">
                    {testimonials[currentSlide].role}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-orange-500 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() =>
              setCurrentSlide(
                (prev) => (prev - 1 + testimonials.length) % testimonials.length
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() =>
              setCurrentSlide((prev) => (prev + 1) % testimonials.length)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Additional Static Testimonials Grid (for larger screens) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden lg:grid grid-cols-3 gap-6 mt-12"
        >
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <StarRating rating={testimonial.rating} />
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                "{testimonial.comment}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
                  {testimonial.avatar}
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 text-sm">
                    {testimonial.name}
                  </h5>
                  <p className="text-gray-500 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
