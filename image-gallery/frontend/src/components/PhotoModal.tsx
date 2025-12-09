import React from 'react';

interface PhotoModalProps {
  photo: any;
  isOpen: boolean;
  onClose: () => void;
  onToggleFavorite?: (photo: any) => void;
  isFavorite?: boolean;
}

export default function PhotoModal({
  photo,
  isOpen,
  onClose,
  onToggleFavorite,
  isFavorite
}: PhotoModalProps) {
  if (!isOpen || !photo) return null;

  // Cerrar con tecla Escape
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Contenedor del modal - Se añade 'flex flex-col' para usar Flexbox verticalmente, y 'h-full' junto a 'max-h-[90vh]' para que ocupe el espacio disponible y lo limite. */}
      <div
        className="relative max-w-7xl max-h-[90vh] w-full h-full 
                   bg-gray-900 rounded-lg shadow-2xl flex flex-col" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 
                    text-white rounded-full w-10 h-10 flex items-center justify-center
                    transition-all text-xl font-bold"
          title="Close (Esc)"
        >
          ×
        </button>

        {/* Botón de favorito (si está disponible) */}
        {onToggleFavorite && (
          <button
            onClick={() => onToggleFavorite(photo)}
            className="absolute top-4 left-4 z-10 bg-black/50 hover:bg-black/70 
                      text-white rounded-full w-10 h-10 flex items-center justify-center
                      transition-all text-2xl"
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? "⭐" : "☆"}
          </button>
        )}

        {/* Área de la Imagen - Ahora usa 'flex-grow' para ocupar el espacio vertical restante 
            y 'overflow-hidden' para contener la imagen. */}
        <div className="flex grow items-center justify-center bg-black overflow-hidden">
          <img
            src={photo.urls.regular || photo.urls.small}
            alt={photo.alt_description || "Photo"}
            // Se cambia a 'max-h-full' y 'max-w-full' para asegurar que la imagen se ajuste 
            // completamente al contenedor de la imagen, sin depender de 'vh'.
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Área de Información - Se añade 'overflow-y-auto' para permitir el scroll 
            solo en esta sección si el contenido es demasiado largo. */}
        <div className="bg-gray-800 p-6 border-t border-gray-700 overflow-y-auto shrink-0">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-white text-xl font-semibold mb-2">
                {photo.alt_description || "Untitled"}
              </h3>
              
              <div className="flex items-center gap-3 text-gray-300">
                {photo.user?.profile_image?.small && (
                  <img
                    src={photo.user.profile_image.small}
                    alt={photo.user.name}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium">{photo.user?.name || "Unknown"}</p>
                  {photo.user?.username && (
                    <p className="text-sm text-gray-400">@{photo.user.username}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-2 shrink-0">
              <a
                href={photo.links?.html}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white 
                           rounded-lg font-semibold transition-all text-sm"
              >
                View on Unsplash
              </a>
              <a
                href={photo.urls?.full}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white 
                           rounded-lg font-semibold transition-all text-sm"
              >
                Download
              </a>
            </div>
          </div>

          {/* Stats */}
          {(photo.likes || photo.downloads) && (
            <div className="flex gap-6 mt-4 pt-4 border-t border-gray-700 text-sm text-gray-400">
              {photo.likes !== undefined && (
                <div className="flex items-center gap-2">
                  <span>❤️</span>
                  <span>{photo.likes.toLocaleString()} likes</span>
                </div>
              )}
              {photo.downloads !== undefined && (
                <div className="flex items-center gap-2">
                  <span>📥</span>
                  <span>{photo.downloads.toLocaleString()} downloads</span>
                </div>
              )}
              {photo.views !== undefined && (
                <div className="flex items-center gap-2">
                  <span>👁️</span>
                  <span>{photo.views.toLocaleString()} views</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}