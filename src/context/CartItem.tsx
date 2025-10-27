"use client";

import { useSession } from "next-auth/react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  needUtensils?: boolean; // Thêm trường mới
};

type CartContextType = {
  cart: CartItem[];
  total: number;
  totalPrice: number;
  allUtensilsSelected: boolean;
  isEditModalOpen: boolean;
  editingProduct: CartItem | null;
  setEditingProduct: (product: CartItem | null) => void;
  addToCart: (item: CartItem) => void;
  handleDeleteItem: (itemId: string) => void;
  handleToggleUtensil: (itemId: string) => void;
  handleToggleAllUtensils: () => void;
  handleCloseEditModal: () => void;
  handleIncreaseQuantity: (itemId: string) => void;
  handleDecreaseQuantity: (itemId: string) => void;
  handleOpenEditModal: (product: CartItem) => void;
  handleUpdateProduct: (updateProduct: CartItem) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [allUtensilsSelected, setAllUtensilsSelected] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<CartItem | null>(null);

  //   Load cart tu local storege

  // Load cart từ localStorage với key theo user
  useEffect(() => {
    const cartKey = session ? `cart_${session.user?.id}` : "cart_guest";
    const storedCart = localStorage.getItem(cartKey);
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    } else {
      // Nếu không có cart cho user hiện tại, set cart rỗng
      setCart([]);
    }
  }, [session]); // Thêm session vào dependency

  // Lưu cart vào localStorage với key theo user
  useEffect(() => {
    const cartKey = session ? `cart_${session.user?.id}` : "cart_guest";
    localStorage.setItem(cartKey, JSON.stringify(cart));

    // Tính tổng tiền
    const newTotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(newTotal);
  }, [cart, session]);

  // Ham mo modal chinh sua san pham
  const handleOpenEditModal = (product: CartItem) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  // Ham dong modal chinh sua san pham
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  // Ham cap nhat san pham
  const handleUpdateProduct = (updateProduct: CartItem) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === updateProduct._id ? updateProduct : item
      )
    );
  };

  // Ham toggle dung cu cho tung san pham
  const handleToggleUtensil = (itemId: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === itemId
          ? { ...item, needUtensils: !item.needUtensils }
          : item
      )
    );
  };

  // Hàm toggle dụng cụ cho tất cả sản phẩm
  const handleToggleAllUtensils = () => {
    const newValue = !allUtensilsSelected;
    setAllUtensilsSelected(newValue);
    setCart((prev) =>
      prev.map((item) => ({ ...item, needUtensils: newValue }))
    );
  };

  // Ham them so luong san pham
  const handleIncreaseQuantity = (itemId: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Hàm giảm số lượng
  const handleDecreaseQuantity = (itemId: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const addToCart = (item: CartItem) => {
    if (!session) {
      toast.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
      return;
    }

    setCart((prev) => {
      const existing = prev.find((p) => p._id === item._id);
      if (existing) {
        return prev.map((p) =>
          p._id === item._id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });

    toast.success(`${item.name} đã được thêm vào giỏ hàng!`);
  };

  const handleDeleteItem = (itemId: string) => {
    const updateCart = cart.filter((item) => item._id !== itemId);

    // Cap nhap state trong gio hang
    setCart(updateCart);

    // Tinh tong tien lai
    const newTotal = updateCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(newTotal);

    localStorage.setItem("cart", JSON.stringify(updateCart));

    toast.success("Đã xóa sản phẩm khỏi giỏ hàng!");
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        addToCart,
        handleDeleteItem,
        totalPrice,
        allUtensilsSelected,
        isEditModalOpen,
        editingProduct,
        setEditingProduct,
        handleToggleUtensil,
        handleToggleAllUtensils,
        handleIncreaseQuantity,
        handleDecreaseQuantity,
        handleOpenEditModal,
        handleCloseEditModal,
        handleUpdateProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("Không thể sử dụng useCart bên ngoài CartProvider");
  }

  return context;
};

export default CartProvider;
