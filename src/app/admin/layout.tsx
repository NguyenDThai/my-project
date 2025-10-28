import AdminSidebar from "@/app/admin/_components/AdminLayout";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
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
      <AdminSidebar session={session} />

      {/* Nội dung */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default AdminLayout;
