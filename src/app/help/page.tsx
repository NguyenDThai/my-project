"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const HelpPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const orderingSteps = [
    {
      step: 1,
      title: "Truy cập FoodDev",
      description:
        "Truy cập website FoodDev.com hoặc tải ứng dụng trên App Store/Google Play",
      icon: "🌐",
      details: [
        "Website: http://localhost:3000",
        'App Store: Tìm "FoodDev"',
        'Google Play: Tìm "FoodDev"',
        "Hoặc gọi hotline: 0869240149",
      ],
      image: "/help/step1.jpg",
    },
    {
      step: 2,
      title: "Chọn món yêu thích",
      description: "Duyệt qua thực đơn và thêm món ăn vào giỏ hàng",
      icon: "🍔",
      details: [
        "Xem theo danh mục: Combo, Gà rán, Burger, Pizza...",
        "Đọc mô tả và thành phần chi tiết",
        "Xem hình ảnh thực tế món ăn",
        "Kiểm tra giá và khẩu phần",
      ],
      image: "/help/step2.jpg",
    },
    {
      step: 3,
      title: "Tùy chỉnh đơn hàng",
      description: "Thêm ghi chú và tùy chỉnh món ăn theo sở thích",
      icon: "✏️",
      details: [
        'Ghi chú: "Ít cay", "Không hành", "Thêm sốt"...',
        "Chọn mức độ gia vị",
        "Yêu cầu đặc biệt về dị ứng",
        "Chọn hình thức đóng gói",
      ],
      image: "/help/step3.jpg",
    },
    {
      step: 4,
      title: "Kiểm tra giỏ hàng",
      description: "Xem lại đơn hàng và áp dụng mã giảm giá",
      icon: "🛒",
      details: [
        "Kiểm tra số lượng và tổng tiền",
        "Áp dụng mã giảm giá nếu có",
        "Chọn hình thức nhận hàng",
        "Xem thời gian giao hàng dự kiến",
      ],
      image: "/help/step4.jpg",
    },
    {
      step: 5,
      title: "Nhập thông tin giao hàng",
      description: "Điền địa chỉ và thông tin liên hệ",
      icon: "🏠",
      details: [
        "Nhập chính xác địa chỉ giao hàng",
        "Thêm hướng dẫn địa chỉ chi tiết",
        "Để số điện thoại liên hệ",
        "Chọn thời gian nhận hàng mong muốn",
      ],
      image: "/help/step5.jpg",
    },
    {
      step: 6,
      title: "Chọn phương thức thanh toán",
      description: "Lựa chọn hình thức thanh toán phù hợp",
      icon: "💳",
      details: [
        "Tiền mặt (COD)",
        "Chuyển khoản ngân hàng",
        "Ví điện tử (Momo, ZaloPay)",
        "Thẻ quốc tế (Visa, Mastercard)",
      ],
      image: "/help/step6.jpg",
    },
    {
      step: 7,
      title: "Xác nhận đơn hàng",
      description: "Kiểm tra lần cuối và xác nhận đặt hàng",
      icon: "✅",
      details: [
        "Xem lại toàn bộ thông tin đơn hàng",
        "Kiểm tra tổng thanh toán",
        'Nhấn "Đặt hàng" để hoàn tất',
        "Lưu mã đơn hàng để theo dõi",
      ],
      image: "/help/step7.jpg",
    },
    {
      step: 8,
      title: "Theo dõi đơn hàng",
      description: "Theo dõi trạng thái đơn hàng trong thời gian thực",
      icon: "📱",
      details: [
        "Nhận thông báo qua SMS/Email",
        "Theo dõi trên website/app",
        "Xem vị trí tài xế trên bản đồ",
        "Liên hệ hỗ trợ nếu cần",
      ],
      image: "/help/step8.jpg",
    },
  ];

  const quickTips = [
    {
      icon: "⏰",
      title: "Đặt hàng trước",
      description: "Đặt trước 2-3 giờ để tránh giờ cao điểm",
    },
    {
      icon: "📍",
      title: "Địa chỉ chi tiết",
      description: "Cung cấp hướng dẫn địa chỉ rõ ràng",
    },
    {
      icon: "📞",
      title: "Giữ liên lạc",
      description: "Luôn bật điện thoại để tài xế liên hệ",
    },
    {
      icon: "💰",
      title: "Tiền lẻ",
      description: "Chuẩn bị tiền lẻ nếu thanh toán COD",
    },
  ];

  const commonIssues = [
    {
      problem: "Không tìm thấy món ăn yêu thích",
      solution:
        'Vui lòng kiểm tra mục "Món đặc biệt" hoặc liên hệ hotline để đặt món không có trong menu',
    },
    {
      problem: "Quên mã giảm giá",
      solution:
        "Mã giảm giá có thể áp dụng tại bước thanh toán. Theo dõi fanpage để cập nhật mã mới nhất",
    },
    {
      problem: "Thay đổi địa chỉ giao hàng",
      solution:
        "Liên hệ ngay hotline 0869240149 trong vòng 5 phút sau khi đặt hàng để thay đổi địa chỉ",
    },
    {
      problem: "Hủy đơn hàng",
      solution:
        "Đơn hàng có thể hủy trong vòng 5 phút sau khi đặt. Sau thời gian này vui lòng liên hệ hỗ trợ",
    },
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
            Hướng Dẫn Đặt Hàng
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto mb-8"
          >
            Đặt hàng dễ dàng chỉ với 8 bước đơn giản - Thưởng thức món ngon ngay
            tại nhà!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <button className="bg-white text-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              🍕 Đặt hàng ngay
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-orange-500 transition-colors">
              📱 Tải ứng dụng
            </button>
          </motion.div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Mẹo Đặt Hàng Thông Minh
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickTips.map((tip, index) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-4">{tip.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-gray-600 text-sm">{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-Step Guide */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center text-gray-900 mb-4"
          >
            Hướng Dẫn Chi Tiết 8 Bước
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 text-center mb-12"
          >
            Làm theo hướng dẫn từng bước để có trải nghiệm đặt hàng tốt nhất
          </motion.p>

          {/* Step Navigation */}
          <div className="flex overflow-x-auto pb-4 mb-8 gap-2 hide-scrollbar">
            {orderingSteps.map((step, index) => (
              <button
                key={step.step}
                onClick={() => setActiveStep(index)}
                className={`flex items-center gap-3 px-6 py-3 rounded-full whitespace-nowrap transition-all duration-200 ${
                  activeStep === index
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                }`}
              >
                <span className="text-lg">{step.icon}</span>
                <span className="font-medium">Bước {step.step}</span>
              </button>
            ))}
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Step Details */}
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {orderingSteps[activeStep].step}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {orderingSteps[activeStep].title}
                    </h3>
                    <p className="text-orange-500 font-semibold">
                      {orderingSteps[activeStep].description}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-gray-900 text-lg">
                    Chi tiết:
                  </h4>
                  <ul className="space-y-3">
                    {orderingSteps[activeStep].details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={() =>
                      setActiveStep((prev) => Math.max(0, prev - 1))
                    }
                    disabled={activeStep === 0}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                  >
                    ← Bước trước
                  </button>
                  <button
                    onClick={() =>
                      setActiveStep((prev) =>
                        Math.min(orderingSteps.length - 1, prev + 1)
                      )
                    }
                    disabled={activeStep === orderingSteps.length - 1}
                    className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600 transition-colors"
                  >
                    Bước tiếp theo →
                  </button>
                </div>
              </motion.div>

              {/* Step Visual */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center p-8"
              >
                <div className="text-center">
                  <div className="text-8xl mb-4">
                    {orderingSteps[activeStep].icon}
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg max-w-xs mx-auto">
                    <div className="text-sm text-gray-600 mb-2">
                      Minh họa bước {orderingSteps[activeStep].step}
                    </div>
                    <div className="w-full h-32 bg-gradient-to-r from-orange-400 to-amber-400 rounded-lg flex items-center justify-center text-white font-bold">
                      {orderingSteps[activeStep].title}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>
                Tiến trình: {activeStep + 1}/{orderingSteps.length}
              </span>
              <span>
                {Math.round(((activeStep + 1) / orderingSteps.length) * 100)}%
                hoàn thành
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${((activeStep + 1) / orderingSteps.length) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
                className="bg-orange-500 h-2 rounded-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Common Issues & Solutions */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Vấn Đề Thường Gặp & Giải Pháp
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {commonIssues.map((issue, index) => (
              <motion.div
                key={issue.problem}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-red-500">⚠️</span>
                  {issue.problem}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {issue.solution}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Sẵn Sàng Đặt Hàng?</h2>
            <p className="text-xl mb-8 opacity-90">
              Áp dụng ngay những gì bạn đã học để thưởng thức bữa ăn ngon!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-500 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors text-lg">
                🍔 Đặt hàng ngay
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-orange-500 transition-colors text-lg">
                📞 Cần hỗ trợ? Gọi 0869240149
              </button>
            </div>
          </motion.div>
        </div>
      </section>

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
  );
};

export default HelpPage;
