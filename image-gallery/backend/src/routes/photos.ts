import axios from "axios";
import { Router } from "express";

const router = Router();

// GET / -> Obtener fotos principales
// Hacer un GET a la API de Unsplash para obtener fotos recientes o populares
router.get("/", async (req, res) => {
  try {
    const access_cookie = req.cookies.access_token;
    if (!access_cookie) {
      return res.status(401).send({
        code: 401,
        ok: false,
        message: "Access token is missing"
      });
    }

    // Hacer la solicitud a la API de Unsplash para obtener fotos
    const response = await axios.get("https://api.unsplash.com/photos", {
      params: {
        per_page: 10,
      },
      headers: {
        Authorization: `Bearer ${access_cookie}`,
      }
    });

    // Verificar si la respuesta es exitosa
    if ( response.status !== 200 ) {
      return res.status(response.status).send({
        code: response.status,
        ok: false,
        message: "Error fetching photos from Unsplash"
      });
    }

    // Enviar las fotos obtenidas al frontend
    res.json(response.data);

  } catch (error) {
    console.error("Error fetching photos from Unsplash:", error);
    res.status(500).send({
      code: 500,
      ok: false,
      message: "Error fetching photos from Unsplash"
    });
  }
});

// GET /search/photos -> Buscar fotos por palabra clave
// Permitir que el frontend busque fotos por keyword
router.get("/search", async (req, res) => {
  try {
    const query = req.query.query as string;
    if (!query) {
      return res.status(400).send({
        code: 400,
        ok: false,
        message: "Query parameter is required"
      });
    }

    const access_cookie = req.cookies.access_token;
    if (!access_cookie) {
      return res.status(401).send({
        code: 401,
        ok: false,
        message: "Access token is missing"
      });
    }

    // Hacer la solicitud a la API de Unsplash para buscar fotos
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query,
        per_page: 10,
      },
      headers: {
        Authorization: `Bearer ${access_cookie}`,
      }
    });

    // Verificar si la respuesta es exitosa
    if ( response.status !== 200 ) {
      return res.status(response.status).send({
        code: response.status,
        ok: false,
        message: "Error searching photos from Unsplash"
      });
    }

    // Enviar las fotos obtenidas al frontend
    res.json(response.data);

  } catch (error) {
    console.error("Invalid response from Unsplash:", error);
    res.status(500).send({
      code: 500,
      ok: false,
      message: "Invalid response from Unsplash"
    });
  }
});

// GET /photos/:id -> Obtener foto por ID
// Permitir que el frontend obtenga una foto específica por su ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id as string;
    if (!id) {
      return res.status(400).send({
        code: 400,
        ok: false,
        message: "ID parameter is required"
      });
    }

    const access_cookie = req.cookies.access_token;
    if (!access_cookie) {
      return res.status(401).send({
        code: 401,
        ok: false,
        message: "Access token is missing"
      });
    }

    // Hacer la solicitud a la API de Unsplash para obtener la foto por ID
    const response = await axios.get(`https://api.unsplash.com/photos/${id}`, {
      headers: {
        Authorization: `Bearer ${access_cookie}`,
      }
    });

    // Verificar si la respuesta es exitosa
    if ( response.status !== 200 ) {
      return res.status(response.status).send({
        code: response.status,
        ok: false,
        message: "Error fetching photo from Unsplash"
      });
    }

    // Enviar la foto obtenida al frontend
    res.json(response.data);

  } catch (error) {
    console.error("Error fetching photo from Unsplash:", error);
    res.status(500).send({
      code: 500,
      ok: false,
      message: "Error fetching photo from Unsplash"
    });
  }
});

// POST /favorite -> Marcar foto como favorita
// Permitir que el frontend marque una foto como favorita
/* router.post("/favorite", (req, res) => {
  res.send("Favorite endpoint (placeholder)");
}); */

export default router;
