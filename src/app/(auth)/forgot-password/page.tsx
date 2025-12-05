"use client";

import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        console.log("Api error", res.status);
        return;
      }

      const data = await res.json();

      if (data.success) {
        window.location.href = `reset-password?token=${data.token}`;
      }
    } catch (error) {
      console.error("Error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Nhập email của bạn</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Nhập email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 rounded w-md"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white p-2 rounded cursor-pointer hover:bg-orange-600 transition"
        >
          Đặt lại mật khẩu
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
