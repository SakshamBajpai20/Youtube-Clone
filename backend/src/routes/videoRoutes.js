import express from "express";
import { createVideo, getVideos, getVideoById, updateVideo, deleteVideo } from "../controllers/videoController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.get("/", getVideos);
router.post("/", protect, createVideo);
router.get("/:id", getVideoById);
router.put("/:id", protect, updateVideo);
router.delete("/:id", protect, deleteVideo);
export default router;

