"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const CareersPage = () => {
  const [activeDepartment, setActiveDepartment] = useState("all");

  const departments = [
    { id: "all", name: "Tất cả" },
    { id: "kitchen", name: "Bếp" },
    { id: "delivery", name: "Giao hàng" },
    { id: "customer-service", name: "Chăm sóc khách hàng" },
    { id: "technology", name: "Công nghệ" },
    { id: "marketing", name: "Marketing" },
  ];

  const jobPositions = [
    {
      id: 1,
      title: "Đầu Bếp Chính",
      department: "kitchen",
      type: "Full-time",
      location: "TP.HCM",
      salary: "15-25 triệu",
      experience: "2+ năm kinh nghiệm",
      deadline: "31/12/2024",
      urgent: true,
      description:
        "Phụ trách chế biến các món ăn chính, quản lý khu vực bếp và đào tạo nhân viên mới.",
      requirements: [
        "Có kinh nghiệm 2+ năm ở vị trí tương tự",
        "Thành thạo các kỹ thuật chế biến",
        "Khả năng làm việc nhóm tốt",
        "Chịu được áp lực công việc",
      ],
    },
    {
      id: 2,
      title: "Tài Xế Giao Hàng",
      department: "delivery",
      type: "Full-time/Part-time",
      location: "TP.HCM",
      salary: "8-15 triệu + Thưởng",
      experience: "Không yêu cầu",
      deadline: "25/12/2024",
      urgent: true,
      description:
        "Giao hàng tận nơi cho khách, đảm bảo thời gian và chất lượng dịch vụ.",
      requirements: [
        "Có phương tiện di chuyển (xe máy)",
        "Biết sử dụng ứng dụng định vị",
        "Thái độ thân thiện, nhiệt tình",
        "Có tinh thần trách nhiệm cao",
      ],
    },
    {
      id: 3,
      title: "Nhân Viên Tư Vấn Online",
      department: "customer-service",
      type: "Full-time",
      location: "Làm từ xa",
      salary: "8-12 triệu",
      experience: "6 tháng+",
      deadline: "20/12/2024",
      urgent: false,
      description:
        "Hỗ trợ khách hàng qua hotline, chat và email, giải đáp thắc mắc về đơn hàng.",
      requirements: [
        "Kỹ năng giao tiếp tốt",
        "Thành thạo máy tính văn phòng",
        "Khả năng xử lý tình huống",
        "Làm việc được ca tối và cuối tuần",
      ],
    },
    {
      id: 4,
      title: "Frontend Developer",
      department: "technology",
      type: "Full-time",
      location: "TP.HCM/Hybrid",
      salary: "15-30 triệu",
      experience: "1+ năm kinh nghiệm",
      deadline: "15/01/2025",
      urgent: false,
      description:
        "Phát triển và bảo trì website, ứng dụng đặt hàng của FoodDev.",
      requirements: [
        "Thành thạo React/Next.js",
        "Có kinh nghiệm với TypeScript",
        "Hiểu biết về Tailwind CSS",
        "Có portfolio hoặc project cá nhân",
      ],
    },
    {
      id: 5,
      title: "Content Creator",
      department: "marketing",
      type: "Full-time",
      location: "TP.HCM",
      salary: "10-15 triệu",
      experience: "1+ năm kinh nghiệm",
      deadline: "10/01/2025",
      urgent: false,
      description:
        "Sáng tạo nội dung cho mạng xã hội, website và chiến dịch marketing.",
      requirements: [
        "Kỹ năng viết content tốt",
        "Thành thạo các nền tảng MXH",
        "Có máy ảnh/điện thoại chụp hình tốt",
        "Khả năng chỉnh sửa ảnh/video cơ bản",
      ],
    },
    {
      id: 6,
      title: "Quản Lý Cửa Hàng",
      department: "kitchen",
      type: "Full-time",
      location: "TP.HCM",
      salary: "12-18 triệu",
      experience: "1+ năm kinh nghiệm",
      deadline: "05/01/2025",
      urgent: false,
      description:
        "Quản lý vận hành bếp, kiểm soát chất lượng và điều phối nhân sự.",
      requirements: [
        "Kinh nghiệm quản lý trong F&B",
        "Kỹ năng lãnh đạo và đào tạo",
        "Hiểu biết về vệ sinh an toàn thực phẩm",
        "Khả năng giải quyết vấn đề",
      ],
    },
  ];

  const benefits = [
    {
      icon: "💰",
      title: "Lương Thưởng Hấp Dẫn",
      description:
        "Mức lương cạnh tranh + thưởng hiệu suất + thưởng các dịp lễ",
    },
    {
      icon: "🏥",
      title: "Bảo Hiểm Đầy Đủ",
      description:
        "Bảo hiểm xã hội, bảo hiểm y tế, bảo hiểm thất nghiệp theo quy định",
    },
    {
      icon: "🎓",
      title: "Đào Tạo & Phát Triển",
      description: "Đào tạo kỹ năng chuyên môn, cơ hội thăng tiến rõ ràng",
    },
    {
      icon: "🍕",
      title: "Ưu Đãi Ẩm Thực",
      description: "Giảm giá 50% cho nhân viên, ăn trưa miễn phí tại cửa hàng",
    },
    {
      icon: "🎉",
      title: "Hoạt Động Team Building",
      description: "Du lịch hàng năm, tiệc tất niên, hoạt động gắn kết định kỳ",
    },
    {
      icon: "⚕️",
      title: "Chăm Sóc Sức Khỏe",
      description:
        "Khám sức khỏe định kỳ, hỗ trợ phòng gym, yoga cho nhân viên",
    },
  ];

  const filteredJobs =
    activeDepartment === "all"
      ? jobPositions
      : jobPositions.filter((job) => job.department === activeDepartment);

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
            Gia Nhập Đội Ngũ FoodDev
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto mb-8"
          >
            Cùng chúng tôi tạo nên những trải nghiệm ẩm thực tuyệt vời cho hàng
            ngàn khách hàng
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="bg-white text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Ứng Tuyển Ngay
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-orange-500 transition-colors">
              Tìm Hiểu Văn Hóa
            </button>
          </motion.div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tại Sao Chọn FoodDev?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Môi trường làm việc năng động, chuyên nghiệp và đầy cảm hứng
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Vị Trí Tuyển Dụng
            </h2>
            <p className="text-xl text-gray-600">
              Khám phá cơ hội nghề nghiệp phù hợp với bạn
            </p>
          </motion.div>

          {/* Department Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2 justify-center mb-8"
          >
            {departments.map((department) => (
              <button
                key={department.id}
                onClick={() => setActiveDepartment(department.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  activeDepartment === department.id
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                }`}
              >
                {department.name}
              </button>
            ))}
          </motion.div>

          {/* Jobs Grid */}
          <div className="space-y-6">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {job.title}
                        </h3>
                        {job.urgent && (
                          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            🔥 TUYỂN GẤP
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          🏢{" "}
                          {
                            departments.find((d) => d.id === job.department)
                              ?.name
                          }
                        </span>
                        <span className="flex items-center gap-1">
                          ⏱️ {job.type}
                        </span>
                        <span className="flex items-center gap-1">
                          📍 {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          💰 {job.salary}
                        </span>
                      </div>

                      <p className="text-gray-700 mb-4">{job.description}</p>

                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Yêu cầu:
                        </h4>
                        <ul className="text-gray-600 space-y-1">
                          {job.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <div className="space-y-2 mb-4">
                        <div className="text-sm text-gray-500">
                          📅 Hạn nộp: {job.deadline}
                        </div>
                        <div className="text-sm text-gray-500">
                          📊 {job.experience}
                        </div>
                      </div>
                      <button className="w-full lg:w-auto bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                        Ứng Tuyển Ngay
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Jobs Message */}
          {filteredJobs.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Hiện không có vị trí phù hợp
              </h3>
              <p className="text-gray-600 mb-6">
                Vui lòng kiểm tra lại sau hoặc gửi CV để chúng tôi liên hệ khi
                có vị trí phù hợp
              </p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Gửi CV Ứng Tuyển
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Quy Trình Tuyển Dụng
            </h2>
            <p className="text-xl text-gray-600">
              Quy trình đơn giản, minh bạch và nhanh chóng
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Nộp Đơn",
                description: "Điền form online hoặc gửi CV qua email",
              },
              {
                step: "2",
                title: "Phỏng Vấn",
                description: "Phỏng vấn trực tiếp hoặc online",
              },
              {
                step: "3",
                title: "Thử Việc",
                description: "Làm việc thử 1-2 ngày (có lương)",
              },
              {
                step: "4",
                title: "Nhận Việc",
                description: "Ký hợp đồng và onboard",
              },
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 mx-auto">
                  {process.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {process.title}
                </h3>
                <p className="text-gray-600 text-sm">{process.description}</p>
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
            <h2 className="text-4xl font-bold mb-6">
              Sẵn Sàng Gia Nhập Đội Ngũ?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Gửi CV ngay hôm nay và bắt đầu hành trình cùng FoodDev
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-500 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                📧 Gửi CV Ứng Tuyển
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-orange-500 transition-colors">
                📞 Liên Hệ Tư Vấn
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
