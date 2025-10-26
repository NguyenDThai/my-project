import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full md:mt-[80px] text-white overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/banner-food.jpg"
        >
          <source src="/videobanner.mp4" type="video/mp4" />

          <Image
            src="/banner-food.jpg"
            alt="Delicious Food"
            width={100}
            height={100}
          />
        </video>
        {/* Overlay để text dễ đọc hơn */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
        <div className="max-w-4xl animate-fade-in">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-lg">
            Thưởng Thức Hương Vị Đỉnh Cao
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 opacity-90 leading-relaxed drop-shadow-md">
            Giao hàng siêu tốc trong 30 phút - Món ngon tươi mới mỗi ngày
          </p>
          <Link href="/menu">
            <button className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-100 hover:text-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 mx-auto">
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
      </div>

      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-400/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;
