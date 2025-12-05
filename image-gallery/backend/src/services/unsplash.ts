const BASE_URL = "https://api.unsplash.com";

export async function getPhotos(query?: string) {
  const url = query
    ? `${BASE_URL}/search/photos?query=${query}&client_id=${import.meta.env.VITE_UNSPLASH_CLIENT_ID}`
    : `${BASE_URL}/photos?client_id=${import.meta.env.VITE_UNSPLASH_CLIENT_ID}`;

  const res = await fetch(url);
  return res.json();
}