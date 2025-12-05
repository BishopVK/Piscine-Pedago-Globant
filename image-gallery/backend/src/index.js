import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3000;

app.use(cors());
app.use(express.json());

// Endpoint mínimo para que puedas comprobar que funciona
app.get("/", (req, res) => {
  res.json({ message: "Backend funcionando correctamente 🚀" });
});

app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});
