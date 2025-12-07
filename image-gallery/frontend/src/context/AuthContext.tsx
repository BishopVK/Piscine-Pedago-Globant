import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Detectar si backend ha puesto la cookie access_token
    fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/auth/check`, {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) setIsAuthenticated(true);
      })
      .catch(() => {});
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
