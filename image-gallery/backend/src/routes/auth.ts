import { Router } from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const router = Router();

// Unsplash Route
const unsplashOauthUrl = "https://unsplash.com/oauth/authorize";
const clientId = process.env.UNSPLASH_CLIENT_ID;
const clientSecret = process.env.UNSPLASH_CLIENT_SECRET;
const redirectUri = process.env.UNSPLASH_REDIRECT_URI;
const scope = "public";

if (!clientId || !clientSecret || !redirectUri) {
  throw new Error("Faltan las variables de entorno de Unsplash.");
}

// GET /auth/login
router.get("/login", (req, res) => {
  console.log("Redirecting to Unsplash OAuth...");
  res.redirect(`${unsplashOauthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`);
});

// GET /auth/callback
router.get("/callback", async (req, res) => {
  try {
    if (req.query.error) {
      return res.status(400).send(`Error during authentication: ${req.query.error}`);
    }

    const authorizationCode = req.query.code as string;
    if (!authorizationCode) {
      return res.status(400).send("Authorization code not provided.");
    }

    // Código de autorización recibido
    console.log("Received authorization code:", authorizationCode);
    
    // Intercambiar el código de autorización por un token de acceso
    const unsplashTokenUrl = "https://unsplash.com/oauth/token";
    const response = await axios.post(unsplashTokenUrl, {
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      code: authorizationCode,
      grant_type: "authorization_code",
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { access_token: accessToken } = response.data;
    console.log("Received access Token:", accessToken);

    // Guardar el token de acceso en una cookie temporal (solo desarrollo)S
    res.cookie("access_token", accessToken, { httpOnly: true });

    // Redirigir al frontend después del login exitoso
    res.redirect(process.env.FRONTEND_URL || "http://localhost:5173");
  } catch (error) {
    console.error("Error during Unsplash OAuth callback:", error);
    res.status(500).send("Internal Server Error");
  }

});

export default router;
