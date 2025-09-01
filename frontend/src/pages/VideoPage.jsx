import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../services/api";


export default function VideoPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await API.get(`/videos/${id}`);
        setVideo(res.data);
        const cRes = await API.get(`/comments/${id}`);
        setComments(cRes.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  const postComment = async () => {
    if (!text.trim()) return;
    try {
      await API.post("/comments", { videoId: id, text });
      setText("");
      const cRes = await API.get(`/comments/${id}`);
      setComments(cRes.data);
    } catch (err) { console.error(err); }
  };

  if (!video) return <div className="loading">Loading...</div>;

  return (
    <div className="video-page">
      <div className="video-left">
        <div className="player-wrap">
          <video src={video.videoUrl} controls poster={video.thumbnailUrl} className="player" />
        </div>

        <h1 className="vp-title">{video.title}</h1>
        <div className="vp-meta">{video.views} views • {new Date(video.createdAt).toLocaleDateString()}</div>

        <div className="vp-actions">
          <button className="action-btn">Like • {video.likes}</button>
          <button className="action-btn">Dislike • {video.dislikes}</button>
          <button className="action-btn">Share</button>
        </div>

        <div className="vp-desc">
          <strong>{video.uploader?.username}</strong>
          <p>{video.description}</p>
        </div>

        <div className="comments">
          <h3>{comments.length} Comments</h3>
          <div className="add-comment">
            <input value={text} onChange={(e)=>setText(e.target.value)} placeholder="Add a public comment..." />
            <button onClick={postComment}>Comment</button>
          </div>
          <div className="comments-list">
            {comments.map(c => (
              <div key={c._id} className="comment">
                <div className="c-author">{c.user?.username || "User"}</div>
                <div className="c-text">{c.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <aside className="video-right">
        <h4>Up next</h4>
        {/* Could request related videos; for now we list latest */}
      </aside>
    </div>
  );
}





