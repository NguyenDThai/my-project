"use client";

import FormChangePasswordProfile from "@/components/FormChangePasswordProfile";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React, { useState } from "react";

const FormEditingProfile = ({
  handleSubmit,
  formData,
  profile,
  handleInputChange,
  handleEditToggle,
}: any) => {
  const [openFormChangePass, setOpenFormChangePass] = useState(false);

  return (
    <div className="mt-50 flex flex-col items-center p-8 bg-white rounded-xl shadow-lg border border-gray-100 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Chỉnh sửa hồ sơ</h2>

      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        {/* Avatar Preview */}
        <div className="flex flex-col items-center mb-4">
          <Image
            src={profile.image || "/default-image.jpg"}
            alt="avatar preview"
            width={100}
            height={100}
            className="rounded-full border-4 border-white shadow-lg mb-4"
          />
        </div>

        <h2 className="text-xl font-semibold">Thông tin cá nhân</h2>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Họ và tên
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="Nhập họ và tên"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Địa chỉ
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="Nhập địa chỉ"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số điện thoại
            </label>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="Nhập số điện thoại"
              required
            />
          </div>
        </div>

        {/* Change passowrd */}
        <div className="w-full flex justify-end">
          <span
            onClick={() => setOpenFormChangePass(true)}
            className="text-md font-extralight cursor-pointer hover:underline text-orange-500"
          >
            Thay đổi mật khẩu
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={handleEditToggle}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-xl transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-4 rounded-xl transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
          >
            Lưu thay đổi
          </button>
        </div>
      </form>

      {openFormChangePass && (
        <FormChangePasswordProfile
          setOpenFormChangePass={setOpenFormChangePass}
        />
      )}
    </div>
  );
};

export default FormEditingProfile;
