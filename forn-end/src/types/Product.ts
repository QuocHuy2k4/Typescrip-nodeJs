export type Product = {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
};
export type CartItem = {
  product: Product;
  quantity: number;
};
export type Cart = {
  _id: string | null;
  user: string | null;
  products: CartItem[];
};
