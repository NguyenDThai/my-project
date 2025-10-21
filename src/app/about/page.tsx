"use client";

import { motion } from "framer-motion";

const AboutPage = () => {
  const virtualStats = [
    { number: "10,000+", label: "Đơn hàng online" },
    { number: "99%", label: "Tỷ lệ hài lòng" },
    { number: "30min", label: "Giao hàng trung bình" },
    { number: "24/7", label: "Hỗ trợ khách hàng" },
  ];

  const digitalValues = [
    {
      icon: "📱",
      title: "Đặt Hàng Dễ Dàng",
      description:
        "Ứng dụng đơn giản, đặt hàng chỉ với vài cú chạm, thanh toán linh hoạt",
    },
    {
      icon: "🚀",
      title: "Giao Hàng Siêu Tốc",
      description:
        "Mạng lưới shipper rộng khắp, cam kết giao hàng trong 30-45 phút",
    },
    {
      icon: "🍳",
      title: "Bếp Cloud Chuyên Nghiệp",
      description:
        "Hệ thống bếp hiện đại, chuyên biệt cho đặt hàng online, đảm bảo chất lượng",
    },
    {
      icon: "📞",
      title: "Hỗ Trợ Tức Thì",
      description:
        "Đội ngũ CSKH 24/7, giải đáp mọi thắc mắc và xử lý đơn hàng nhanh chóng",
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Đặt Hàng Online",
      description: "Chọn món yêu thích trên website/app, thanh toán đơn giản",
    },
    {
      step: "02",
      title: "Chế Biến Tức Thì",
      description:
        "Đầu bếp bắt đầu chế biến ngay khi nhận đơn, đảm bảo đồ ăn tươi ngon",
    },
    {
      step: "03",
      title: "Giao Hàng Nhanh",
      description: "Đối tác giao hàng nhận món và vận chuyển đến tận tay khách",
    },
    {
      step: "04",
      title: "Thưởng Thức",
      description: "Nhận món còn nóng hổi và thưởng thức ngay tại nhà",
    },
  ];

  return (
    <div className="min-h-screen bg-white mt-[80px]">
      {/* Hero Section - Digital Focus */}
      <section className="relative py-20 bg-gradient-to-br from-orange-500 to-amber-500 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold mb-6"
          >
            Nhà Hàng Online Của Bạn
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto"
          >
            Trải nghiệm ẩm thực chất lượng ngay tại nhà - Không cần đặt chân đến
            cửa hàng
          </motion.p>
        </div>
      </section>

      {/* Digital Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Ẩm Thực Trong Tầm Tay
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <strong>FoodExpress</strong> ra đời với sứ mệnh mang những món
                  ăn ngon nhất đến trực tiếp căn bếp của bạn. Chúng tôi tin rằng
                  trải nghiệm ẩm thực chất lượng không cần phải đến nhà hàng.
                </p>
                <p>
                  Với mô hình <strong>Cloud Kitchen</strong> chuyên biệt, chúng
                  tôi tập trung 100% vào chất lượng món ăn và dịch vụ giao hàng,
                  loại bỏ mọi chi phí không cần thiết để mang đến giá trị tốt
                  nhất cho khách hàng.
                </p>
                <p>
                  Mọi đơn hàng đều được chế biến tươi ngon, đóng gói cẩn thận và
                  giao đến bạn trong thời gian ngắn nhất.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-orange-400 to-amber-400 rounded-2xl p-1">
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-col">
                    <div className="text-6xl mb-4">📱</div>
                    <p className="text-gray-600 font-semibold">
                      Trải Nghiệm Đặt Hàng Online
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Digital Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {virtualStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-orange-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Quy Trình Đơn Giản
            </h2>
            <p className="text-xl text-gray-600">
              Chỉ 4 bước để thưởng thức món ngon tại nhà
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center relative"
              >
                <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 mx-auto">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-1/2 w-full h-0.5 bg-gray-200 -z-10"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Lợi Ích Digital
            </h2>
            <p className="text-xl text-gray-600">
              Tại sao chọn mô hình online-only?
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {digitalValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">{value.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Sẵn Sàng Thưởng Thức?</h2>
            <p className="text-xl mb-8 opacity-90">
              Đặt món ngay và trải nghiệm sự tiện lợi của ẩm thực online
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-500 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                🍕 Đặt Hàng Ngay
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-orange-500 transition-colors">
                📱 Tải App
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
