import RegisterForm from "@/components/RegisterForm";

export default function Register() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      {/* TÍTULO DE MARCA */}

      {/* COMPONENTE DEL FORMULARIO */}
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  );
}
