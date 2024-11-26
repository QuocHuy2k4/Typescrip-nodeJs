import { useNavigate } from "react-router-dom";
import { loginUser, registerUser, User } from "../services/auth";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useProductCart } from "./useProductCart";

const useAuth = () => {
  const nav = useNavigate();
  const { getCartUser } = useProductCart();

  const handleLogin: SubmitHandler<User> = (values) => {
    loginUser(values)
      .then(({ data }) => {
        toast.success("Ok Minh dang nhap dc roi Yeah !");
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user)); //~
        getCartUser();
        nav("/");
      })
      .catch((error) => {
        toast.error("Error: " + error.message);
      });
  };

  const handleRegister: SubmitHandler<User> = (values) => {
    registerUser(values)
      .then(() => {
        toast.success("Ok Minh dang ky dc roi Yeah !");
        nav("/login");
      })
      .catch((error) => {
        toast.error("Error: " + error.message);
      });
  };

  return { handleLogin, handleRegister };
};

export default useAuth;
