import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-orange-400 text-white p-4">
        <div className="flex flex-col justify-between h-full">
          <div className="">
            <h2 className="text-xl font-bold mb-4">Welcome to Admin</h2>
            <nav className="space-y-2">
              <a
                href="/admin"
                className="block py-2 px-3 rounded hover:bg-orange-300"
              >
                Tổng quan
              </a>
              <a
                href="/admin/users"
                className="block py-2 px-3 rounded hover:bg-orange-300"
              >
                Quản lý người dùng
              </a>
              <a
                href="/admin/products"
                className="block py-2 px-3 rounded hover:bg-orange-300"
              >
                Quản lý sản phẩm
              </a>
              <a
                href="/admin/order"
                className="block py-2 px-3 rounded hover:bg-orange-300"
              >
                Quản lý đơn hàng
              </a>
              <a
                href="/admin/reviews"
                className="block py-2 px-3 rounded hover:bg-orange-300"
              >
                Quản lý đánh giá
              </a>
              <a
                href="/admin/statistical"
                className="block py-2 px-3 rounded hover:bg-orange-300"
              >
                Quản lý Thống kê
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Image
              src="/admin.jpg"
              alt="admin-avatar"
              width={100}
              height={100}
              className="bg-transparent rounded-full w-13 h-13"
            />
            <p>Hello Admin</p>
          </div>
        </div>
      </aside>

      {/* Nội dung */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default AdminLayout;
