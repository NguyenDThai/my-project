"use client";

import Categories from "@/components/Categories";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductList from "@/components/ProductList";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const roleAdmin = session?.user.role === "admin";

  if (roleAdmin) {
    redirect("/admin");
  }

  return (
    <main className="bg-white max-h-screen">
      <Header />
      <HeroSection />
      <Categories />
      <ProductList />
    </main>
  );
}
