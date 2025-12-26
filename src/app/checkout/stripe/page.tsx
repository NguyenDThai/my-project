"use client";

import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { LuArrowLeft, LuSmartphone } from "react-icons/lu";
import { IoAlertCircle, IoAlertCircleOutline } from "react-icons/io5";
import {
  FaBuilding,
  FaCheckCircle,
  FaCreditCard,
  FaLock,
  FaRegCheckCircle,
} from "react-icons/fa";
import { GoShieldCheck } from "react-icons/go";
import { TbLoader2 } from "react-icons/tb";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const searchParam = useSearchParams();
  const orderId = searchParam.get("orderId");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message || "Đã xảy ra lỗi trong quá trình thanh toán");
      setPaymentSuccess(false);
    } else {
      setMessage("Thanh toán thành công! Đang chuyển hướng...");
      setPaymentSuccess(true);

      // Chuyển hướng sau 2 giây
      setTimeout(() => {
        window.location.href = `${window.location.origin}/checkout/success?orderId=${orderId}`;
      }, 2000);
    }

    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Thanh toán đơn hàng
        </h1>
        <p className="text-gray-600">
          Vui lòng điền thông tin thanh toán của bạn
        </p>
      </div>

      {/* Payment Message */}
      {message && (
        <div
          className={`p-4 rounded-lg flex items-start gap-3 ${
            paymentSuccess
              ? "bg-green-50 border border-green-200"
              : "bg-red-50 border border-red-200"
          }`}
        >
          {paymentSuccess ? (
            <FaRegCheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          ) : (
            <IoAlertCircleOutline className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          )}
          <p
            className={`text-sm ${
              paymentSuccess ? "text-green-800" : "text-red-800"
            }`}
          >
            {message}
          </p>
        </div>
      )}

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-50 p-4 md:p-6 rounded-xl border border-gray-200">
          <PaymentElement />
        </div>

        {/* Submit Button */}
        <div className="space-y-4">
          <button
            type="submit"
            disabled={!stripe || loading}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2
              ${
                !stripe || loading
                  ? "bg-gray-300 cursor-not-allowed text-gray-500"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg"
              }`}
          >
            {loading ? (
              <>
                <TbLoader2 className="w-5 h-5 animate-spin" />
                Đang xử lý...
              </>
            ) : (
              <>
                <FaLock className="w-5 h-5" />
                Thanh toán ngay
              </>
            )}
          </button>

          {/* Security Note */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <GoShieldCheck className="w-4 h-4" />
            <span>Thanh toán được bảo mật và mã hóa</span>
          </div>
        </div>
      </form>

      {/* Payment Methods */}
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Phương thức thanh toán được hỗ trợ
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <div className="p-2 bg-white rounded-lg shadow-sm mb-2">
              <FaCreditCard className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="text-xs text-center text-gray-700">
              Thẻ tín dụng/ghi nợ
            </span>
          </div>
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <div className="p-2 bg-white rounded-lg shadow-sm mb-2">
              <FaBuilding className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="text-xs text-center text-gray-700">
              Chuyển khoản ngân hàng
            </span>
          </div>
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <div className="p-2 bg-white rounded-lg shadow-sm mb-2">
              <LuSmartphone className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="text-xs text-center text-gray-700">
              Ví điện tử
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StripeCheckoutPage() {
  const searchParams = useSearchParams();
  const clientSecret = searchParams.get("cs");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mô phỏng thời gian tải
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!clientSecret) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <IoAlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Thiếu thông tin thanh toán
          </h2>
          <p className="text-gray-600 mb-8">
            Không tìm thấy thông tin cần thiết để thực hiện thanh toán. Vui lòng
            quay lại và thử lại.
          </p>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            <LuArrowLeft className="w-5 h-5" />
            Quay lại trang trước
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Đang tải thông tin thanh toán
          </h2>
          <p className="text-gray-600">Vui lòng đợi trong giây lát...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl mt-20">
        {/* Logo và header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <FaCreditCard className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Food-Dev</h1>
          </div>
          <p className="text-gray-600 max-w-md mx-auto">
            Thanh toán an toàn và bảo mật cho đơn hàng của bạn
          </p>
        </div>

        {/* Main checkout card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 md:p-8">
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <Suspense fallback={<div>Đang tải...</div>}>
                <CheckoutForm />
              </Suspense>
            </Elements>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 md:px-8 py-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-600">
                © 2024 Food-Dev. Tất cả các quyền được bảo lưu.
              </p>
              <div className="flex items-center gap-6">
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                >
                  Chính sách bảo mật
                </a>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                >
                  Điều khoản dịch vụ
                </a>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                >
                  Trợ giúp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Additional security info */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <GoShieldCheck className="w-4 h-4" />
            <span>Bảo mật SSL 256-bit</span>
          </div>
          <div className="flex items-center gap-2">
            <FaLock className="w-4 h-4" />
            <span>Dữ liệu được mã hóa</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCheckCircle className="w-4 h-4" />
            <span>Hoàn tiền trong 30 ngày</span>
          </div>
        </div>
      </div>
    </div>
  );
}
