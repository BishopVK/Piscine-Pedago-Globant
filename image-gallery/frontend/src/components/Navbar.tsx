import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="w-full p-4 flex justify-between items-center bg-gray-900 text-white">
      <a href="/" className="font-bold text-xl">Image Gallery</a>

      <div className="flex gap-4">
        <a href="/" className="hover:underline">Home</a>
        <a href="/favorites" className="hover:underline">Favorites</a>

        {!isAuthenticated && (
          <a
            href={`${import.meta.env.VITE_APP_BACKEND_URL}/auth/login`}
            className="bg-blue-500 px-3 py-1 rounded"
          >
            Login
          </a>
        )}
      </div>
    </nav>
  );
}
