import { Link } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import { useProductCart } from "../hooks/useProductCart";
import { useState } from "react";
import { Product } from "../types/Product";

export default function Homepage() {
  const { products, loading } = useProducts();
  const { addToCart } = useProductCart();
  const [quantity] = useState<number>(1);

  const handleAddToCart = (product: Product) => {
    if (quantity <= 0) return;
    addToCart({ product, quantity });
  };

  return (
    <div className="container">
      {/* Banner Carousel */}
      <div
        id="bannerCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://img.mwc.com.vn/giay-thoi-trang?w=1920&h=0&FileInput=/Resources/Silde/2024/05/23/_1200x628.jpg"
              className="d-block w-100"
              alt="Banner 1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://adminbeauty.hvnet.vn/Upload/Files/cocoon-my-pham-thuan-chay-viet-nam.jpg?width=1170&height=450&v=15042020"
              className="d-block w-100"
              alt="Banner 2"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.mwc.com.vn/giay-thoi-trang?w=1920&h=0&FileInput=/Resources/Silde/2024/06/12/SUMMER%20COLLECTION%20(PC).jpg"
              className="d-block w-100"
              alt="Banner 3"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#bannerCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#bannerCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {/* @for track item.id - map key=product.id (index) */}
      <div className="row">
        {products.map((product, index) => (
          <div key={index} className="col mt-2">
            <div className="card" style={{ width: "18rem" }}>
              <img src={product.image} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Price: {product.price} VND</p>

                <Link
                  to={`/product/${product._id}`}
                  className="btn btn-primary"
                >
                  Detail
                </Link>
                <button
                  className="btn btn-info "
                  onClick={() => handleAddToCart(product)}
                >
                  AddToCart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
