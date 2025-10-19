/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormData, productSchema } from "@/types/product";
import { toast } from "react-toastify"; // Thêm react-toastify
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function EditProductModal({
  productId,
  onClose,
}: {
  productId: string;
  onClose: () => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  // Lấy dữ liệu sản phẩm theo ID
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/product/${productId}`);
        if (!res.ok) throw new Error("Không thể lấy dữ liệu sản phẩm");
        const data = await res.json();
        reset({
          name: data.product.name,
          description: data.product.description || "",
          price: data.product.price,
          category: data.product.category,
          image: data.product.image || "",
        });
        setPreview(data.product.image);
      } catch (error: any) {
        toast.error("Lỗi khi lấy dữ liệu sản phẩm!", error.message);
      } finally {
        setLoading(false);
      }
    }
    if (productId) fetchProduct();
  }, [productId, reset]);

  // Xử lý upload ảnh (nếu có)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setValue("image", reader.result as string); // Cập nhật giá trị image trong form
      };
      reader.readAsDataURL(file);
    }
  };

  // Gửi form cập nhật
  const onSubmit = async (values: ProductFormData) => {
    try {
      const res = await fetch(`/api/admin/product/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        toast.success("Cập nhật sản phẩm thành công!");
        router.push("/admin/product");
        onClose();
      } else {
        throw new Error("Lỗi khi cập nhật sản phẩm");
      }
    } catch (error: any) {
      toast.error("Lỗi khi cập nhật sản phẩm!", error.message);
    }
  };

  // Xác nhận trước khi đóng nếu form có thay đổi
  const handleClose = () => {
    if (
      isDirty &&
      !confirm("Bạn có chắc muốn đóng? Các thay đổi sẽ không được lưu.")
    ) {
      return;
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-2xl border border-gray-100">
        {/* Nút đóng */}
        <button
          onClick={handleClose}
          type="button"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Sửa sản phẩm
          </h2>
          <p className="text-gray-500 text-sm">Cập nhật thông tin sản phẩm</p>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
            <p className="text-gray-600 mt-3">Đang tải dữ liệu...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Tên sản phẩm */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tên sản phẩm <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("name")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 placeholder-gray-400"
                placeholder="Nhập tên sản phẩm"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Mo ta san pham */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mô tả sản phẩm <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("description")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 placeholder-gray-400"
                placeholder="Nhập mô tả sản phẩm"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Loai san pham */}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Loại sản phẩm <span className="text-red-500">*</span>
              </label>
              <select
                {...register("category")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white"
              >
                <option value="">Chọn loại sản phẩm</option>
                <option value="combo">Combo</option>
                <option value="chickenfried">Gà Rán</option>
                <option value="hamburger">Hamburger</option>
                <option value="pizza">Pizza</option>
                <option value="drink">Đồ Uống</option>
                <option value="dessert">Tráng Miệng</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Giá */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Giá sản phẩm <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  {...register("price", { valueAsNumber: true })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 pl-12"
                  placeholder="0"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 font-medium">₫</span>
                </div>
              </div>
              {errors.price && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Ảnh sản phẩm */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ảnh sản phẩm
              </label>

              {/* URL Input */}
              <input
                type="text"
                {...register("image")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 placeholder-gray-400 mb-3"
                placeholder="https://example.com/image.jpg"
              />

              {/* File Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-orange-400 transition-colors duration-200">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <svg
                    className="w-8 h-8 text-gray-400 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">
                    Chọn ảnh từ máy tính
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    PNG, JPG, WEBP (MAX. 5MB)
                  </span>
                </label>
              </div>

              {/* Preview */}
              {preview && (
                <div className="mt-3 relative">
                  <Image
                    src={preview}
                    alt="Preview"
                    width={400}
                    height={300}
                    className="w-full h-40 object-cover rounded-xl border"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreview(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              )}

              {errors.image && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Lỗi ảnh sản phẩm
                </p>
              )}
            </div>

            {/* Nút hành động */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all duration-200 border border-gray-200"
              >
                Hủy bỏ
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-orange-400 disabled:to-orange-400 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Lưu thay đổi
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
