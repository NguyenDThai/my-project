"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React, { useRef } from "react";
import { LuPencil } from "react-icons/lu";
import { toast } from "react-toastify";

const EditAvatarProfile = ({ profile }: any) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePickImage = () => {
    fileInputRef.current?.click();
  };

  const handleUploadAvatar = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    const res = await fetch("/api/user/profile/upload-avatar", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Cập nhật ảnh đại diện thành công!");
      window.location.reload();
    } else {
      toast.error(data.message || "Cập nhật ảnh đại diện thất bại!");
    }
  };

  return (
    <div className="relative mb-6 flex justify-center">
      <Image
        src={profile.image || "/default-image.jpg"}
        alt="avatar"
        width={120}
        height={120}
        className="rounded-full border-4 border-white shadow-lg"
      />

      {/* Button bút để đổi ảnh */}
      <button
        type="button"
        className="absolute bottom-0 w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full border-2 border-white flex items-center justify-center cursor-pointer"
        onClick={handlePickImage}
      >
        <LuPencil className="text-white" />
      </button>

      {/* Input upload file (ẩn) */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleUploadAvatar}
        className="hidden"
      />
    </div>
  );
};

export default EditAvatarProfile;
