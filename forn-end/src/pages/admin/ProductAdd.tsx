import { ProductForm } from "../../components/ProductForm";
import useProducts from "../../hooks/useProducts";

export default function ProductAdd() {
  const { handleAddProduct } = useProducts();

  return (
    <div className="container">
      <h1>Product Add</h1>
      <ProductForm onSubmit={handleAddProduct} />
    </div>
  );
}
