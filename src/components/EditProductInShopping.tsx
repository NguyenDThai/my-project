import { useCart } from "@/context/CartItem";
import Image from "next/image";
import React from "react";

const EditProductInShopping = () => {
  const {
    editingProduct,
    isEditModalOpen,
    handleCloseEditModal,
    handleUpdateProduct,
    setEditingProduct,
  } = useCart();

  if (!isEditModalOpen || !editingProduct) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý cập nhật sản phẩm ở đây
    handleUpdateProduct(editingProduct);
    handleCloseEditModal();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Chỉnh sửa sản phẩm
          </h2>
          <button
            onClick={handleCloseEditModal}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <span className="text-lg">×</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex gap-4 mb-4">
            <Image
              src={editingProduct.image || "/placeholder-image.jpg"}
              alt={editingProduct.name}
              width={100}
              height={100}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 uppercase">
                {editingProduct.name}
              </h3>
              <p className="text-xl font-bold text-orange-500 mt-1">
                {(
                  editingProduct.price * editingProduct.quantity
                ).toLocaleString()}{" "}
                đ
              </p>
            </div>
          </div>

          {/* Form chỉnh sửa */}
          <form onSubmit={handleSubmit}>
            {/* Chỉnh sửa số lượng */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số lượng
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (editingProduct.quantity > 1) {
                      // Cập nhật trực tiếp editingProduct và cart
                      const updatedProduct = {
                        ...editingProduct,
                        quantity: editingProduct.quantity - 1,
                      };
                      setEditingProduct(updatedProduct);
                      handleUpdateProduct(updatedProduct);
                    }
                  }}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-lg font-bold">-</span>
                </button>
                <span className="w-12 text-center text-lg font-semibold">
                  {editingProduct.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    // Cập nhật trực tiếp editingProduct và cart
                    const updatedProduct = {
                      ...editingProduct,
                      quantity: editingProduct.quantity + 1,
                    };
                    setEditingProduct(updatedProduct);
                    handleUpdateProduct(updatedProduct);
                  }}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-lg font-bold">+</span>
                </button>
              </div>
            </div>

            {/* Option dụng cụ ăn uống */}
            <div className="mb-6">
              <div
                className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                onClick={() => {
                  const updatedProduct = {
                    ...editingProduct,
                    needUtensils: !editingProduct.needUtensils,
                  };
                  setEditingProduct(updatedProduct);
                  handleUpdateProduct(updatedProduct);
                }}
              >
                <div
                  className={`w-5 h-5 border-2 rounded flex items-center justify-center flex-shrink-0 transition-colors ${
                    editingProduct.needUtensils
                      ? "border-orange-500 bg-orange-500"
                      : "border-gray-400 bg-white"
                  }`}
                >
                  {editingProduct.needUtensils && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-900 block">
                    Lấy dụng cụ ăn uống nhựa
                  </span>
                  <p className="text-xs text-gray-600 mt-1">
                    Chúng tôi sẽ gửi dụng cụ ăn uống nhựa như: muỗng, nĩa...
                  </p>
                </div>
                <span className="text-sm text-gray-600">Miễn phí</span>
              </div>
            </div>

            {/* Nút hành động */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCloseEditModal}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-4 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors cursor-pointer"
              >
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProductInShopping;
