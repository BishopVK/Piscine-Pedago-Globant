import { useEffect, useState } from "react";
import PhotoModal from "../components/PhotoModal";

export default function Favorites() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Cargar favoritos del localStorage
    const savedPhotos = localStorage.getItem("favoritesData");
    if (savedPhotos) {
      setPhotos(JSON.parse(savedPhotos));
    }
  }, []);

  const removeFavorite = (id: string) => {
    // Actualizar lista de fotos
    const updatedPhotos = photos.filter((p) => p.id !== id);
    setPhotos(updatedPhotos);
    
    // Actualizar localStorage
    localStorage.setItem("favoritesData", JSON.stringify(updatedPhotos));
    
    // Actualizar lista de IDs de favoritos
    const favoriteIds = updatedPhotos.map(p => p.id);
    localStorage.setItem("favorites", JSON.stringify(favoriteIds));

    // Cerrar modal si estamos viendo la foto que se eliminó
    if (selectedPhoto?.id === id) {
      closePhotoModal();
    }
  };

  const openPhotoModal = (photo: any) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const closePhotoModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {photos.map((photo: any) => (
              <div
                key={photo.id}
                className="relative group overflow-hidden rounded-lg shadow-lg 
                         hover:shadow-2xl transition-all duration-300 bg-gray-800
                         cursor-pointer"
                onClick={() => openPhotoModal(photo)}
              >
                {/* Imagen con aspect ratio cuadrado */}
                <div className="w-full pb-[100%] relative">
                  <img
                    src={photo.urls.small}
                    alt={photo.alt_description || "Favorite photo"}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Overlay con botón de eliminar */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 
                              transition-all duration-300 flex items-center justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFavorite(photo.id);
                    }}
                    className="transform scale-0 group-hover:scale-100 
                             transition-transform duration-300
                             bg-red-600 hover:bg-red-700 text-white px-4 py-2 
                             rounded-lg font-semibold"
                  >
                    Remove
                  </button>
                </div>

                {/* Info del autor en la parte inferior - OCULTO por defecto */}
                <div className="absolute bottom-0 left-0 right-0 
                              bg-linear-to-t from-black/80 to-transparent p-3
                              pointer-events-none opacity-0 group-hover:opacity-100
                              transition-opacity duration-300">
                  <p className="text-white text-sm font-semibold truncate">
                    {photo.user?.name || "Unknown"}
                  </p>
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
        onToggleFavorite={(photo) => removeFavorite(photo.id)}
        isFavorite={true}
      />
    </div>
  );
}