"use client";

import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

const ShoppingButton = () => {
  const [total, setTotal] = useState(0);

  return (
    <div className="fixed bottom-0 w-[250px] h-[51px] right-16 bg-[#fac437] flex items-center justify-center z-50 rounded-tl-2xl rounded-tr-2xl gap-2">
      <div>
        <FaShoppingCart size={24} color="#000" />
      </div>
      <span className="font-bold text-xl">{total} đ</span>
    </div>
  );
};

export default ShoppingButton;
