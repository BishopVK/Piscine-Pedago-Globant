import { useEffect, useState } from "react";
import { api } from "../services/api";
import PhotoModal from "../components/PhotoModal";

export default function Home() {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cargar favoritos del localStorage
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

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

  const toggleFavorite = (photo: any) => {
    const photoId = photo.id;
    let updatedFavorites: string[];
    let updatedFavoritesData: any[];

    if (favorites.includes(photoId)) {
      // Remover de favoritos
      updatedFavorites = favorites.filter(id => id !== photoId);
      const savedPhotos = JSON.parse(localStorage.getItem("favoritesData") || "[]");
      updatedFavoritesData = savedPhotos.filter((p: any) => p.id !== photoId);
    } else {
      // Añadir a favoritos
      updatedFavorites = [...favorites, photoId];
      const savedPhotos = JSON.parse(localStorage.getItem("favoritesData") || "[]");
      updatedFavoritesData = [...savedPhotos, photo];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    localStorage.setItem("favoritesData", JSON.stringify(updatedFavoritesData));
  };

  const isFavorite = (photoId: string) => favorites.includes(photoId);

  const openPhotoModal = (photo: any) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const closePhotoModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white">
      {/* Search Section */}
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
              onKeyDown={(e) => e.key === "Enter" && search()}
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

      {/* Photo Grid */}
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {photos.map((photo: any) => (
              <div
                key={photo.id}
                className="relative group overflow-hidden rounded-lg shadow-lg 
                         hover:shadow-2xl transition-all duration-300 
                         hover:scale-[1.02] cursor-pointer bg-gray-800"
                onClick={() => openPhotoModal(photo)}
              >
                {/* Imagen */}
                <div className="w-full pb-[100%] relative">
                  <img
                    src={photo.urls.small}
                    alt={photo.alt_description || "Unsplash photo"}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                
                {/* Overlay con información y botón de favorito */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 
                              transition-all duration-300 flex flex-col justify-between p-3">
                  {/* Botón de favorito en la esquina superior derecha */}
                  <div className="flex justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(photo);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300
                               bg-black/50 hover:bg-black/70 rounded-full p-2
                               text-2xl leading-none"
                      title={isFavorite(photo.id) ? "Remove from favorites" : "Add to favorites"}
                    >
                      {isFavorite(photo.id) ? "⭐" : "☆"}
                    </button>
                  </div>

                  {/* Información del autor - OCULTO por defecto */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white font-semibold text-sm truncate">
                      {photo.user?.name || "Unknown"}
                    </p>
                    {photo.alt_description && (
                      <p className="text-gray-300 text-xs truncate mt-1">
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

      {/* Modal para ver foto en grande */}
      <PhotoModal
        photo={selectedPhoto}
        isOpen={isModalOpen}
        onClose={closePhotoModal}
        onToggleFavorite={toggleFavorite}
        isFavorite={selectedPhoto ? isFavorite(selectedPhoto.id) : false}
      />
    </div>
  );
}