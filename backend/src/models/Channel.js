import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  channelName: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  description: { type: String, default: "" },
  channelBanner: { type: String, default: "" },
  subscribers: { type: Number, default: 0 },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }]
}, { timestamps: true });

export default mongoose.model("Channel", channelSchema);

