/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>count is {count}</p>
        <br></br>
        <button onClick={() => setCount((count) => count + 1)}>
          SUMAR
        </button>
        <button onClick={() => setCount((count) => count - 1)}>
          RESTAR
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <h1 className="text-4xl text-emerald-500 font-bold mt-5">
        Tailwind v4 funcionando 🚀
      </h1>
    </>
  )
} */

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
