"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactMethods = [
    {
      icon: "📞",
      title: "Hotline Đặt Hàng",
      info: "0869240149",
      description: "24/7 - Hỗ trợ đặt hàng và tư vấn",
      action: "tel:0869240149",
    },
    {
      icon: "💬",
      title: "Zalo Support",
      info: "0869240149",
      description: "Hỗ trợ nhanh qua Zalo",
      action: "https://chat.zalo.me/",
    },
    {
      icon: "📧",
      title: "Email",
      info: "thainguyen4646@gmail.com",
      description: "Phản hồi trong 2 giờ",
      action: "mailto:thainguyen46462gmail.com",
    },
    {
      icon: "📍",
      title: "Khu Vực Phục Vụ",
      info: "Toàn TP.HCM",
      description: "Giao hàng nhanh trong 30-45 phút",
      action: null,
    },
  ];

  const faqs = [
    {
      question: "Thời gian giao hàng trong bao lâu?",
      answer:
        "Chúng tôi cam kết giao hàng trong 30-45 phút tại TP.HCM. Ngoại thành từ 45-60 phút.",
    },
    {
      question: "Có phí giao hàng không?",
      answer:
        "Miễn phí giao hàng cho đơn từ 100.000đ. Dưới 100.000đ phí ship 15.000đ.",
    },
    {
      question: "Tôi có thể đặt hàng trước không?",
      answer:
        "Có, bạn có thể đặt hàng trước qua app/website. Chúng tôi sẽ chế biến và giao đúng giờ.",
    },
    {
      question: "Phương thức thanh toán nào được chấp nhận?",
      answer:
        "Chấp nhận COD, chuyển khoản, ví điện tử (Momo, ZaloPay) và thẻ quốc tế.",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Cảm ơn bạn! Chúng tôi sẽ liên hệ lại sớm nhất.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 2000);
  };

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
            Liên Hệ Với Chúng Tôi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto"
          >
            Chúng tôi luôn sẵn sàng hỗ trợ và lắng nghe ý kiến của bạn
          </motion.p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Cách Thức Liên Hệ
            </h2>
            <p className="text-xl text-gray-600">
              Nhiều cách để kết nối với FoodDev
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 ${
                  method.action ? "cursor-pointer hover:scale-105" : ""
                }`}
                onClick={() =>
                  method.action && window.open(method.action, "_blank")
                }
              >
                <div className="text-3xl mb-4">{method.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {method.title}
                </h3>
                <p className="text-orange-500 font-semibold text-lg mb-2">
                  {method.info}
                </p>
                <p className="text-gray-600 text-sm">{method.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Gửi Tin Nhắn Cho Chúng Tôi
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full outline-none px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full outline-none px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full outline-none px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    placeholder="Nhập email của bạn"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chủ đề *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full outline-none px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white"
                  >
                    <option value="">Chọn chủ đề</option>
                    <option value="order">Đặt hàng & Giao hàng</option>
                    <option value="quality">Chất lượng món ăn</option>
                    <option value="payment">Thanh toán</option>
                    <option value="feedback">Góp ý & Phản hồi</option>
                    <option value="other">Khác</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nội dung *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full outline-none px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 resize-none"
                    placeholder="Nhập nội dung tin nhắn..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Đang gửi...
                    </div>
                  ) : (
                    "Gửi Tin Nhắn"
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Câu Hỏi Thường Gặp
              </h3>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                  >
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-start gap-3">
                      <span className="text-orange-500 text-lg">•</span>
                      {faq.question}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-6 text-white"
              >
                <h4 className="font-bold text-lg mb-3">📱 Tải App FoodDev</h4>
                <p className="text-sm mb-4 opacity-90">
                  Trải nghiệm đặt hàng dễ dàng hơn với ứng dụng di động
                </p>
                <div className="flex gap-3">
                  <button className="flex-1 bg-black text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">
                    App Store
                  </button>
                  <button className="flex-1 bg-black text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">
                    Google Play
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Operating Hours */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Thời Gian Phục Vụ
            </h2>
            <div className="bg-gray-50 rounded-2xl p-8 inline-block">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div>
                  <h4 className="font-bold text-gray-900 mb-4">
                    🍽️ Đặt Hàng Online
                  </h4>
                  <p className="text-gray-600 mb-2">Thứ 2 - Chủ Nhật</p>
                  <p className="text-orange-500 font-semibold">06:00 - 23:00</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-4">
                    📞 Tổng Đài Hỗ Trợ
                  </h4>
                  <p className="text-gray-600 mb-2">24/7</p>
                  <p className="text-orange-500 font-semibold">
                    Cả ngày lễ & cuối tuần
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
