import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RoleGuard } from "./components/RoleGuard";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/">
        {/* === RUTAS PÚBLICAS === */}
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* === RUTAS PROTEGIDAS === */}

        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        {/* === RUTAS ADMINISTRADOR === */}
        <Route element={<RoleGuard allowedRoles={["ADMIN"]} />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
