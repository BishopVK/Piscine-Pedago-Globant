import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Cargar variables de entorno (.env)
dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3000;

// Middlewares
// Permite que el frontend (puerto 5173) llame al backend (puerto 3000).
app.use(cors());

// Permite recibir datos en formato JSON
app.use(express.json());

// Importar rutas
import authRoutes from "./routes/auth.ts"; // Hay que poner la extensión .js auqnque el archivo sea .ts porque ts-node lo compila a .js
import photoRoutes from "./routes/photos.ts";

// Usar rutas
app.use("/auth", authRoutes);
app.use("/", photoRoutes);

/* app.get("/", (req, res) => {
  res.send("Conexión exitosa al backend");
}); */

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`Backend listo en http://localhost:${PORT}`);
});
