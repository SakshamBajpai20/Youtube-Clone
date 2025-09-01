import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Channel from "./models/Channel.js";
import Video from "./models/Video.js";

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // clear old data
    await User.deleteMany();
    await Channel.deleteMany();
    await Video.deleteMany();

    // create user
    const user = await User.create({
      username: "testuser",
      email: "test@example.com",
      password: "123456" // hash later in model pre-save
    });

    // create channel
    const channel = await Channel.create({
      name: "Demo Channel",
      description: "This is a seeded demo channel",
      user: user._id
    });

    // create videos
    await Video.insertMany([
      {
        title: "React Tutorial",
        description: "Learn React step by step",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        thumbnailUrl: "https://i.ytimg.com/vi/w7ejDZ8SWv8/maxresdefault.jpg",
        channel: channel._id
      },
      {
        title: "Node.js Basics",
        description: "Introduction to Node.js",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        thumbnailUrl: "https://i.ytimg.com/vi/TlB_eWDSMt4/maxresdefault.jpg",
        channel: channel._id
      }
    ]);

    console.log("✅ Database seeded successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
