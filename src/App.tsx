import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
