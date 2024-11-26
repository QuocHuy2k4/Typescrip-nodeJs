import { AuthForm } from "../components/AuthForm";
import useAuth from "../hooks/useAuth";

export default function Register() {
  const { handleRegister } = useAuth();

  return (
    <div className="container">
      <h1 className="text-center">Register</h1>
      <AuthForm onSubmit={handleRegister} isRegister />
    </div>
  );
}
