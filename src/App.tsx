import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RoleGuard } from "./components/RoleGuard";
import Dashboard from "./pages/Dashboard";
import { Server } from "./pages/Server";
import DashboardLayout from "./pages/DahboardLayout";

function App() {
  return (
  <Routes>
      <Route path="/">
        {/* === RUTAS PÚBLICAS === */}
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* === RUTAS PROTEGIDAS (Usuarios logueados) === */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="servers/:id" element={<DashboardLayout />}>
            <Route index element={<Server />} />
            <Route path="console" element={<div className="text-white">Console View</div>} />
            <Route path="log" element={<div className="text-white">Log View</div>} />
            <Route path="players" element={<div className="text-white">Players View</div>} />
            <Route path="software" element={<div className="text-white">Software View</div>} />
            <Route path="files" element={<div className="text-white">Files View</div>} />
            <Route path="settings" element={<div className="text-white">Settings View</div>} />
          </Route>

        </Route>

        {/* === RUTAS ADMINISTRADOR === */}
        <Route element={<RoleGuard allowedRoles={["ADMIN"]} />}>
          {/* Aquí irán en el futuro las vistas globales de NetherOps (ver todos los nodos, etc.) */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
