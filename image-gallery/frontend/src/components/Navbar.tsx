import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const currentPath = window.location.pathname;

  return (
    <nav className="w-full bg-gray-800 border-b border-gray-700 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a 
            href="/" 
            className="font-bold text-xl text-white hover:text-blue-400 transition-colors"
          >
            📸 Image Gallery
          </a>

          {/* Navigation Links */}
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="/"
              className={`px-3 py-2 rounded-lg transition-colors font-medium
                ${currentPath === "/" 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
            >
              Home
            </a>

            <a
              href="/favorites"
              className={`px-3 py-2 rounded-lg transition-colors font-medium
                ${currentPath === "/favorites" 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
            >
              ⭐ Favorites
            </a>

            {!isAuthenticated && (
              <a
                href={`${import.meta.env.VITE_APP_BACKEND_URL}/auth/login`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 
                         rounded-lg font-semibold transition-all hidden sm:block"
              >
                Login
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}