import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si el usuario está autenticado
    fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/auth/check`, {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const logout = async () => {
    await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isLoading,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};