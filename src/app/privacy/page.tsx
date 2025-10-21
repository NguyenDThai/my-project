"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const PrivacyPage = () => {
  const [activeSection, setActiveSection] = useState("intro");

  const sections = [
    { id: "intro", title: "Giới Thiệu" },
    { id: "data-collection", title: "Thu Thập Dữ Liệu" },
    { id: "data-usage", title: "Sử Dụng Dữ Liệu" },
    { id: "data-sharing", title: "Chia Sẻ Dữ Liệu" },
    { id: "data-protection", title: "Bảo Vệ Dữ Liệu" },
    { id: "cookies", title: "Cookies" },
    { id: "rights", title: "Quyền Của Bạn" },
    { id: "updates", title: "Cập Nhật Chính Sách" },
    { id: "contact", title: "Liên Hệ" },
  ];

  const privacyContent = {
    intro: {
      title: "Chính Sách Bảo Mật",
      content: `
        <p>Chào mừng bạn đến với FoodDev! Chúng tôi cam kết bảo vệ quyền riêng tư và thông tin cá nhân của bạn. Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng, bảo vệ và chia sẻ thông tin của bạn khi bạn sử dụng dịch vụ của chúng tôi.</p>
        
        <p><strong>Ngày hiệu lực:</strong> 01/01/2024</p>
        
        <p>Bằng việc sử dụng dịch vụ của FoodDev, bạn đồng ý với các điều khoản được mô tả trong chính sách bảo mật này.</p>
      `,
    },
    "data-collection": {
      title: "Thông Tin Chúng Tôi Thu Thập",
      content: `
        <h3>1. Thông tin bạn cung cấp trực tiếp</h3>
        <ul>
          <li><strong>Thông tin cá nhân:</strong> Họ tên, số điện thoại, email, địa chỉ giao hàng</li>
          <li><strong>Thông tin tài khoản:</strong> Tên đăng nhập, mật khẩu, tùy chọn giao hàng</li>
          <li><strong>Thông tin thanh toán:</strong> Số thẻ, thông tin ví điện tử (được mã hóa)</li>
          <li><strong>Thông tin đơn hàng:</strong> Lịch sử đặt hàng, món ăn yêu thích</li>
        </ul>

        <h3>2. Thông tin thu thập tự động</h3>
        <ul>
          <li><strong>Thông tin thiết bị:</strong> IP address, loại thiết bị, hệ điều hành</li>
          <li><strong>Thông tin sử dụng:</strong> Trang bạn truy cập, thời gian sử dụng</li>
          <li><strong>Vị trí:</strong> Để giao hàng chính xác (chỉ khi được cho phép)</li>
          <li><strong>Cookies và công nghệ theo dõi:</strong> Để cải thiện trải nghiệm</li>
        </ul>
      `,
    },
    "data-usage": {
      title: "Cách Chúng Tôi Sử Dụng Thông Tin",
      content: `
        <h3>Mục đích sử dụng thông tin</h3>
        <ul>
          <li><strong>Xử lý đơn hàng:</strong> Giao hàng, xác nhận đơn, hỗ trợ khách hàng</li>
          <li><strong>Cải thiện dịch vụ:</strong> Phân tích xu hướng, tối ưu hóa trải nghiệm</li>
          <li><strong>Marketing:</strong> Gửi khuyến mãi, tin tức (có thể từ chối)</li>
          <li><strong>Bảo mật:</strong> Phát hiện và ngăn chặn gian lận</li>
          <li><strong>Tuân thủ pháp luật:</strong> Đáp ứng yêu cầu pháp lý</li>
        </ul>

        <h3>Cơ sở pháp lý</h3>
        <p>Chúng tôi xử lý dữ liệu dựa trên:</p>
        <ul>
          <li>Sự đồng ý của bạn</li>
          <li>Thực hiện hợp đồng (giao hàng)</li>
          <li>Lợi ích hợp pháp (cải thiện dịch vụ)</li>
          <li>Nghĩa vụ pháp lý</li>
        </ul>
      `,
    },
    "data-sharing": {
      title: "Chia Sẻ Thông Tin",
      content: `
        <h3>Đối tác nhận thông tin</h3>
        <ul>
          <li><strong>Đối tác giao hàng:</strong> Thông tin địa chỉ, số điện thoại để giao hàng</li>
          <li><strong>Nhà cung cấp dịch vụ:</strong> Xử lý thanh toán, phân tích dữ liệu</li>
          <li><strong>Đối tác marketing:</strong> (Chỉ với sự đồng ý) cho chiến dịch quảng cáo</li>
          <li><strong>Cơ quan pháp luật:</strong> Khi có yêu cầu hợp pháp</li>
        </ul>

        <h3>Cam kết bảo vệ</h3>
        <p>Tất cả đối tác của chúng tôi đều ký thỏa thuận bảo mật và chỉ được sử dụng thông tin cho mục đích được ủy quyền.</p>

        <h3>Chuyển giao quốc tế</h3>
        <p>Dữ liệu của bạn có thể được lưu trữ trên server tại Singapore, tuân thủ các tiêu chuẩn bảo mật quốc tế.</p>
      `,
    },
    "data-protection": {
      title: "Bảo Vệ Dữ Liệu",
      content: `
        <h3>Biện pháp bảo mật kỹ thuật</h3>
        <ul>
          <li><strong>Mã hóa:</strong> SSL 256-bit cho tất cả dữ liệu truyền tải</li>
          <li><strong>Bảo mật server:</strong> Firewall, hệ thống phát hiện xâm nhập</li>
          <li><strong>Mã hóa dữ liệu:</strong> Thông tin nhạy cảm được mã hóa ở trạng thái nghỉ</li>
          <li><strong>Kiểm soát truy cập:</strong> Phân quyền nghiêm ngặt</li>
        </ul>

        <h3>Biện pháp tổ chức</h3>
        <ul>
          <li>Đào tạo nhân viên về bảo mật dữ liệu</li>
          <li>Thỏa thuận bảo mật với tất cả đối tác</li>
          <li>Đánh giá rủi ro định kỳ</li>
          <li>Kế hoạch ứng phó sự cố</li>
        </ul>

        <h3>Lưu trữ dữ liệu</h3>
        <p>Chúng tôi chỉ lưu trữ dữ liệu trong thời gian cần thiết cho mục đích xử lý hoặc theo yêu cầu pháp luật.</p>
      `,
    },
    cookies: {
      title: "Cookies & Công Nghệ Theo Dõi",
      content: `
        <h3>Cookies chúng tôi sử dụng</h3>
        <ul>
          <li><strong>Cookies thiết yếu:</strong> Để website hoạt động bình thường</li>
          <li><strong>Cookies chức năng:</strong> Lưu tùy chọn người dùng</li>
          <li><strong>Cookies hiệu suất:</strong> Phân tích cách sử dụng website</li>
          <li><strong>Cookies marketing:</strong> Hiển thị quảng cáo phù hợp</li>
        </ul>

        <h3>Quản lý Cookies</h3>
        <p>Bạn có thể quản lý cài đặt cookies thông qua trình duyệt. Tuy nhiên, việc vô hiệu hóa cookies có thể ảnh hưởng đến trải nghiệm sử dụng.</p>

        <h3>Công nghệ theo dõi khác</h3>
        <ul>
          <li>Google Analytics: Phân tích lưu lượng truy cập</li>
          <li>Pixel Facebook: Đo lường hiệu quả quảng cáo</li>
          <li>Heatmaps: Phân tích hành vi người dùng</li>
        </ul>
      `,
    },
    rights: {
      title: "Quyền Của Bạn",
      content: `
        <h3>Quyền theo luật bảo vệ dữ liệu</h3>
        <ul>
          <li><strong>Quyền truy cập:</strong> Yêu cầu sao chép dữ liệu cá nhân</li>
          <li><strong>Quyền sửa đổi:</strong> Chỉnh sửa thông tin không chính xác</li>
          <li><strong>Quyền xóa:</strong> Yêu cầu xóa dữ liệu cá nhân</li>
          <li><strong>Quyền hạn chế xử lý:</strong> Tạm dừng xử lý dữ liệu</li>
          <li><strong>Quyền phản đối:</strong> Từ chối xử lý cho mục đích marketing</li>
          <li><strong>Quyền di chuyển dữ liệu:</strong> Nhận dữ liệu ở định dạng có thể đọc</li>
        </ul>

        <h3>Cách thực hiện quyền</h3>
        <p>Để thực hiện các quyền trên, vui lòng:</p>
        <ol>
          <li>Đăng nhập tài khoản và cập nhật trong phần cài đặt</li>
          <li>Gửi email đến privacy@FoodDev.com</li>
          <li>Gọi hotline 0869240149 (phím 3)</li>
        </ol>

        <p>Chúng tôi sẽ phản hồi trong vòng 30 ngày.</p>
      `,
    },
    updates: {
      title: "Cập Nhật Chính Sách",
      content: `
        <h3>Thay đổi chính sách</h3>
        <p>Chúng tôi có thể cập nhật chính sách bảo mật này để phản ánh:</p>
        <ul>
          <li>Thay đổi trong hoạt động kinh doanh</li>
          <li>Phản hồi từ khách hàng</li>
          <li>Thay đổi về luật pháp và quy định</li>
          <li>Cải tiến trong biện pháp bảo mật</li>
        </ul>

        <h3>Thông báo thay đổi</h3>
        <p>Khi có thay đổi quan trọng, chúng tôi sẽ:</p>
        <ul>
          <li>Gửi email thông báo 30 ngày trước khi có hiệu lực</li>
          <li>Hiển thị thông báo nổi bật trên website/app</li>
          <li>Cập nhật ngày hiệu lực ở đầu chính sách</li>
        </ul>

        <h3>Tiếp tục sử dụng dịch vụ</h3>
        <p>Việc bạn tiếp tục sử dụng dịch vụ sau khi chính sách được cập nhật được coi là chấp nhận các thay đổi.</p>
      `,
    },
    contact: {
      title: "Liên Hệ & Khiếu Nại",
      content: `
        <h3>Bộ phận bảo mật dữ liệu</h3>
        <p>Nếu bạn có câu hỏi hoặc lo ngại về chính sách bảo mật, vui lòng liên hệ:</p>
        
        <div class="contact-info">
          <p><strong>📧 Email:</strong> privacy@FoodDev.com</p>
          <p><strong>📞 Hotline:</strong> 0869240149 (Phím 3 - Bộ phận bảo mật)</p>
          <p><strong>🏢 Địa chỉ:</strong> 123 Nguyễn Văn Linh, Quận 7, TP.HCM</p>
          <p><strong>⏰ Thời gian làm việc:</strong> Thứ 2 - Thứ 6, 8:00 - 17:00</p>
        </div>

        <h3>Khiếu nại</h3>
        <p>Nếu bạn không hài lòng với cách chúng tôi xử lý khiếu nại, bạn có quyền gửi khiếu nại đến:</p>
        <ul>
          <li>Cục An toàn thông tin - Bộ Thông tin và Truyền thông</li>
          <li>Tòa án có thẩm quyền</li>
        </ul>

        <h3>Cam kết giải quyết</h3>
        <p>Chúng tôi cam kết giải quyết mọi khiếu nại trong vòng 30 ngày làm việc và luôn tìm cách đạt được giải pháp thỏa đáng cho cả hai bên.</p>
      `,
    },
  };

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
            Chính Sách Bảo Mật
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto"
          >
            Cam kết bảo vệ thông tin và quyền riêng tư của bạn
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">
                  Mục Lục
                </h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                        activeSection === section.id
                          ? "bg-orange-500 text-white shadow-md"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className="font-medium">{section.title}</span>
                    </button>
                  ))}
                </nav>

                {/* Quick Actions */}
                <div className="mt-8 p-4 bg-gradient-to-br from-orange-400 to-amber-400 rounded-xl text-white">
                  <h4 className="font-bold mb-2">Hành Động Nhanh</h4>
                  <div className="space-y-2">
                    <button className="w-full bg-white text-orange-500 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors">
                      📧 Gửi yêu cầu
                    </button>
                    <button className="w-full bg-transparent border border-white text-white py-2 rounded-lg text-sm font-semibold hover:bg-white hover:text-orange-500 transition-colors">
                      📄 Tải PDF
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white">
                  <h2 className="text-2xl font-bold">
                    {
                      privacyContent[
                        activeSection as keyof typeof privacyContent
                      ]?.title
                    }
                  </h2>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{
                      __html:
                        privacyContent[
                          activeSection as keyof typeof privacyContent
                        ]?.content || "",
                    }}
                  />

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => {
                        const currentIndex = sections.findIndex(
                          (s) => s.id === activeSection
                        );
                        if (currentIndex > 0)
                          setActiveSection(sections[currentIndex - 1].id);
                      }}
                      disabled={activeSection === sections[0].id}
                      className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                    >
                      ← Phần trước
                    </button>
                    <button
                      onClick={() => {
                        const currentIndex = sections.findIndex(
                          (s) => s.id === activeSection
                        );
                        if (currentIndex < sections.length - 1)
                          setActiveSection(sections[currentIndex + 1].id);
                      }}
                      disabled={
                        activeSection === sections[sections.length - 1].id
                      }
                      className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600 transition-colors"
                    >
                      Phần tiếp theo →
                    </button>
                  </div>
                </div>
              </div>

              {/* Important Notice */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl">ℹ️</div>
                  <div>
                    <h4 className="font-bold text-blue-900 mb-2">
                      Thông Tin Quan Trọng
                    </h4>
                    <p className="text-blue-800 text-sm">
                      Chính sách này là một phần của Điều khoản dịch vụ FoodDev.
                      Bằng việc sử dụng dịch vụ của chúng tôi, bạn đồng ý với
                      việc thu thập và sử dụng thông tin theo mô tả trong chính
                      sách này.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
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
            <h2 className="text-4xl font-bold mb-6">Cần Hỗ Trợ Về Bảo Mật?</h2>
            <p className="text-xl mb-8 opacity-90">
              Đội ngũ bảo mật của chúng tôi luôn sẵn sàng hỗ trợ bạn
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-500 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                📧 Gửi yêu cầu
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-orange-500 transition-colors">
                📞 Gọi 0869240149
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        .prose ul {
          list-style-type: disc;
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }

        .prose ol {
          list-style-type: decimal;
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }

        .prose li {
          margin-bottom: 0.5rem;
          line-height: 1.6;
        }

        .prose h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #1f2937;
        }

        .prose p {
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .prose strong {
          font-weight: bold;
          color: #1f2937;
        }

        .contact-info p {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default PrivacyPage;
