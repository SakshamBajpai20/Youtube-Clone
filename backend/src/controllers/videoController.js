import Video from "../models/Video.js";
import Channel from "../models/Channel.js";

export const createVideo = async (req, res) => {
  try {
    const { title, description, thumbnailUrl, videoUrl, category, channelId } = req.body;
    const newVideo = await Video.create({
      title, description, thumbnailUrl, videoUrl, category, uploader: req.user._id, channelId: channelId || null
    });

    if (channelId) {
      await Channel.findByIdAndUpdate(channelId, { $push: { videos: newVideo._id } });
    }

    res.status(201).json(newVideo);
  } catch (err) { res.status(500).json({ message: "Server error", error: err.message }); }
};

export const getVideos = async (req, res) => {
  try {
    const { q, category } = req.query;
    const filter = {};
    if (q) filter.title = { $regex: q, $options: "i" };
    if (category) filter.category = category;
    const videos = await Video.find(filter).populate("uploader", "username avatar").sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) { res.status(500).json({ message: "Server error", error: err.message }); }
};

export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate("uploader", "username avatar");
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.json(video);
  } catch (err) { res.status(500).json({ message: "Server error", error: err.message }); }
};

export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });
    if (String(video.uploader) !== String(req.user._id)) return res.status(403).json({ message: "Not authorized" });
    Object.assign(video, req.body);
    await video.save();
    res.json(video);
  } catch (err) { res.status(500).json({ message: "Server error", error: err.message }); }
};

export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });
    if (String(video.uploader) !== String(req.user._id)) return res.status(403).json({ message: "Not authorized" });
    await video.remove();
    res.json({ message: "Video deleted" });
  } catch (err) { res.status(500).json({ message: "Server error", error: err.message }); }
};


