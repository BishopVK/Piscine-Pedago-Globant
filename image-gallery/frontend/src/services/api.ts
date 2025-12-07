export const api = {
  getPhotos: async () => {
    const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/photos`, {
      credentials: "include",
    });
    return res.json();
  },

  searchPhotos: async (query: string) => {
    const res = await fetch(
      `${import.meta.env.VITE_APP_BACKEND_URL}/photos/search?query=${query}`,
      { credentials: "include" }
    );
    return res.json();
  },
};
