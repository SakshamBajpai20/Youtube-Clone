import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../src/models/User.js";
import Channel from "../src/models/Channel.js";
import Video from "../src/models/Video.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/youtube_clone";

const sampleVideos = [
  {
    title: "Learn React in 30 Minutes",
    description: "Quick React tutorial covering fundamentals.",
    thumbnailUrl: "https://i.ytimg.com/vi/Ke90Tje7VS0/hqdefault.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    category: "Education",
    views: 15200
  },
  {
    title: "JavaScript Basics Explained",
    description: "Essential JS concepts every dev should know.",
    thumbnailUrl: "https://i.ytimg.com/vi/hdI2bqOjy3c/hqdefault.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    category: "Education",
    views: 89000
  },
  {
    title: "Top 10 Coding Tips",
    description: "Practical tips to improve your coding.",
    thumbnailUrl: "https://via.placeholder.com/320x180.png?text=Coding+Tips",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    category: "Education",
    views: 40230
  },
  {
    title: "Music Mix 2024",
    description: "A curated mix of modern tracks.",
    thumbnailUrl: "https://via.placeholder.com/320x180.png?text=Music+Mix",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    category: "Music",
    views: 250000
  }
];

const run = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to DB for seeding");

    // clean
    await User.deleteMany({});
    await Channel.deleteMany({});
    await Video.deleteMany({});

    // create a demo user
    const password = await bcrypt.hash("password123", 10);
    const user = await User.create({
      username: "demoUser",
      email: "demo@example.com",
      password
    });

    const channel = await Channel.create({
      channelName: "Demo Channel",
      owner: user._id,
      description: "Demo videos",
      channelBanner: ""
    });

    // add videos
    for (const v of sampleVideos) {
      const vid = await Video.create({
        ...v,
        uploader: user._id,
        channelId: channel._id
      });
      channel.videos.push(vid._id);
    }
    await channel.save();

    console.log("Seeding finished");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
