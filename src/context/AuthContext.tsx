// AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

// Crea el contexto
const AuthContext = createContext<{
  user: any; // Cambia el tipo según tu implementación de usuario
  login: (token: string) => void;
  logout: () => void;
}>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);
// Proveedor del contexto
export function AuthProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<any>(null); // Cambia el tipo según tu implementación de usuario

  // Verifica si existe un token guardado (puedes usar cookies o localStorage)
  useEffect(() => {
    const token = localStorage.getItem("accessToken"); // Cambia esto según tu implementación
    if (token) {
      // Si hay un token, establece al usuario como autenticado
      setUser({ token });
    }
  }, []);

  const login = (token: string) => {
    // Guarda el token en localStorage o en una cookie
    localStorage.setItem("accessToken", token);
    setUser({ token });
  };

  const logout = () => {
    // Elimina el token al cerrar sesión
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
