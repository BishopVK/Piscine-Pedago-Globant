export default function LoginPage() {
  const backend = import.meta.env.VITE_APP_BACKEND_URL;

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-10 rounded-xl shadow-xl text-center max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6">Login Required</h1>
        <p className="text-gray-300 mb-6">
          You must log in with your Unsplash account to continue.
        </p>

        <a
          href={`${backend}/auth/login`}
          className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 inline-block"
        >
          Login with Unsplash
        </a>
      </div>
    </div>
  );
}
