import { Navigate, Outlet } from "react-router-dom";
import "./admin.css";

export default function AdminLayout() {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={"/login"} replace={true} />;
  }
  return (
    <div className="containerr">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Admin</h2>
        </div>
        <ul className="sidebar-menu">
          <li className="sidebar-item">
            <a href="/" className="sidebar-link">
              <i className="fas fa-home"></i>
              Home
            </a>
          </li>
          <li className="sidebar-item">
            <a href="/admin/products/list" className="sidebar-link">
              <i className="fas fa-chart-line"></i>
              Dashboard
            </a>
          </li>
          <li className="sidebar-item">
            <a href="#" className="sidebar-link">
              <i className="fas fa-box"></i>
              Orders
            </a>
          </li>
          <li className="sidebar-item">
            <a href="/admin/products/list" className="sidebar-link">
              <i className="fas fa-cubes"></i>
              Products
            </a>
          </li>
        </ul>
        <div className="sidebar-footer">
          <a href="#" className="sidebar-logout">
            <i className="fas fa-sign-out-alt"></i>
            Sign Out
          </a>
        </div>
      </div>
      <div className="content">
        <Outlet /> {/* Nội dung sản phẩm sẽ hiển thị ở đây */}
      </div>
    </div>
  );
}
