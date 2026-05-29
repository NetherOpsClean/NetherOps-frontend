import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RoleGuard } from "./components/RoleGuard";
import Dashboard from "./pages/Dashboard";
import { Server } from "./pages/Server";
import DashboardLayout from "./pages/DahboardLayout";
import ConsolePage from "./pages/Console";
import ServersList from "./pages/ServersList";
import { UserAccess } from "./pages/UserAcces";

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
          
          {/* DashboardLayout ahora envuelve TODAS las rutas internas para que el Sidebar siempre esté visible */}
          <Route element={<DashboardLayout />}>
            
            {/* El Hub: Tu página con la cuadrícula de todos los servidores */}
            {/* Nota: Aquí pones el componente que creamos antes como ServersPage */}
            <Route path="dashboard" element={<ServersList />} /> 

            {/* Rutas de un servidor específico */}
            <Route path="servers/:id">
              <Route index element={<Server />} />
              <Route path="console" element={<ConsolePage />} />
              <Route path="log" element={<div className="text-foreground p-6">Log View</div>} />
              <Route path="players" element={<UserAccess/>} />
              <Route path="software" element={<div className="text-foreground p-6">Software View</div>} />
              <Route path="files" element={<div className="text-foreground p-6">Files View</div>} />
              <Route path="settings" element={<div className="text-foreground p-6">Settings View</div>} />
            </Route>

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
