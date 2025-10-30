/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCart } from "@/context/CartItem";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { toast } from "react-toastify";

type User = {
  name: string;
  phone: string;
  address: string;
  note?: string;
};

const StepOrderTwo = ({ user }: any) => {
  const { cart, total } = useCart();
  const [shippingFee, setShippingFee] = useState(15000);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMethod, setSeletedMethod] = useState("delivery");
  const [formData, setFormData] = useState<User>({
    name: "",
    phone: "",
    address: "",
  });
  const { data: session } = useSession();

  // Load thông tin user khi component mount hoặc user thay đổi
  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.name || "",
        phone: user?.phone || "",
        address: user?.address || "",
      });
    }
  }, [user]);

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Hàm cập nhật thông tin người dùng
  const handleUpdateProfile = async () => {
    if (!session) {
      alert("Vui lòng đăng nhập để cập nhật thông tin");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
        }),
      });

      if (response.ok) {
        await response.json();
        toast.success("Cập nhật thông tin thành công!");
        setIsEditing(false);
      } else {
        const error = await response.json();
        alert(`Cập nhật thất bại: ${error.message}`);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      alert("Có lỗi xảy ra khi cập nhật thông tin");
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm bật chế độ chỉnh sửa
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Hàm hủy chỉnh sửa
  const handleCancelEdit = () => {
    setFormData({
      name: user?.name || "",
      phone: user?.phone || "",
      address: user?.address || "",
      note: "",
    });
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl text-center font-bold text-orange-600 mb-6">
        THÔNG TIN ĐƠN HÀNG
      </h2>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form thông tin khách hàng */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">GIAO HÀNG ĐẾN</h3>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Họ và tên
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChangeInput}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors ${
                  !isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số điện thoại
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChangeInput}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors ${
                  !isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Địa chỉ
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChangeInput}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors ${
                  !isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                }`}
              />
            </div>
          </div>

          {/* Nút hành động */}
          {isEditing ? (
            <div className="flex flex-col gap-2 md:flex-row justify-between mt-6">
              <button
                onClick={handleCancelEdit}
                disabled={isLoading}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
              >
                Hủy
              </button>
              <button
                onClick={handleUpdateProfile}
                disabled={isLoading}
                className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Đang cập nhật...
                  </>
                ) : (
                  "CẬP NHẬT THÔNG TIN"
                )}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 md:flex-row justify-between mt-6">
              <button className="p-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 transition-colors font-medium cursor-pointer">
                CHỌN ĐỊA CHỈ KHÁC
              </button>
              <button
                onClick={handleEditClick}
                className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium cursor-pointer"
              >
                CẬP NHẬT ĐỊA CHỈ
              </button>
            </div>
          )}

          <div className="mt-10">
            {/* Tiêu đề */}
            <div className="text-lg font-semibold mb-4">
              Phương thức vận chuyển
            </div>

            <div className="space-y-4">
              {/* Phương thức 1: Giao hàng tận nơi */}
              <div
                className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                onClick={() => setSeletedMethod("delivery")}
              >
                <div className="flex items-center justify-center w-5 h-5 border border-gray-300 rounded-full">
                  {selectedMethod === "delivery" && (
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  )}
                </div>
                <div>
                  <div className="font-medium">Giao hàng tận nơi</div>
                </div>
              </div>

              {/* Phương thức 2: Hẹn lấy tại cửa hàng */}
              <div
                className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                onClick={() => setSeletedMethod("pickup")}
              >
                <div className="flex items-center justify-center w-5 h-5 border border-gray-300 rounded-full mt-1">
                  {selectedMethod === "pickup" && (
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium">Hẹn lấy tại cửa hàng</div>

                  {/* Thông tin cửa hàng - chỉ hiển thị khi chọn phương thức này */}
                  {selectedMethod === "pickup" && (
                    <div className="mt-3 space-y-3">
                      <div>
                        <div className="text-sm font-medium mb-2">
                          Tỉnh thành
                        </div>
                        <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
                          <option>Cần Thơ</option>
                        </select>
                      </div>

                      <div>
                        <div className="text-sm font-medium mb-2">
                          Cửa hàng *
                        </div>
                        <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
                          <option>Chọn cửa hàng</option>
                          <option>Cửa hàng 1 - Quận Ninh Kiều</option>
                          <option>Cửa hàng 2 - Quận Cái Răng</option>
                          <option>Cửa hàng 3 - Quận Bình Thủy</option>
                          <option>Cửa hàng 4 - Quận Ô Môn</option>
                          <option>Cửa hàng 5 - Quận Thốt Nốt</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Ghi chú đơn hàng */}
            <div className="mt-6">
              <div className="text-sm font-medium mb-2">GHI CHÚ ĐƠN HÀNG</div>
              <textarea
                placeholder="Ghi chú"
                className="w-full p-3 border border-gray-300 rounded-md resize-none"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Chi tiết đơn hàng */}
        <div className="lg:w-96">
          <div className="bg-[#f5f1e6] rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                CHI TIẾT ĐƠN HÀNG
              </h3>
              <Link href="/menu">
                <FaPen
                  size={15}
                  className="hover:text-orange-400 transition-all duration-300 cursor-pointer"
                />
              </Link>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="space-y-4 max-h-80 overflow-y-auto mb-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200"
                >
                  <Image
                    src={item.image || "/placeholder.png"}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-sm truncate">
                      {item.name}
                    </h4>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-orange-500 font-bold">
                        {item.price.toLocaleString()} đ
                      </span>
                      <span className="text-gray-600 text-sm">
                        x{item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tổng tiền */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Tạm tính:</span>
                <span>{total.toLocaleString()} đ</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Phí vận chuyển:</span>
                <span>{shippingFee.toLocaleString()} đ</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-orange-600 border-t border-gray-200 pt-2">
                <span>Tổng cộng:</span>
                <span>{(total + shippingFee).toLocaleString()} đ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOrderTwo;
