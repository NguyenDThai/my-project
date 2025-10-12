// components/ProductList.jsx
"use client";

import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Pizza Hải Sản",
    price: 189000,
    image: "/pizza-hai-san.jpg",
    rating: 4.5,
    description: "Pizza hải sản tươi ngon với tôm, mực, nghêu",
  },
  {
    id: 2,
    name: "Burger Bò Phô Mai",
    price: 89000,
    image: "/burger-bo.jpg",
    rating: 4.8,
    description: "Burger bò beef với phô mai tan chảy",
  },
  {
    id: 3,
    name: "Phở Bò Hà Nội",
    price: 45000,
    image: "/pho-bo.jpg",
    rating: 4.9,
    description: "Phở bò truyền thống Hà Nội",
  },
  {
    id: 4,
    name: "Nước giải khát CoCa",
    price: 20000,
    image: "/coca.jpg",
    rating: 4.9,
    description: "Nước uống giải khát CoCa sản khoái cực đã",
  },
  {
    id: 5,
    name: "Kem dâu bánh bông lan",
    price: 30000,
    image: "/icecream.jpg",
    rating: 4.9,
    description: "Kem dâu tráng miệng ngon đậm đà",
  },
  {
    id: 6,
    name: "Combo khoai tây hamburger",
    price: 99000,
    image: "/combo.jpg",
    rating: 4.9,
    description: "Combo ăn cực đã, thỏa cơn thèm",
  },
];

const ProductList = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Món Ăn Nổi Bật
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 overflow-hidden border border-gray-100"
            >
              <div className="relative h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-sm text-gray-600 ml-1">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-orange-600">
                    {product.price.toLocaleString()}đ
                  </span>
                </div>

                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition duration-300 font-semibold">
                  + Thêm Vào Giỏ
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/menu">
            <button className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3 rounded-full font-semibold transition duration-300">
              Xem Tất Cả Món Ăn
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
