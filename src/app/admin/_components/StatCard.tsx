/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const StatCard = ({ title, value, color }: any) => {
  return (
    <div className={`p-6 rounded-xl shadow bg-${color}-100`}>
      <p className="text-gray-600 text-sm">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default StatCard;
