/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";

const ItemForOrder = ({ item }: any) => {
  return (
    <div className="border border-gray-200 rounded-xl lg:rounded-2xl p-4 lg:p-6 hover:shadow-lg transition-all duration-300 bg-white group hover:border-orange-200">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
        <div className="flex items-start space-x-3 lg:space-x-5 flex-1 min-w-0">
          {/* Product Image */}
          <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg lg:rounded-xl flex items-center justify-center overflow-hidden border border-gray-200 shadow-sm flex-shrink-0">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xl lg:text-2xl text-gray-400">📷</span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-base lg:text-lg mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
              {item.name}
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center px-2 py-1 lg:px-3 lg:py-1.5 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">
                SL: {item.quantity}
              </span>
              <span className="inline-flex items-center px-2 py-1 lg:px-3 lg:py-1.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200">
                {new Intl.NumberFormat("vi-VN").format(item.price)} VND
              </span>
            </div>
          </div>
        </div>

        <div className="text-left sm:text-right ml-0 sm:ml-4">
          <p className="text-lg lg:text-xl font-bold text-orange-600 mb-1">
            {new Intl.NumberFormat("vi-VN").format(item.price * item.quantity)}{" "}
            VND
          </p>
          <p className="text-xs lg:text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded">
            {item.quantity} ×{" "}
            {new Intl.NumberFormat("vi-VN").format(item.price)} VND
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItemForOrder;
