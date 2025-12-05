import { Router } from "express";

const router = Router();

// GET /auth/login
router.get("/login", (req, res) => {
  res.send("Login endpoint (placeholder)");
});

// GET /auth/callback
router.get("/callback", (req, res) => {
  res.send("Callback endpoint (placeholder)");
});

export default router;
