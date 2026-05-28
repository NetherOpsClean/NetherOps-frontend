// src/components/RoleGuard.tsx
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

interface RoleGuardProps {
  allowedRoles: string[];
}

export const RoleGuard = ({ allowedRoles }: RoleGuardProps) => {
  const { isAuthenticated, role } = useAuth();

  // Si no está autenticado en absoluto, va directo al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado pero su rol no tiene permisos para esta ruta
  if (role && !allowedRoles.includes(role)) {
    // Lo mandamos al dashboard general
    return <Navigate to="/dashboard" replace />;
  }

  // Si tiene el rol correcto, se le permite ver la pantalla (Outlet)
  return <Outlet />;
};
