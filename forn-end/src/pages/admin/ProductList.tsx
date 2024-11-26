import { Link } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
// import { useNavigate } from "react-router-dom";

export default function ProductList() {
  //   const navigate = useNavigate();

  const { products, loading } = useProducts();

  const { handleDeleteProduct } = useProducts();
  return (
    <div className="container">
      <h1>Admin </h1>
      <Link to="/admin/product/add">
        <button className="btn btn-primary">Add Product</button>
      </Link>
      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Image</th>
            <th scope="col">Desc</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <th scope="row">{product._id}</th>
              <td>{product.title}</td>
              <td>{product.price} VND</td>
              <td>
                <img src={product.image} alt="" width={80} />
              </td>
              <td>{product.description}</td>
              <td>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
                <Link to={`/admin/product/edit/${product._id}`}>
                  <button className="btn btn-info">Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
