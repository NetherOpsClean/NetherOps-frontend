import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { data, NavLink } from "react-router";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "./ui/field";
import { Checkbox } from "radix-ui";
import { Loader2, ShieldCheck } from "lucide-react";
import { Input } from "./ui/input";

const registerschema = z
  .object({
    username: z.string().min(1, { message: "username is required." }),
    email: z
      .email({ message: "Must be a valid email address." })
      .min(1, { message: "Email  is requered" }),
    password: z
      .string()
      .min(8, { message: "password must be at least 8 chaacteres long." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "The password its not the same",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const [isLoading, setIsloading] = useState(false);
  const form = useForm<z.infer<typeof registerschema>>({
    resolver: zodResolver(registerschema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerschema>) {
    setIsloading(true);
    console.log("se envio la info");
  }

  return (
    <div className="font-pixelify min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <h1 className=" font-pixelify text-4xl font-bold text-primary tracking-tight mb-12 uppercase">
        NetherOps
      </h1>

      <Card className="w-full max-w-md bg-card border-border shadow-2xl">
        <CardHeader className="space-y-1">
          {/* Usamos text-center para centrar el título y la descripción como en tu imagen */}
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Sign Up
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Create your free NetherOps account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FieldSet>
              <FieldGroup className="space-y-4">
                {/* CAMPO: USERNAME */}
                <Controller
                  name="username"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel
                        htmlFor="username"
                        
                      >
                        Username
                      </FieldLabel>
                      <div className="relative">
                        {/* Icono posicionado absolutamente a la izquierda */}

                        <Input
                          {...field}
                          id="username"
                          autoComplete="off"
                          placeholder="Enter username"
                          className="text-base bg-secondary/50" // pl-10 da espacio para el icono
                          required
                        />
                      </div>
                    </Field>
                  )}
                />

                {/* CAMPO: EMAIL ADDRESS */}
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel
                        htmlFor="email"
                        
                      >
                        Email Address
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          {...field}
                          id="email"
                          type="email"
                          autoComplete="off"
                          placeholder="you@example.com"
                          className=" text-base bg-secondary/50"
                          required
                        />
                      </div>
                    </Field>
                  )}
                />

                {/* CONTENEDOR GRID PARA LAS DOS CONTRASEÑAS */}
                <div className="grid grid-cols-2 gap-4">
                  {/* CAMPO: PASSWORD */}
                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel
                          htmlFor="password"
                          
                        >
                          Password
                        </FieldLabel>
                        <div className="relative">
                          <Input
                            {...field}
                            id="password"
                            type="password"
                            autoComplete="off"
                            placeholder="********"
                            className=" text-base bg-secondary/50"
                            required
                          />
                        </div>
                      </Field>
                    )}
                  />

                  {/* CAMPO: CONFIRM PASSWORD */}
                  <Controller
                    name="confirmPassword"
                    control={form.control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel
                          htmlFor="confirmPassword"
                          
                        >
                          Confirm Password
                        </FieldLabel>
                        <div className="relative">
                          
                          <Input
                            {...field}
                            id="confirmPassword"
                            type="password"
                            autoComplete="off"
                            placeholder="********"
                            className=" text-base bg-secondary/50"
                            required
                          />
                        </div>
                      </Field>
                    )}
                  />
                </div>
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
                "SIGN UP"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-center gap-4 border-t border-border mt-6 pt-6">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <NavLink to="/login" className="text-primary hover:underline font-medium">
              LOG IN
            </NavLink>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
