/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

type UserProfile = {
  name?: string;
  email?: string;
  image?: string;
};

const ProfileUser = () => {
  const [profile, setProfile] = useState<UserProfile>({});
  const [lodaing, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/profile");
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Lỗi không xác định");
        setProfile(data.user);
      } catch (error: any) {
        throw new Error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (lodaing) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg shadow-md border border-gray-200 max-w-sm mx-auto animate-pulse">
        <div className="w-24 h-24 rounded-full bg-gray-200 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-40"></div>
        <p className="mt-4 text-gray-500 text-sm">
          Đang tải thông tin người dùng...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md border border-gray-200 max-w-sm mx-auto">
      <Image
        src={profile.image || "/default-image.jpg"}
        alt="avatar"
        width={100}
        height={100}
        className="rounded-full mb-4 border-2 border-gray-300"
      />
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {profile.name}
      </h2>
      <p className="text-gray-600 text-sm">{profile.email}</p>
    </div>
  );
};

export default ProfileUser;
