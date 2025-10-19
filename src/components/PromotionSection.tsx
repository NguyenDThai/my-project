import React from "react";

const PromotionSection = () => {
  return (
    <section className="py-16 bg-orange-500 text-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ưu Đãi Đặc Biệt</h2>
        <p className="text-xl mb-8">Giảm 30% cho đơn hàng đầu tiên</p>
        <button className="bg-white text-orange-500 px-8 py-3 rounded-full font-bold">
          Đặt Ngay
        </button>
      </div>
    </section>
  );
};

export default PromotionSection;
