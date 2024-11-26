import { ProductForm } from "../../components/ProductForm";

import useProducts from "../../hooks/useProducts";

export default function ProductEdit() {
  const { handleEditProduct } = useProducts();

  return (
    <div className="container">
      <h1>Product Edit</h1>
      <ProductForm onSubmit={handleEditProduct} />
    </div>
  );
}
