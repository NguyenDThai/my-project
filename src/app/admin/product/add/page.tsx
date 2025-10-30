import AddProductForm from "@/app/admin/_components/AddProductForm";

const AddProductPageAdmin = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Quản lý sản phẩm
          </h2>
          <p className="text-gray-600">Thêm sản phẩm mới vào menu</p>
        </div>
        {/* Form */}
        <AddProductForm />
      </div>
    </div>
  );
};

export default AddProductPageAdmin;
