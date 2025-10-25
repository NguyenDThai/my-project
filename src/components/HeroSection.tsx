"use client";

import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 text-white py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12 mt-16 md:mt-0">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left z-10 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-lg">
            Thưởng Thức Hương Vị Đỉnh Cao
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed">
            Giao hàng siêu tốc trong 30 phút - Món ngon tươi mới mỗi ngày
          </p>
          <Link href="/menu">
            <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-orange-100 hover:text-orange-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center gap-2 mx-auto md:mx-0">
              <span>🍕 Khám Phá Menu</span>
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </Link>
        </div>

        {/* Image */}
        <div className="md:w-1/2 flex justify-center relative z-10">
          <div className="relative w-80 h-80 md:w-96 md:h-96 transform hover:scale-105 transition-transform duration-500">
            <Image
              src="/banner-food.jpg"
              alt="Delicious Food"
              fill
              className="object-cover rounded-2xl shadow-2xl"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>

        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-400/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
