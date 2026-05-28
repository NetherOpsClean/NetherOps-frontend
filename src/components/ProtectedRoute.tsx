// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  // Si no está autenticado, lo redirigimos a login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, renderizamos los componentes hijos (Outlet)
  return <Outlet />;
};
