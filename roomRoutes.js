import express from "express";
import Session from "../models/Session.js";

import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

// Create Room
router.post("/", authMiddleware, async (req, res) => {
  const { roomId } = req.body;

  try {
    const existing = await Session.findOne({ roomId });
    if (existing) return res.status(400).json({ message: "Room exists" });

    const session = new Session({
      roomId,
      owner: req.user.id,
      elements: [],
    });

    await session.save();
    res.json({ message: "Room created", roomId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get Room (join/fetch session)
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const room = await Session.findOne({ roomId: req.params.id });
    if (!room) return res.status(404).json({ message: "Room not found" });

    res.json(room);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;