/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Decentralization from "@/app/admin/_components/Decentralization";
import ModalDetailUser from "@/app/admin/_components/ModalDetailUser";
import React, { useEffect, useState } from "react";

const RenderAllUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showModalDetailUser, setShowModalDetailUser] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/admin/alluser");
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Loi khong xac dinh");
        setLoading(false);
        return;
      }
      setUsers(data.users || []);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  if (loading)
    return <p className="text-center p-4">Đang tải danh sách người dùng...</p>;

  if (error) return <p className="text-red-500 text-center p-4">{error}</p>;

  return (
    <>
      <div className="max-w-7xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Danh sách người dùng
            </h2>
            <p className="text-gray-600">
              Quản lý tất cả người dùng trong hệ thống
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm người dùng..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 outline-none"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
          <table className="w-full ">
            <thead className="bg-gradient-to-r from-orange-500 to-orange-600">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <span>Họ và Tên</span>
                    <button className="text-white/80 hover:text-white">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    </button>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider w-64">
                  Địa chỉ
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                  Số điện thoại
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                  Vai trò
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                  Ngày tạo
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {users.map((user: any) => (
                <tr
                  key={user._id}
                  className="group transition-all duration-200 hover:bg-orange-50/50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm bg-gradient-to-r from-orange-400 to-orange-500`}
                      >
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div
                          className={`text-sm font-semibold text-gray-900 group-hover:text-orange-600 transition-colors  `}
                        >
                          {user.name}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700 font-medium">
                      {user.email}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 max-w-xs line-clamp-2">
                      {user.addresses?.find((addr: any) => addr.isDefault)
                        ?.address || "Chưa cập nhật"}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700 font-mono">
                      {user.addresses?.find((addr: any) => addr.isDefault)
                        ?.phone || user.phone}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full capitalize ${
                        user.role === "admin"
                          ? "bg-red-100 text-red-800 border border-red-200"
                          : user.role === "moderator"
                          ? "bg-purple-100 text-purple-800 border border-purple-200"
                          : "bg-green-100 text-green-800 border border-green-200"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(user.createdAt).toLocaleTimeString("vi-VN")}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`flex items-center gap-2 transition-opacity duration-200 ${
                        user.isActive
                          ? "opacity-0 group-hover:opacity-100"
                          : "opacity-30"
                      }`}
                    >
                      {/* Btn edit role */}
                      <button
                        disabled={!user.isActive}
                        className={`p-2 rounded-lg transition-colors cursor-pointer ${
                          user.isActive
                            ? "text-blue-600 hover:bg-blue-50"
                            : "text-gray-400 cursor-not-allowed"
                        }`}
                        title={
                          user.isActive
                            ? "Chỉnh sửa"
                            : "Người dùng đã bị vô hiệu hóa"
                        }
                        onClick={() => {
                          if (!user.isActive) return;
                          setSelectedUser(user);
                          setShowModal(true);
                        }}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>

                      {/* Btn view detail */}
                      <button
                        className={`p-2 rounded-lg transition-colors cursor-pointer ${
                          user.isActive
                            ? "text-green-600 hover:bg-green-50"
                            : "text-gray-400 hover:bg-gray-50"
                        }`}
                        title={
                          user.isActive
                            ? "Xem chi tiết"
                            : "Người dùng bị khóa — bấm để mở lại"
                        }
                        onClick={() => {
                          setSelectedUser(user);
                          setShowModalDetailUser(true);
                        }}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showModal && selectedUser && (
            <Decentralization
              setShowModal={setShowModal}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              fetchUser={fetchUser}
            />
          )}

          {showModalDetailUser && selectedUser && (
            <ModalDetailUser
              setShowModalDetailUser={setShowModalDetailUser}
              selectedUser={selectedUser}
              fetchUser={fetchUser}
            />
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-600 mb-4 sm:mb-0">
            Hiển thị <span className="font-semibold">1-{users.length}</span>{" "}
            trong tổng số <span className="font-semibold">{users.length}</span>{" "}
            người dùng
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
              Trước
            </button>
            <button className="px-3 py-2 bg-orange-500 text-white rounded-lg font-semibold">
              1
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
              Sau
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RenderAllUser;
