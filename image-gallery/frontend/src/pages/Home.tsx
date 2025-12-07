import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Home() {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);

  const loadPhotos = async () => {
    const data = await api.getPhotos();
    setPhotos(data);
  };

  const search = async () => {
    if (!query.trim()) return loadPhotos();
    const data = await api.searchPhotos(query);
    setPhotos(data.results || []);
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-5xl mx-auto">

        {/* Search bar */}
        <div className="flex gap-3 mb-8">
          <input
            className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700"
            placeholder="Search photos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            onClick={search}
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {photos.map((photo: any) => (
            <img
              key={photo.id}
              src={photo.urls.small}
              className="w-full h-auto rounded-xl shadow-lg hover:scale-[1.02] transition"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
