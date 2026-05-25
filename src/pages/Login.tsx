import LoginForm from "@/components/LoginForm";
import { NavLink } from "react-router";

export default function Login() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      {/* TÍTULO DE MARCA */}

      {/* COMPONENTE DEL FORMULARIO */}
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
