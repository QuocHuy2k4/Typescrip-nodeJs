import { Box, Badge, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useCart } from "../contexts/cart";
import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "./Header.css"; // Import file CSS

export function Header() {
  const users = JSON.parse(localStorage.getItem("user")!);
  const navigate = useNavigate();

  const logout = () => {
    if (confirm("Are you sure?")) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/");
      window.location.reload(); // Tải lại trang sau khi đăng xuất
    }
  };

  const { cart } = useCart();

  const cartQuantity = useMemo(
    () =>
      cart
        ? cart.products.reduce((total, { quantity }) => total + quantity, 0)
        : 0,
    [cart]
  );

  return (
    <nav className="navbar">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/admin/product/list" className="nav-link">
            Admin
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
          {users ? (
            <button onClick={logout} className="logout-button">
              {users?.user?.email} Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </Box>

        <Box display="flex" alignItems="center">
          <IconButton className="search-icon">
            <SearchIcon />
          </IconButton>
          <Link to="/cart">
            <Badge badgeContent={cartQuantity} color="secondary">
              <FontAwesomeIcon icon={faCartShopping} />
            </Badge>
          </Link>
        </Box>
      </Box>
    </nav>
  );
}
