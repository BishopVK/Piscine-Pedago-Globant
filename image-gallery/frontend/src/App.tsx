import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import LoginPage from "./pages/LoginPage";
import { AuthProvider, useAuth } from "./context/AuthContext";

function AppRouter() {
  const { isAuthenticated, isLoading } = useAuth();
  const path = window.location.pathname;

  // Mostrar loading mientras verificamos autenticación
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, mostrar página de login
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Usuario autenticado - mostrar app normal
  return (
    <>
      <Navbar />
      {path === "/favorites" ? <Favorites /> : <Home />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
