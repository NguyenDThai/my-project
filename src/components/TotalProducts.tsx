/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const TotalProducts = ({ orderUser }: any) => {
  return (
    <div className="mt-6 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl lg:rounded-2xl p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
        <div className="text-center sm:text-left">
          <p className="text-gray-700 text-sm lg:text-base font-medium">
            Tổng số đơn hàng:{" "}
            <span className="text-green-600 font-bold">{orderUser.length}</span>
          </p>
        </div>
        <div className="text-center sm:text-right">
          <p className="text-gray-700 text-sm lg:text-base font-medium">
            Tổng tiền đã chi:{" "}
            <span className="text-green-600 font-bold text-lg lg:text-xl">
              {new Intl.NumberFormat("vi-VN").format(
                orderUser.reduce(
                  (total: number, order: any) =>
                    total + (order.totalPrice || 0),
                  0
                )
              )}{" "}
              VND
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TotalProducts;
