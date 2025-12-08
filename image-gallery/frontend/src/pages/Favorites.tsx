import { useEffect, useState } from "react";

export default function Favorites() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favs") || "[]");
    setPhotos(favs);
  }, []);

  const removeFavorite = (id: string) => {
    const updated = photos.filter((p: any) => p.id !== id);
    setPhotos(updated);
    localStorage.setItem("favs", JSON.stringify(updated));
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="w-full bg-gray-800 border-b border-gray-700 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">⭐ Your Favorites</h1>
          <p className="text-gray-400 mt-2">
            {photos.length === 0 
              ? "You haven't added any favorites yet" 
              : `${photos.length} photo${photos.length !== 1 ? 's' : ''} saved`
            }
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-4 py-6">
        {photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96">
            <div className="text-6xl mb-4">📷</div>
            <p className="text-gray-400 text-lg mb-2">No favorites yet</p>
            <p className="text-gray-500 text-sm mb-6">
              Start adding photos to your collection
            </p>
            <a
              href="/"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg 
                       font-semibold transition-all"
            >
              Browse Photos
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {photos.map((photo: any) => (
              <div
                key={photo.id}
                className="relative group overflow-hidden rounded-lg shadow-lg 
                         hover:shadow-2xl transition-all duration-300 bg-gray-800"
                style={{ aspectRatio: '1/1' }}
              >
                <img
                  src={photo.urls.small}
                  alt={photo.alt_description || "Favorite photo"}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Overlay con botón de eliminar */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 
                              transition-all duration-300 flex items-center justify-center">
                  <button
                    onClick={() => removeFavorite(photo.id)}
                    className="transform scale-0 group-hover:scale-100 
                             transition-transform duration-300
                             bg-red-600 hover:bg-red-700 text-white px-4 py-2 
                             rounded-lg font-semibold"
                  >
                    Remove
                  </button>
                </div>

                {/* Info del autor */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t 
                              from-black to-transparent p-3">
                  <p className="text-white text-sm font-semibold truncate">
                    {photo.user?.name || "Unknown"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}