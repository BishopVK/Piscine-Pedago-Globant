export default function LoginPage() {
  const backend = import.meta.env.VITE_APP_BACKEND_URL;

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-10 rounded-xl shadow-xl text-center max-w-md w-full flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-blue-400">Login Required</h1>
        <p className="text-gray-300 text-balance">
          You must log in with your Unsplash account to continue.
        </p>

        <a
          href={`${backend}/auth/login`}
          className="px-6 py-3 rounded-lg font-bold bg-blue-600 hover:bg-blue-700 inline-block transition duration-300 ease-in-out hover:drop-shadow-lg"
        >
          Login with Unsplash
        </a>
      </div>
    </div>
  );
}
