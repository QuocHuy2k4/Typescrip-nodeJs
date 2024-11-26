import { useRoutes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ClientLayout from "./layouts/ClientLayout";
import { Toaster } from "react-hot-toast";
import ProductDetail from "./pages/ProductDetail";
import AdminLayout from "./layouts/AdminLayout";
import ProductList from "./pages/admin/ProductList";
import ProductEdit from "./pages/admin/ProductsEdit";
import ProductAdd from "./pages/admin/ProductAdd";
import Cart2 from "./pages/Cart2";

function App() {
  const routeConfig = [
    {
      path: "admin",
      element: <AdminLayout />,
      children: [
        { path: "product/list", element: <ProductList /> },
        { path: "product/edit/:id", element: <ProductEdit /> },
        { path: "product/add", element: <ProductAdd /> },
      ],
    },
    {
      path: "",
      element: <ClientLayout />,
      children: [
        { path: "", element: <Homepage /> },
        { path: "about", element: <About /> },
        { path: "product/:id", element: <ProductDetail /> },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        {
          path: "cart",
          element: <Cart2 />,
        },
      ],
    },
  ];

  const routes = useRoutes(routeConfig);

  return (
    <main>
      {routes}
      <Toaster />
    </main>
  );
}

export default App;
