import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(1, "Tên sản phẩm là bắt buộc")
    .max(100, "Tên sản phẩm không được vượt quá 100 ký tự"),

  description: z
    .string()
    .max(500, "Mô tả không được vượt quá 500 ký tự")
    .optional(),

  category: z.enum(
    [
      "combo",
      "chickenfried",
      "hamburger",
      "pizza",
      "drink",
      "dessert",
    ] as const,
    {
      message: "Vui lòng chọn loại sản phẩm",
    }
  ),

  price: z
    .number()
    .min(1000, "Giá sản phẩm phải từ 1,000 VND trở lên")
    .max(10000000, "Giá sản phẩm không được vượt quá 10,000,000 VND"),

  image: z.any().optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;

export const validateProductImage = (files: FileList | null) => {
  if (!files || files.length === 0) return null;

  const file = files[0];

  if (file.size > 5 * 1024 * 1024) {
    return "Kích thước file không được vượt quá 5MB";
  }

  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    return "Chỉ chấp nhận file ảnh định dạng JPEG, PNG, WEBP";
  }

  return null;
};
