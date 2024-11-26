import { Product } from "../types/Product";
import { useCart } from "../contexts/cart";
import { useUser } from "../contexts/user";
import { http } from "../config/axios";
import toast from "react-hot-toast";

type AddToCart = {
  product: Product;
  quantity: number;
};

export const useProductCart = () => {
  const { user, setUser } = useUser();
  const { cart, setCart } = useCart();

  const getCartUser = async () => {
    const userStorage = localStorage.getItem("user") || "{}";
    const user = JSON.parse(userStorage);
    setUser(user);
    if (!user._id) return;
    const { data } = await http.get(`/carts/user/${user._id}`);

    setCart(data);
  };

  const addToCart = async ({ product, quantity }: AddToCart) => {
    if (quantity <= 0 || !user) return toast("not User or quantity > 0");
    try {
      if (cart) {
        await http.put(`/carts/${cart._id}`, {
          product,
          quantity,
          user: user._id,
        });
        toast.success("AddToCart thành công");
      } else {
        await http.post("/carts", {
          product,
          quantity,
          user: user._id,
        });
        toast.success("AddToCart thành công");
      }
      const { data } = await http.get(`/carts/user/${user._id}`);
      setCart(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0 || !user || !cart) return; // Kiểm tra điều kiện hợp lệ
    try {
      await http.put(`/carts/${cart._id}`, {
        product: { _id: productId }, // Cần cấu trúc lại để phù hợp với API
        quantity,
        user: user._id,
      });
      const { data } = await http.get(`/carts/user/${user._id}`);
      setCart(data); // Cập nhật giỏ hàng mới
    } catch (error) {
      console.log(error);
    }
  };

  const removeToCart = async (productId: string) => {
    if (!user) return;
    if (window.confirm("Remove Item Cart")) {
      try {
        await http.delete(`/carts/user/${user._id}/product/${productId}`);
        getCartUser();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return { addToCart, removeToCart, getCartUser, updateQuantity };
};
