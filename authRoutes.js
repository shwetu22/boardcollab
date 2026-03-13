import express from "express";

const router = express.Router();

// test route
router.get("/test", (req, res) => {
  res.json({ message: "Auth route working" });
});

export default router;