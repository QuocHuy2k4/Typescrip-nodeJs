import { useEffect, useState } from "react";
import {
  addProduct,
  deleteProduct,
  editProductDetail,
  getAllProduct,
  getProductDetail,
} from "../services/product";
import toast from "react-hot-toast";
import { Product } from "../types/Product";
import { useNavigate, useParams } from "react-router-dom";

const useProducts = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<Product>();
  useEffect(() => {
    getAllProduct()
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((error) => toast.error("Error: " + error.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!id) return;
    getProductDetail(id)
      .then(({ data }) => setProduct(data))
      .catch((error) => toast.error("Error: " + error.message));
  }, [id]);

  const handleDeleteProduct = (id: string) => {
    if (window.confirm("Xoa that ko?")) {
      deleteProduct(id)
        .then(() => {
          toast.success(`Delete Product Id: ${id} Successfull`);
          // navigate(0);
          location.reload();
        })
        .catch((error) => toast.error("Error: " + error.message));
    }
  };

  const handleEditProduct = (values: Product) => {
    console.log(values);
    if (!id) return;
    editProductDetail(id, values)
      .then(() => {
        toast.success("Edit Success");
        nav("/admin/product/list");
      })
      .catch(() => toast.error("Error"));
  };

  const handleAddProduct = (values: Product) => {
    console.log(values);
    addProduct(values)
      .then(() => {
        toast.success("Add Product Successfull");
        nav("/admin/product/list");
      })
      .catch(() => toast.error("Error"));
  };

  return {
    products,
    loading,
    product,
    handleDeleteProduct,
    handleEditProduct,
    handleAddProduct,
  };
};

export default useProducts;
