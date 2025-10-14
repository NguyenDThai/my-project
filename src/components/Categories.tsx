"use client";

const categories = [
  { id: 1, name: "Pizza", icon: "🍕", count: 15 },
  { id: 2, name: "Burger", icon: "🍔", count: 12 },
  { id: 3, name: "Gà Rán", icon: "🍗", count: 20 },
  { id: 4, name: "Tráng Miệng", icon: "🍰", count: 8 },
  { id: 5, name: "Đồ Uống", icon: "🥤", count: 10 },
  { id: 6, name: "Combo", icon: "🎁", count: 5 },
];

const Categories = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Danh Mục Món Ăn
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition duration-300 cursor-pointer border border-gray-100"
            >
              <div className="text-4xl mb-2">{category.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500">{category.count} món</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
