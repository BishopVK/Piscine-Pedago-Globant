import dotenv from "dotenv";

// Cargar variables de entorno (.env)
dotenv.config();

const BASE_URL = "https://api.unsplash.com";

export async function getPhotos(query?: string) {
  const clientId = process.env.UNSPLASH_CLIENT_ID;
  
  const url = query
    ? `${BASE_URL}/search/photos?query=${query}&client_id=${clientId}`
    : `${BASE_URL}/photos?client_id=${clientId}`;

  const res = await fetch(url);
  return res.json();
}

  // Aquí irán las funciones para hablar con la API de Unsplash
/* export const placeholder = true; */
