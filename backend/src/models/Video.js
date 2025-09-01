import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  thumbnailUrl: { type: String, default: "" },
  videoUrl: { type: String, default: "" },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  channelId: { type: mongoose.Schema.Types.ObjectId, ref: "Channel" },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  category: { type: String, default: "General" }
}, { timestamps: true });

export default mongoose.model("Video", videoSchema);

