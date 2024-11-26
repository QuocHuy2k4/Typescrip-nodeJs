import { AuthForm } from "../components/AuthForm";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const { handleLogin } = useAuth();

  return (
    <div className="container">
      <h1 className="text-center">Login</h1>
      <AuthForm onSubmit={handleLogin} />
    </div>
  );
}
