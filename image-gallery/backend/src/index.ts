import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Cargar variables de entorno (.env)
dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3000;

// Middlewares
// Permite que el frontend (puerto 5173) llame al backend (puerto 3000).
//app.use(cors());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))

// Permite recibir datos en formato JSON
app.use(express.json());

// Ruta de prueba
app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send({
    code: 200,
    ok: true,
    service: "Backend de gestión de fotos funcionando"
  });
});

// Importar rutas
import authRoutes from "./routes/auth.ts";
import photoRoutes from "./routes/photos.ts";

// Usar rutas
app.use("/auth", authRoutes);
app.use("/", photoRoutes);

// Manejo de rutas no encontradas
app.use((req: express.Request, res: express.Response) => {
  res.status(404).send({
    code: 404,
    ok: false,
    message: "Ruta no encontrada" });
});

// Manejo de errores internos del servidor
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Error interno:", err);
  res.status(500).send({
    code: 500,
    ok: false,
    message: "Error interno del servidor",
  });
});

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`Backend listo en http://localhost:${PORT}`);
});
