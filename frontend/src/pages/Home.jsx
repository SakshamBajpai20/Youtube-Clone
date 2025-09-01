import React, { useEffect, useState } from "react";
import API from "../services/api";
import VideoCard from "../components/VideoCard";
import { useSearchParams } from "react-router-dom";

const FILTERS = ["All", "Music", "Education", "Gaming", "Sports", "News"];

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [category, setCategory] = useState("");
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  useEffect(() => {
    fetchVideos();
  }, [category, q]);

  const fetchVideos = async () => {
    try {
      const res = await API.get("/videos", { params: { q, category } });
      setVideos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="home">
      <div className="filters">
        {FILTERS.map(f => (
          <button key={f} className={`filter-btn ${f === (category || "All") ? "active" : ""}`} onClick={() => setCategory(f === "All" ? "" : f)}>
            {f}
          </button>
        ))}
      </div>

      <section className="grid">
        {videos.map(v => <VideoCard key={v._id} video={v} />)}
      </section>
    </div>
  );
}







