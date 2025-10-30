"use client";

import {
  ProductFormData,
  productSchema,
  validateProductImage,
} from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddProductForm = () => {
  const [imageError, setImageError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
    clearErrors,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      category: undefined,
      price: undefined,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    setImagePreview(null);
    setImageError(null);
    setSelectedFile(null);

    clearErrors("image");

    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];
    const error = validateProductImage(files);
    if (error) {
      setImageError(error);
      setError("image", { message: error });
      return;
    }

    // Tạo preview URL
    setSelectedFile(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (selectedFile) {
        const files = fileInputRef.current?.files;
        const imageError = validateProductImage(files || null);

        if (imageError) {
          setImageError(imageError);
          return;
        }
      }

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description || "");
      formData.append("category", data.category);
      formData.append("price", data.price.toString());

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const response = await fetch("/api/admin/product", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message);
      }

      toast.success(result.message);

      reset();
      setImagePreview(null);
      setImageError(null);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageError(null);
    setSelectedFile(null);
    clearErrors("image");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <form
      className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-6">
        {/* Tên sản phẩm */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tên sản phẩm <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            placeholder="Nhập tên sản phẩm"
            {...register("name")}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors placeholder-gray-400 outline-none ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Mô tả sản phẩm */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mô tả sản phẩm
          </label>
          <textarea
            id="description"
            rows={3}
            placeholder="Nhập mô tả cho sản phẩm"
            {...register("description")}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors placeholder-gray-400 resize-none outline-none ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          />

          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Loại sản phẩm và Giá */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Loại sản phẩm */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loại sản phẩm <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              {...register("category")}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Chọn loại đồ ăn</option>
              <option value="chickenfried">Gà Rán</option>
              <option value="combo">Combo</option>
              <option value="hamburger">Hamburger</option>
              <option value="pizza">Pizza</option>
              <option value="drink">Đồ Uống</option>
              <option value="dessert">Tráng Miệng</option>
            </select>

            {errors.category && (
              <p className="mt-1 text-sm text-red-600">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Giá sản phẩm */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Giá sản phẩm <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                placeholder="0"
                min="0"
                className={`w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors outline-none ${
                  errors.price ? "border-red-500" : "border-gray-300"
                }`}
                {...register("price", { valueAsNumber: true })}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">₫</span>
              </div>
            </div>

            {errors.price && (
              <p className="mt-1 text-sm text-red-600">
                {errors.price.message}
              </p>
            )}
          </div>
        </div>

        {/* Hình ảnh sản phẩm (thêm mới) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hình ảnh sản phẩm
          </label>

          {/* Image preview */}

          {imagePreview && (
            <div className="mb-4 relative inline-block">
              <Image
                src={imagePreview}
                alt="Preview"
                width={128}
                height={128}
                className="h-32 w-32 object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            </div>
          )}

          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click để upload</span> hoặc
                  kéo thả
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, WEBP (MAX. 5MB)
                </p>
              </div>
              <input
                type="file"
                id="image"
                className="hidden"
                accept="image/jpeg,image/png,image/webp"
                {...register("image")}
                onChange={handleImageChange}
                ref={fileInputRef}
              />
            </label>
          </div>
          {(errors.image || imageError) && (
            <p className="mt-1 text-sm text-red-600">
              {typeof errors.image?.message === "string"
                ? errors.image.message
                : imageError}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-orange-400 disabled:to-orange-400 text-white py-3 px-6 rounded-lg transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Đang xử lý...
              </>
            ) : (
              "Thêm sản phẩm"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddProductForm;
