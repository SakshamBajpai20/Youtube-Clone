import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ open }) {
  return (
    <aside className={`sidebar ${open ? "open" : ""}`} aria-hidden={!open}>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/trending">Trending</Link></li>
          <li><Link to="/subscriptions">Subscriptions</Link></li>
          <li className="divider" />
          <li><Link to="/category/music">Music</Link></li>
          <li><Link to="/category/education">Education</Link></li>
          <li><Link to="/category/gaming">Gaming</Link></li>
          <li><Link to="/category/sports">Sports</Link></li>
          <li><Link to="/category/news">News</Link></li>
        </ul>
      </nav>
    </aside>
  );
}



