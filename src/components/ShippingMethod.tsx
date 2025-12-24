/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderMethod } from "@/components/StepOrderTwo";
import React from "react";

type OrderShipping = {
  selectedMethod: OrderMethod;
  formData: any;
  handleSelectMethod: (method: OrderMethod) => void;
  handleChangeInput: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const ShippingMethod = ({
  handleSelectMethod,
  selectedMethod,
  formData,
  handleChangeInput,
}: OrderShipping) => {
  return (
    <div className="mt-10">
      {/* Tiêu đề */}
      <div className="text-lg font-semibold mb-4">Phương thức vận chuyển</div>

      <div className="space-y-4">
        {/* Phương thức 1: Giao hàng tận nơi */}
        <div
          className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
          onClick={() => handleSelectMethod("delivery")}
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
          onClick={() => handleSelectMethod("pickup")}
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
                  <div className="text-sm font-medium mb-2">Tỉnh thành</div>
                  <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
                    <option>Cần Thơ</option>
                  </select>
                </div>

                <div>
                  <div className="text-sm font-medium mb-2">Cửa hàng *</div>
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
          name="note"
          value={formData.note || ""}
          onChange={handleChangeInput}
          placeholder="Ghi chú"
          className="w-full p-3 border border-gray-300 rounded-md resize-none"
          rows={3}
        />
      </div>
    </div>
  );
};

export default ShippingMethod;
