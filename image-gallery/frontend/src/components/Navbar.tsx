import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const currentPath = window.location.pathname;
  const { logout } = useAuth();

  return (
    <nav className="w-full bg-gray-800 border-b border-gray-700 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 my-4">
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
              <svg width="24" height="24px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.07926 0.222253C7.31275 -0.007434 7.6873 -0.007434 7.92079 0.222253L14.6708 6.86227C14.907 7.09465 14.9101 7.47453 14.6778 7.71076C14.4454 7.947 14.0655 7.95012 13.8293 7.71773L13 6.90201V12.5C13 12.7761 12.7762 13 12.5 13H2.50002C2.22388 13 2.00002 12.7761 2.00002 12.5V6.90201L1.17079 7.71773C0.934558 7.95012 0.554672 7.947 0.32229 7.71076C0.0899079 7.47453 0.0930283 7.09465 0.32926 6.86227L7.07926 0.222253ZM7.50002 1.49163L12 5.91831V12H10V8.49999C10 8.22385 9.77617 7.99999 9.50002 7.99999H6.50002C6.22388 7.99999 6.00002 8.22385 6.00002 8.49999V12H3.00002V5.91831L7.50002 1.49163ZM7.00002 12H9.00002V8.99999H7.00002V12Z"
                  fill="#fff"
                />
              </svg>
            </a>

            <a
              href="/favorites"
              className={`px-3 py-2 rounded-lg transition-colors font-medium
                ${currentPath === "/favorites" 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
            >
              <svg fill="#fff" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22,9.67A1,1,0,0,0,21.14,9l-5.69-.83L12.9,3a1,1,0,0,0-1.8,0L8.55,8.16,2.86,9a1,1,0,0,0-.81.68,1,1,0,0,0,.25,1l4.13,4-1,5.68a1,1,0,0,0,.4,1,1,1,0,0,0,1.05.07L12,18.76l5.1,2.68a.93.93,0,0,0,.46.12,1,1,0,0,0,.59-.19,1,1,0,0,0,.4-1l-1-5.68,4.13-4A1,1,0,0,0,22,9.67Zm-6.15,4a1,1,0,0,0-.29.89l.72,4.19-3.76-2a1,1,0,0,0-.94,0l-3.76,2,.72-4.19a1,1,0,0,0-.29-.89l-3-3,4.21-.61a1,1,0,0,0,.76-.55L12,5.7l1.88,3.82a1,1,0,0,0,.76.55l4.21.61Z"/></svg>
            </a>

            {/* {!isAuthenticated && (
              <a
                href={`${import.meta.env.VITE_APP_BACKEND_URL}/auth/login`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 
                         rounded-lg font-semibold transition-all hidden sm:block"
              >
                Login
              </a>
            )} */}

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-all duration-300 ease-in-out"
            >
              <svg width="24px" height="24px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" fill="white" fill-opacity="0.01"/>
                <path d="M23.9917 6L6 6L6 42H24" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M33 33L42 24L33 15" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 23.9917H42" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}