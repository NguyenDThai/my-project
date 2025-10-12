import Categories from "@/components/Categories";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductList from "@/components/ProductList";

export default function Home() {
  return (
    <main className="bg-white max-h-screen">
      <Header />
      <HeroSection />
      <Categories />
      <ProductList />
    </main>
  );
}
