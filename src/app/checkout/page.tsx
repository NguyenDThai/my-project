"use client";

import StepOrderOne from "@/components/StepOrderOne";
import StepOrderTwo from "@/components/StepOrderTwo";

import React, { useState } from "react";

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      number: 1,
      title: "THÔNG TIN KHÁCH HÀNG",
      icon: "👤",
    },
    {
      number: 2,
      title: "THÔNG TIN ĐƠN HÀNG",
      icon: "📦",
    },
    {
      number: 3,
      title: "HOÀN TẤT THANH TOÁN",
      icon: "✅",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-8 left-20 right-20 h-1 bg-gray-200 -z-10">
              <div
                className="h-full bg-orange-500 transition-all duration-500"
                style={{
                  width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                }}
              ></div>
            </div>

            {steps.map((step) => (
              <div
                key={step.number}
                className="flex flex-col items-center flex-1"
              >
                {/* Step Container với icon và số */}
                <div className="flex items-center justify-center mb-3">
                  {/* Icon lớn */}
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-300 ${
                      currentStep >= step.number
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                        : "bg-gray-100 text-gray-400 border border-gray-200"
                    }`}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* Step Title */}
                <div className="text-center">
                  <span
                    className={`text-sm font-bold uppercase tracking-wide ${
                      currentStep >= step.number
                        ? "text-orange-500"
                        : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {currentStep === 1 && (
            <StepOrderOne setCurrentStep={setCurrentStep} />
          )}
          {currentStep === 2 && <StepOrderTwo />}

          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Hoàn tất thanh toán
              </h2>
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-3xl">✅</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Đặt hàng thành công!
                </h3>
                <p className="text-gray-600">
                  Cảm ơn bạn đã đặt hàng. Đơn hàng sẽ được giao trong 30-45
                  phút.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                ← Quay lại
              </button>
            )}

            {currentStep < steps.length && (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="ml-auto px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
              >
                Tiếp tục →
              </button>
            )}

            {currentStep === steps.length && (
              <button className="ml-auto px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium">
                Hoàn tất đơn hàng
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
