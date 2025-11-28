/* eslint-disable @typescript-eslint/no-explicit-any */
import StatCard from "@/app/admin/_components/StatCard";
import React from "react";

const UserStatistic = ({ stat }: any) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard title="Tổng người dùng" value={stat.totalUser} color="blue" />
      <StatCard title="User" value={stat.totalUserRole} color="green" />
      <StatCard title="Admin" value={stat.totalAdminRole} color="red" />
    </div>
  );
};

export default UserStatistic;
