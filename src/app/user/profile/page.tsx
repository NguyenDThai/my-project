/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

type Address = {
  fullName: string;
  phone: string;
  address: string;
  isDefault?: boolean;
};

type UserProfile = {
  name?: string;
  email?: string;
  image?: string;
  phone?: string;
  addresses?: Address[];
};

const ProfileUser = () => {
  const [profile, setProfile] = useState<UserProfile>({});

  const [lodaing, setLoading] = useState(true);
  const [isEditing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/profile");
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Lỗi không xác định");
        const user = data.user;
        const defaultAddress =
          user.addresses?.find((addr: any) => addr.isDefault) ||
          user.addresses?.[0] ||
          {};

        setProfile({
          name: user.name,
          phone: defaultAddress.phone || "",
          email: user.email,
          image: user.image,
          addresses: user.addresses,
        });

        setFormData({
          name: user.name || "",
          address: defaultAddress.address || "",
          phone: defaultAddress.phone || "",
        });
      } catch (error: any) {
        throw new Error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Khi ma profile thay doi thi setformData chay lai de lay thong tin len o input
  useEffect(() => {
    const defaultAddress = profile.addresses?.find((addr) => addr.isDefault);

    setFormData({
      name: profile.name || "",
      address: defaultAddress?.address || "",
      phone: defaultAddress?.phone || "",
    });
  }, [profile]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => {
    setEditing(!isEditing);
    if (isEditing) {
      const defaultAddress = profile.addresses?.find((addr) => addr.isDefault);
      setFormData({
        name: profile.name || "",
        address: defaultAddress?.address || "",
        phone: defaultAddress?.phone || "",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setEditing(false);
        setProfile((prev) => ({
          ...prev,
          name: formData.name,
          phone: formData.phone,
          addresses: [
            {
              fullName: formData.name,
              phone: formData.phone,
              address: formData.address,
              isDefault: true,
            },
          ],
        }));
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  if (lodaing) {
    return (
      <div className="mt-50 flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg shadow-md border border-gray-200 max-w-sm mx-auto animate-pulse">
        <div className="w-24 h-24 rounded-full bg-gray-200 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-40"></div>
        <p className="mt-4 text-gray-500 text-sm">
          Đang tải thông tin người dùng...
        </p>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="mt-50 flex flex-col items-center p-8 bg-white rounded-xl shadow-lg border border-gray-100 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Chỉnh sửa hồ sơ
        </h2>

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
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mt-50 flex flex-col items-center p-8 bg-white rounded-xl shadow-lg border border-gray-100 max-w-md mx-auto">
        <div className="relative mb-6">
          <Image
            src={profile.image || "/default-image.jpg"}
            alt="avatar"
            width={120}
            height={120}
            className="rounded-full border-4 border-white shadow-lg"
          />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full border-2 border-white flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          {profile.name}
        </h2>
        <p className="text-gray-500 text-base mb-6 text-center">
          {profile.email}
        </p>

        <div className="w-full flex flex-col sm:flex-row gap-3 mt-8">
          <button
            onClick={handleEditToggle}
            className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-4 rounded-xl transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Chỉnh sửa
          </button>

          <button className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white py-3 px-4 rounded-xl transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            <Link href={"/"} className="flex items-center justify-center gap-2">
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Về trang chủ
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
