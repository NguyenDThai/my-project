/* eslint-disable react/no-unescaped-entities */
"use client";

import StarRating from "@/components/StarRating";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IReview {
  _id: string;
  name: string;
  review: {
    rating: number;
    comment: string;
    created: string;
  };
  items?: { name?: string }[];
}

const Testimonials = () => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await fetch("/api/review");
        const data = await res.json();
        if (res.ok) {
          setReviews(data.reviews);
        }
      } catch (error) {
        console.error("Lỗi khi tải review:", error);
      }
    };

    fetchReview();
  }, []);

  // Auto slide
  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [reviews]);

  if (reviews.length === 0) {
    return (
      <section className="py-16 text-center text-gray-500">
        <p>Chưa có đánh giá nào</p>
      </section>
    );
  }

  const current = reviews[currentSlide];

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-6xl mx-auto px-4">
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

        {/* Slider */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current._id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8 mx-auto max-w-2xl"
            >
              <StarRating rating={current.review.rating} />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-700 text-lg text-center mb-6 leading-relaxed italic"
              >
                "{current.review.comment}"
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center gap-4"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xl">
                  {current.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900">
                    {current.name}
                  </h4>
                  <p className="text-gray-500 text-sm">
                    {current.items?.[0]?.name
                      ? `Đánh giá món: ${current.items[0].name}`
                      : "Khách hàng"}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
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
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
