import React from "react";
import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
  return (
    <article className="video-card">
      <Link to={`/video/${video._id}`} className="thumb-link">
        <img src={video.thumbnailUrl || "/placeholder-16-9.png"} alt={video.title} className="thumb" />
      </Link>
      <div className="video-meta">
        <h3 className="video-title"><Link to={`/video/${video._id}`}>{video.title}</Link></h3>
        <div className="video-sub">{video.uploader?.username || "Unknown"} • {video.views} views</div>
      </div>
    </article>
  );
}



