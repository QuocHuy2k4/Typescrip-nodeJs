import { http } from "../config/axios";
import { Product } from "../types/Product";

export const getAllProduct = () => {
  return http.get("/products");
};

export const getProductDetail = (id: string) => {
  return http.get("/products/" + id);
};

export const deleteProduct = (id: string) => {
  return http.delete("/products/" + id);
};

export const addProduct = (data: Product) => {
  return http.post("/products", data);
};
export const editProductDetail = (id: string, data: Product) => {
  return http.put("/products/" + id, data);
};
