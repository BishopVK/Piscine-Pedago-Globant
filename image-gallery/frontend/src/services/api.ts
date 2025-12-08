const API_BASE = import.meta.env.VITE_APP_BACKEND_URL;

export const api = {
  getPhotos: async () => {
    const res = await fetch(`${API_BASE}/photos`, {
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch photos: ${res.status}`);
    }

    return res.json();
  },

  searchPhotos: async (query: string) => {
    const res = await fetch(
      `${API_BASE}/photos/search?query=${encodeURIComponent(query)}`,
      { credentials: "include" }
    );

    if (!res.ok) {
      throw new Error(`Failed to search photos: ${res.status}`);
    }

    return res.json();
  },

  getPhotoById: async (id: string) => {
    const res = await fetch(`${API_BASE}/photos/${id}`, {
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch photo: ${res.status}`);
    }

    return res.json();
  },
};