import React from "react";

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Tại Sao Chọn Chúng Tôi?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              🚚
            </div>
            <h3 className="font-bold mb-2">Giao Hàng Nhanh</h3>
            <p className="text-gray-600">30-45 phút</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              🍔
            </div>
            <h3 className="font-bold mb-2">Chất Lượng</h3>
            <p className="text-gray-600">Nguyên liệu tươi ngon</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              💰
            </div>
            <h3 className="font-bold mb-2">Giá Tốt</h3>
            <p className="text-gray-600">Giá cả hợp lý</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              ⭐
            </div>
            <h3 className="font-bold mb-2">Đánh Giá Cao</h3>
            <p className="text-gray-600">4.9/5 từ khách hàng</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
