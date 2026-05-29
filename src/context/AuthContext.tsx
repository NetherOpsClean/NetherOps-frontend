import { createContext, useContext, useState, type ReactNode } from "react";

export interface User {
  id: string;      
  email: string;   
  role: string;
  name: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  role: string | null;
  user: User | null; // <-- ¡Añadimos el usuario aquí!
  login: (token: string) => void;
  logout: () => void;
}

// Función mejorada para extraer todo el usuario del token
const getUserFromToken = (token: string): User | null => {
  try {
    const base64Url = token.split(".")[1]; 
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    const payload = JSON.parse(jsonPayload);
    
    // En NestJS, el ID suele venir en 'sub' (subject) o 'id'
    return {
      id: payload.sub || payload.id,
      email: payload.email || "",
      role: payload.role || "USER",
      name: payload.name || "Admin" 
    };
  } catch (error) {
    return null;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  
  // Guardamos el usuario completo en lugar de solo el rol
  const [user, setUser] = useState<User | null>(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken ? getUserFromToken(savedToken) : null;
  });

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);

    const decodedUser = getUserFromToken(newToken);
    setUser(decodedUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    // Ahora pasamos el objeto 'user' en el Provider y derivamos el rol de ahí
    <AuthContext.Provider value={{ 
      isAuthenticated: !!token, 
      role: user?.role || null, 
      user, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};