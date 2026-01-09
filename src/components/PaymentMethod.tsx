/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";

const PaymentMethod = ({ setMethodPayment }: any) => {
  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold mb-4">Phương thức thanh toán</h2>
      <select
        className="w-full p-2 border border-gray-300 rounded-md text-sm"
        onChange={(e) => setMethodPayment(e.target.value)}
      >
        <option>Chọn phương thức thanh toán</option>
        <option value="cod">Thanh toán khi nhận hàng</option>
        <option value="atm">Thanh toán ATM</option>
        <option value="vietqr">Thanh toán Viet QR</option>
        <option value="vnpay">Thanh toán VNPay</option>
      </select>
    </div>
  );
};

export default PaymentMethod;
