import express from "express";
import { addComment, getComments, editComment, deleteComment } from "../controllers/commentController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.get("/:videoId", getComments);
router.post("/", protect, addComment);
router.put("/:id", protect, editComment);
router.delete("/:id", protect, deleteComment);
export default router;

