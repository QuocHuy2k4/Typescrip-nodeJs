import { useCart } from "../contexts/cart";
import { useProductCart } from "../hooks/useProductCart";

const Cart2 = () => {
  const { cart } = useCart();
  const { removeToCart, updateQuantity } = useProductCart();

  const handleQuantityChange = (productId: string, Quantity: number) => {
    if (Quantity <= 0) return; // Ngăn không cho cập nhật số lượng âm hoặc bằng 0
    updateQuantity(productId, Quantity / Quantity); // Gọi hàm updateQuantity
  };

  return (
    <div className="container">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>img</th>
            <th>title</th>
            <th>price</th>
            <th>quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cart?.products.map((item, index) => (
            <tr key={index}>
              <td>
                <img src={item.product.image} width="50px" height="50px" />
              </td>
              <td>{item.product.title}</td>
              <td>{item.product.price.toLocaleString()}VND</td>
              <td>
                <button
                  className="quantity-btn plus"
                  onClick={() =>
                    handleQuantityChange(item.product._id, item.quantity + 1)
                  }
                >
                  +
                </button>
                {item.quantity}
                <button
                  className="quantity-btn"
                  onClick={() =>
                    handleQuantityChange(item.product._id, item.quantity - 1)
                  }
                >
                  -
                </button>
              </td>
              <td>
                {(item.product.price * item.quantity).toLocaleString()}VND
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => removeToCart(item.product._id)}
                >
                  xoa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cart2;
