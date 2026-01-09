/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ModalAddAddress from "@/components/ModalAddAddress";
import OrderDetail from "@/components/OrderDetail";
import PaymentMethod from "@/components/PaymentMethod";
import ShippingMethod from "@/components/ShippingMethod";
import { useCart } from "@/context/CartItem";
import { useSession } from "next-auth/react";

import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";

import { toast } from "react-toastify";

type User = {
  name: string;
  phone: string;
  address: string;
  note?: string;
};

export type OrderMethod = "delivery" | "pickup";
type PaymentMethodType = "cod" | "atm" | "zalopay" | "vietqr" | "vnpay";

const StepOrderTwo = forwardRef(
  ({ user, onSuccessOrder, fetchUser }: any, ref) => {
    const { cart, total } = useCart();
    const [shippingFee, setShippingFee] = useState(15000);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedMethod, setSeletedMethod] =
      useState<OrderMethod>("delivery");
    const [formData, setFormData] = useState<User>({
      name: "",
      phone: "",
      address: "",
    });
    const { data: session } = useSession();
    const [openModal, setOpenModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<any>(null);

    const [methodPayment, setMethodPayment] =
      useState<PaymentMethodType>("cod");

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

    useEffect(() => {
      if (selectedAddress) {
        setFormData({
          name: selectedAddress.fullName || "",
          phone: selectedAddress.phone || "",
          address: selectedAddress.address || "",
        });
      }
    }, [selectedAddress]);

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

    // lấy dữ liệu cho phương thức vận chuyển
    const handleSelectMethod = (method: OrderMethod) => {
      setSeletedMethod(method);
      setFormData((prev) => ({
        ...prev,
        deliveryMethod: method,
      }));
    };

    // Hàm xử lý api cho đơn hàng
    const handleCreateOrder = async (payload: any) => {
      if (!formData.name || !formData.address || !formData.phone) {
        toast.error("Vui lòng nhập đầy đủ thông tin giao hàng");
        return;
      }

      setIsLoading(true);

      try {
        const res = await fetch("/api/order", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-type": "application/json",
          },
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || "Không thể tạo đơn hàng");
          return null;
        }

        return data.order;
      } catch (error) {
        console.error("Lỗi khi tạo đơn hàng:", error);
        toast.error("Đã xảy ra lỗi, vui lòng thử lại");
      } finally {
        setIsLoading(false);
      }
    };

    const getOrderPayload = () => {
      if (!formData.name || !formData.address || !formData.phone) {
        toast.error("Vui lòng nhập đầy đủ thông tin giao hàng");
        return null;
      }

      return {
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        note: formData.note,
        cart,
        total,
        shippingFee,
        deliveryMethod: selectedMethod,
        methodPayment,
      };
    };

    useImperativeHandle(ref, () => ({
      createOrder: handleCreateOrder,
      getOrderPayload,
    }));

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
                <button
                  onClick={() => setOpenModal(true)}
                  className="p-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 transition-colors font-medium cursor-pointer"
                >
                  CHỌN ĐỊA CHỈ KHÁC / THÊM
                </button>

                <button
                  onClick={handleEditClick}
                  className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium cursor-pointer"
                >
                  CẬP NHẬT ĐỊA CHỈ
                </button>

                {openModal && (
                  <ModalAddAddress
                    userId={user.id}
                    onClose={() => setOpenModal(false)}
                    addresses={user.addresses}
                    onSuccess={(addr: any) => setSelectedAddress(addr)}
                    fetchAddress={fetchUser}
                  />
                )}
              </div>
            )}

            {/* Phương thức vận chuyển */}

            <ShippingMethod
              formData={formData}
              selectedMethod={selectedMethod}
              handleSelectMethod={handleSelectMethod}
              handleChangeInput={handleChangeInput}
            />
          </div>

          <div>
            {/* Chi tiết đơn hàng */}
            <OrderDetail
              cart={cart}
              selectedMethod={selectedMethod}
              total={total}
              shippingFee={shippingFee}
            />

            <PaymentMethod
              methodPayment={methodPayment}
              setMethodPayment={setMethodPayment}
            />
          </div>
        </div>
      </div>
    );
  }
);

export default StepOrderTwo;
