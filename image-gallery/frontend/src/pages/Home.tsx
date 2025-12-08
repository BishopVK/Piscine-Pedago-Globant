import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Home() {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadPhotos = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await api.getPhotos();
      setPhotos(data);
    } catch (err) {
      setError("Error loading photos. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const search = async () => {
    if (!query.trim()) {
      return loadPhotos();
    }

    try {
      setLoading(true);
      setError("");
      const data = await api.searchPhotos(query);
      setPhotos(data.results || []);
    } catch (err) {
      setError("Error searching photos. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      search();
    }
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white">
      {/* Search Section - Fixed width container */}
      <div className="w-full bg-gray-800 border-b border-gray-700 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              className="flex-1 px-4 py-3 rounded-lg bg-gray-900 border border-gray-600 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         transition-all text-white placeholder-gray-400"
              placeholder="Search photos on Unsplash..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />

            <button
              onClick={search}
              disabled={loading}
              className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 
                       disabled:bg-gray-600 disabled:cursor-not-allowed
                       transition-all font-semibold whitespace-nowrap"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          {error && (
            <p className="text-red-400 mt-3 text-sm">{error}</p>
          )}
        </div>
      </div>

      {/* Photo Grid - Full width */}
      <div className="w-full px-4 py-6">
        {loading && photos.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : photos.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-400 text-lg">No photos found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {photos.map((photo: any) => (
              <div
                key={photo.id}
                className="relative group overflow-hidden rounded-lg shadow-lg 
                         hover:shadow-2xl transition-all duration-300 
                         hover:scale-[1.02] cursor-pointer bg-gray-800"
                style={{ aspectRatio: '1/1' }}
              >
                <img
                  src={photo.urls.small}
                  alt={photo.alt_description || "Unsplash photo"}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                
                {/* Overlay con información */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 
                              transition-all duration-300 flex items-end p-4">
                  <div className="transform translate-y-full group-hover:translate-y-0 
                                transition-transform duration-300">
                    <p className="text-white font-semibold text-sm truncate">
                      {photo.user?.name || "Unknown"}
                    </p>
                    {photo.alt_description && (
                      <p className="text-gray-300 text-xs truncate">
                        {photo.alt_description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}