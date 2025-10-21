"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const FaqPage = () => {
  const [activeCategory, setActiveCategory] = useState("ordering");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const categories = [
    { id: "ordering", name: "Đặt Hàng", icon: "🛒" },
    { id: "delivery", name: "Giao Hàng", icon: "🚚" },
    { id: "payment", name: "Thanh Toán", icon: "💳" },
    { id: "account", name: "Tài Khoản", icon: "👤" },
    { id: "product", name: "Sản Phẩm", icon: "🍔" },
    { id: "other", name: "Khác", icon: "❓" },
  ];

  const faqs = {
    ordering: [
      {
        id: 1,
        question: "Làm thế nào để đặt hàng trên FoodDev?",
        answer:
          "Bạn có thể đặt hàng theo 3 cách:\n1. Truy cập website FoodDev và chọn món\n2. Tải ứng dụng FoodDev trên App Store/Google Play\n3. Gọi hotline 0869240149 để được hỗ trợ đặt hàng",
      },
      {
        id: 2,
        question: "Tôi có thể đặt hàng trước không?",
        answer:
          "Có, bạn có thể đặt hàng trước tối đa 24 giờ. Hãy chọn thời gian giao hàng mong muốn khi đặt hàng, chúng tôi sẽ chế biến và giao đúng giờ.",
      },
      {
        id: 3,
        question: "Thời gian đặt hàng trong ngày là khi nào?",
        answer:
          "Chúng tôi nhận đơn hàng từ 6:00 sáng đến 22:30 tối hàng ngày. Đơn hàng sau 22:30 sẽ được xử lý vào ngày hôm sau.",
      },
      {
        id: 4,
        question: "Tôi có thể chỉnh sửa đơn hàng sau khi đặt không?",
        answer:
          "Bạn có thể chỉnh sửa đơn hàng trong vòng 5 phút sau khi đặt. Sau thời gian này, vui lòng liên hệ hotline 0869240149 để được hỗ trợ.",
      },
      {
        id: 5,
        question: "Làm sao để áp dụng mã giảm giá?",
        answer:
          "Nhập mã giảm giá tại bước thanh toán. Mỗi mã chỉ sử dụng được 1 lần và có thể có điều kiện áp dụng (ví dụ: đơn tối thiểu, khách hàng mới, v.v.)",
      },
    ],
    delivery: [
      {
        id: 6,
        question: "Phí giao hàng là bao nhiêu?",
        answer:
          "Miễn phí giao hàng cho đơn từ 100.000đ. Đơn dưới 100.000đ phí ship 15.000đ. Một số khu vực ngoại thành có thể có phí khác.",
      },
      {
        id: 7,
        question: "Thời gian giao hàng trung bình là bao lâu?",
        answer:
          "Thời gian giao hàng trung bình 30-45 phút trong nội thành. Trong giờ cao điểm hoặc thời tiết xấu có thể lâu hơn. Bạn có thể theo dõi đơn hàng trực tiếp trên app/website.",
      },
      {
        id: 8,
        question: "FoodDev giao hàng đến những khu vực nào?",
        answer:
          "Hiện tại chúng tôi giao hàng toàn TP.HCM. Đang mở rộng ra Hà Nội và Đà Nẵng. Bạn có thể kiểm tra khu vực giao hàng bằng cách nhập địa chỉ khi đặt hàng.",
      },
      {
        id: 9,
        question: "Tôi có thể theo dõi đơn hàng như thế nào?",
        answer:
          'Sau khi đặt hàng, bạn sẽ nhận được link theo dõi đơn hàng qua SMS/Email. Hoặc vào mục "Đơn hàng của tôi" trên website/app để xem trạng thái chi tiết.',
      },
      {
        id: 10,
        question: "Làm gì khi không nhận được đơn hàng?",
        answer:
          "Vui lòng liên hệ ngay hotline 0869240149 hoặc chat với chúng tôi trên website/app. Chúng tôi sẽ hỗ trợ bạn ngay lập tức.",
      },
    ],
    payment: [
      {
        id: 11,
        question: "Những phương thức thanh toán nào được chấp nhận?",
        answer:
          "Chúng tôi chấp nhận:\n• Tiền mặt (COD)\n• Chuyển khoản ngân hàng\n• Ví điện tử (Momo, ZaloPay)\n• Thẻ quốc tế (Visa, Mastercard)\n• Internet Banking",
      },
      {
        id: 12,
        question: "Tôi có thể đổi hình thức thanh toán sau khi đặt hàng không?",
        answer:
          "Có, bạn có thể liên hệ hotline 0869240149 để đổi hình thức thanh toán trước khi đơn hàng được giao.",
      },
      {
        id: 13,
        question: "Thanh toán online có an toàn không?",
        answer:
          "Hoàn toàn an toàn! Chúng tôi sử dụng cổng thanh toán được mã hóa SSL 256-bit, đảm bảo thông tin của bạn được bảo mật tuyệt đối.",
      },
      {
        id: 14,
        question: "Tôi có được hoàn tiền nếu hủy đơn hàng?",
        answer:
          "Nếu bạn thanh toán trước và hủy đơn trước khi hàng được giao, chúng tôi sẽ hoàn tiền 100% trong vòng 3-5 ngày làm việc.",
      },
      {
        id: 15,
        question: "Làm sao để nhận hóa đơn VAT?",
        answer:
          "Vui lòng yêu cầu hóa đơn VAT khi đặt hàng hoặc liên hệ bộ phận kế toán qua email accounting@FoodDev.com",
      },
    ],
    account: [
      {
        id: 16,
        question: "Làm thế nào để tạo tài khoản?",
        answer:
          'Bấm "Đăng ký" trên website/app và điền thông tin cơ bản. Bạn cũng có thể đăng ký bằng Facebook, Google hoặc số điện thoại.',
      },
      {
        id: 17,
        question: "Tôi quên mật khẩu thì phải làm sao?",
        answer:
          'Bấm "Quên mật khẩu" tại trang đăng nhập, nhập email/số điện thoại đã đăng ký. Chúng tôi sẽ gửi hướng dẫn reset mật khẩu qua email/SMS.',
      },
      {
        id: 18,
        question: "Làm sao để tích lũy điểm thưởng?",
        answer:
          "Mỗi 10.000đ trong đơn hàng = 1 điểm. Điểm sẽ được tích lũy tự động và có thể đổi thành voucher giảm giá ở những lần mua sau.",
      },
      {
        id: 19,
        question: "Tại sao tôi nên tạo tài khoản?",
        answer:
          "Tài khoản giúp bạn:\n• Theo dõi lịch sử đơn hàng\n• Tích lũy điểm thưởng\n• Nhận ưu đãi đặc biệt\n• Đặt hàng nhanh hơn\n• Lưu địa chỉ giao hàng",
      },
      {
        id: 20,
        question: "Làm sao để xóa tài khoản?",
        answer:
          "Vui lòng gửi yêu cầu xóa tài khoản đến thainguyen4646@gmail.com. Lưu ý: hành động này không thể hoàn tác.",
      },
    ],
    product: [
      {
        id: 21,
        question: "Thực phẩm có đảm bảo vệ sinh an toàn không?",
        answer:
          "Tuyệt đối! Chúng tôi tuân thủ nghiêm ngặt các tiêu chuẩn VSATTP, nguyên liệu được kiểm tra kỹ trước khi chế biến và có nguồn gốc rõ ràng.",
      },
      {
        id: 22,
        question: "Tôi có thể yêu cầu tùy chỉnh món ăn không?",
        answer:
          "Có, bạn có thể ghi chú tùy chỉnh khi đặt hàng (ví dụ: ít cay, không hành, thêm sốt,...). Đầu bếp sẽ cố gắng đáp ứng theo yêu cầu.",
      },
      {
        id: 23,
        question: "FoodDev có options cho người ăn chay không?",
        answer:
          'Có, chúng tôi có nhiều lựa chọn cho người ăn chay. Bạn có thể tìm thấy trong mục "Đồ chay" trên thực đơn.',
      },
      {
        id: 24,
        question: "Thông tin dinh dưỡng của món ăn ở đâu?",
        answer:
          "Thông tin dinh dưỡng cơ bản được hiển thị trên trang chi tiết món ăn. Để biết thông tin chi tiết, vui lòng liên hệ chúng tôi.",
      },
      {
        id: 25,
        question: "Tôi bị dị ứng với một số thành phần thì phải làm sao?",
        answer:
          "Vui lòng kiểm tra kỹ thành phần trong mô tả món ăn và ghi chú rõ về dị ứng khi đặt hàng. Đội ngũ bếp sẽ đặc biệt lưu ý cho đơn hàng của bạn.",
      },
    ],
    other: [
      {
        id: 26,
        question: "Làm thế nào để liên hệ với FoodDev?",
        answer:
          "Bạn có thể liên hệ qua:\n• Hotline: 0869240149 (24/7)\n• Email: thainguyen464@gmail.com\n• Facebook: https://www.facebook.com/nguyen.uc.thai.201420\n• Zalo: 0869240149",
      },
      {
        id: 27,
        question: "FoodDev có chính sách đổi trả như thế nào?",
        answer:
          "Chúng tôi cam kết hoàn tiền 100% nếu:\n• Sai món so với đơn đặt\n• Chất lượng không đảm bảo\n• Giao hàng quá muộn (trên 90 phút)\nVui lòng chụp ảnh và liên hệ ngay khi nhận hàng.",
      },
      {
        id: 28,
        question: "Làm sao để trở thành đối tác giao hàng của FoodDev?",
        answer:
          'Gửi CV đến hr@foodDev.com với tiêu đề "[TÀI XẾ] - Họ tên". Chúng tôi sẽ liên hệ lại trong 3 ngày làm việc.',
      },
      {
        id: 29,
        question: "Tôi muốn mở franchise FoodDev thì sao?",
        answer:
          "Vui lòng gửi yêu cầu đến franchise@FoodDev.com. Chúng tôi sẽ gửi thông tin chi tiết về điều kiện và quy trình hợp tác.",
      },
      {
        id: 30,
        question: "Làm thế nào để khiếu nại về dịch vụ?",
        answer:
          "Gửi email đến thainguyen4646@gmail.com với đầy đủ thông tin đơn hàng và nội dung khiếu nại. Chúng tôi sẽ phản hồi trong 24 giờ.",
      },
    ],
  };

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const currentFAQs = faqs[activeCategory as keyof typeof faqs] || [];

  return (
    <div className="min-h-screen bg-gray-50 mt-[80px]">
      <section className="relative py-20 bg-gradient-to-br from-orange-500 to-amber-500 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold mb-6"
          >
            Câu Hỏi Thường Gặp
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto mb-8"
          >
            Tìm câu trả lời cho mọi thắc mắc về dịch vụ của FoodDev
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <button className="bg-white text-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              🔍 Tìm kiếm câu hỏi
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-orange-500 transition-colors">
              📞 Liên hệ hỗ trợ
            </button>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Categories */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">
                  Danh mục
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                        activeCategory === category.id
                          ? "bg-orange-500 text-white shadow-md"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className="text-xl">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </button>
                  ))}
                </div>

                {/* Help Card */}
                <div className="mt-8 p-4 bg-gradient-to-br from-orange-400 to-amber-400 rounded-xl text-white">
                  <h4 className="font-bold mb-2">Cần thêm trợ giúp?</h4>
                  <p className="text-sm mb-4 opacity-90">
                    Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng
                  </p>
                  <div className="space-y-2">
                    <button className="w-full bg-white text-orange-500 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors">
                      💬 Chat ngay
                    </button>
                    <button className="w-full bg-transparent border border-white text-white py-2 rounded-lg text-sm font-semibold hover:bg-white hover:text-orange-500 transition-colors">
                      📞 Gọi 0869240149
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* FAQ Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Category Header */}
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">
                      {categories.find((c) => c.id === activeCategory)?.icon}
                    </span>
                    <h2 className="text-2xl font-bold">
                      {categories.find((c) => c.id === activeCategory)?.name}
                    </h2>
                  </div>
                  <p className="text-orange-100">
                    {currentFAQs.length} câu hỏi trong danh mục này
                  </p>
                </div>

                {/* FAQ Items */}
                <div className="p-6">
                  <AnimatePresence>
                    {currentFAQs.map((faq, index) => (
                      <motion.div
                        key={faq.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="border-b border-gray-200 last:border-b-0"
                      >
                        <button
                          onClick={() => toggleItem(faq.id)}
                          className="w-full flex items-center justify-between py-6 text-left hover:bg-gray-50 px-4 rounded-lg transition-colors"
                        >
                          <h3 className="font-semibold text-gray-900 pr-4">
                            {faq.question}
                          </h3>
                          <motion.span
                            animate={{
                              rotate: openItems.includes(faq.id) ? 180 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                            className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center"
                          >
                            ▼
                          </motion.span>
                        </button>

                        <AnimatePresence>
                          {openItems.includes(faq.id) && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="px-4 pb-6"
                            >
                              <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Still Have Questions */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-8 text-white text-center"
              >
                <h3 className="text-2xl font-bold mb-4">
                  Vẫn chưa tìm thấy câu trả lời?
                </h3>
                <p className="text-orange-100 mb-6 text-lg">
                  Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-orange-500 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                    💬 Chat với chúng tôi
                  </button>
                  <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white hover:text-orange-500 transition-colors">
                    📞 Gọi 0869240149
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FaqPage;
