import { Router } from "express";

const router = Router();

// GET /photos
router.get("/photos", (req, res) => {
  res.send("Photos endpoint (placeholder)");
});

// GET /search
router.get("/search", (req, res) => {
  res.send("Search endpoint (placeholder)");
});

// POST /favorite
router.post("/favorite", (req, res) => {
  res.send("Favorite endpoint (placeholder)");
});

export default router;
