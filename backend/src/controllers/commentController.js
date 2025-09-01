import Comment from "../models/Comment.js";

export const addComment = async (req, res) => {
  try {
    const { videoId, text } = req.body;
    if (!text) return res.status(400).json({ message: "Text required" });
    const comment = await Comment.create({ video: videoId, user: req.user._id, text });
    res.status(201).json(await comment.populate("user", "username avatar"));
  } catch (err) { res.status(500).json({ message: "Server error", error: err.message }); }
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ video: req.params.videoId }).populate("user", "username avatar").sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) { res.status(500).json({ message: "Server error", error: err.message }); }
};

export const editComment = async (req, res) => {
  try {
    const c = await Comment.findById(req.params.id);
    if (!c) return res.status(404).json({ message: "Not found" });
    if (String(c.user) !== String(req.user._id)) return res.status(403).json({ message: "Not authorized" });
    c.text = req.body.text ?? c.text;
    await c.save();
    res.json(c);
  } catch (err) { res.status(500).json({ message: "Server error", error: err.message }); }
};

export const deleteComment = async (req, res) => {
  try {
    const c = await Comment.findById(req.params.id);
    if (!c) return res.status(404).json({ message: "Not found" });
    if (String(c.user) !== String(req.user._id)) return res.status(403).json({ message: "Not authorized" });
    await c.remove();
    res.json({ message: "Deleted" });
  } catch (err) { res.status(500).json({ message: "Server error", error: err.message }); }
};


