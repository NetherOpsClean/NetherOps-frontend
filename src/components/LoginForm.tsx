// src/pages/LoginPage.tsx (o tu estructura de rutas)
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet } from "./ui/field";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { loginUser } from "@/service/AuthService";
import { useAuth } from "@/context/AuthContext";

const loginSchema = z.object({
  email: z
    .email({ message: "Must be a valid email address." })
    .min(1, { message: "Email or username is required." }),
  password: z
    .string()
    .min(1, { message: "Password is required." })
    .min(8, { message: "Password must be at least 8 characters long." }),
});

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Hook para cambiar de página
  const { login } = useAuth();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    try {
      const response = await loginUser(values);

      if (response && response.accessToken) {
        login(response.accessToken);

        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error en el login:", error);
      alert("Error al iniciar sesión. Verifica tus credenciales.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className=" font-pixelify min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <h1 className=" font-pixelify text-4xl font-bold text-primary tracking-tight mb-12 uppercase">
        NetherOps
      </h1>

      <Card className="w-full max-w-md bg-card border-border shadow-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold tracking-tight">LOG IN</CardTitle>
          <CardDescription className="text-muted-foreground">Manage your server.</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FieldSet>
              <FieldGroup className="space-y-6">
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor="email">Correo Electronico</FieldLabel>
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        autoComplete="off"
                        placeholder="eduardo20contreras@gmail.com"
                        required
                      />
                    </Field>
                  )}
                ></Controller>
                {/* CAMPO: CONTRASEÑA */}
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                      <Input
                        {...field}
                        id="password"
                        autoComplete="off"
                        type="password"
                        placeholder="*******"
                        required
                      />
                    </Field>
                  )}
                ></Controller>
              </FieldGroup>
            </FieldSet>

            {/* BOTÓN DE SUBMIT */}
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-6 text-lg uppercase tracking-wider transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  PROCESANDO...
                </>
              ) : (
                "LOG IN"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-center gap-4 border-t border-border mt-6 pt-6">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <NavLink to="/register" className="text-primary hover:underline font-medium">
              SIGN UP
            </NavLink>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
