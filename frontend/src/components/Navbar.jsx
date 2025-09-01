import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Logo = () => (
  <svg width="90" height="24" viewBox="0 0 90 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect width="24" height="24" rx="4" fill="#FF0000"/>
    <path d="M8 7L16 12L8 17V7Z" fill="white"/>
    <text x="30" y="17" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="700">YouTubeClone</text>
  </svg>
);

export default function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const goSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/?q=${encodeURIComponent(e.target.value)}`);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="menu-btn" onClick={onMenuClick} aria-label="Toggle menu">☰</button>
        <Link to="/" className="logo-link"><Logo /></Link>
      </div>

      <div className="navbar-center">
        <input className="search-input" placeholder="Search" onKeyDown={goSearch} />
        <button className="search-btn">Search</button>
      </div>

      <div className="navbar-right">
        <button className="icon-btn" title="Create">+</button>
        <button className="icon-btn" title="Notifications">🔔</button>
        <Link to="/auth" className="signin-btn">Sign in</Link>
      </div>
    </header>
  );
}




