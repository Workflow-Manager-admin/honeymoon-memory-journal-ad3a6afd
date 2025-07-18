import React from "react";
import "./Header.css";

// PUBLIC_INTERFACE
function Header({ onThemeToggle, theme, user, onLogout }) {
  /** Header with navigation, app branding, theme switcher, and user info */
  return (
    <header className="header">
      <div className="logo-area">
        <span className="logo-heart" aria-label="Logo" style={{ fontFamily: '-apple-system, system-ui, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif' }}>💍</span>
        <span className="honeymoon-title">Honeymoon Journal</span>
      </div>
      <nav className="nav">
        <a href="/" className="nav-item">Timeline</a>
        <a href="/gallery" className="nav-item">Gallery</a>
        <a href="/favorites" className="nav-item">Favorites</a>
        <a href="/map" className="nav-item">Map</a>
        {user ? (
          <a href="/profile" className="nav-item">Profile</a>
        ) : (
          <a href="/login" className="nav-item">Login</a>
        )}
      </nav>
      <div className="actions">
        <button className="theme-toggle" onClick={onThemeToggle} aria-label="Switch theme" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
          {theme === "light" ? "🌚" : "☀️"}
        </button>
        {user && (
          <>
            <span className="username">{user.name}</span>
            <button className="logout-btn" onClick={onLogout}>Log out</button>
          </>
        )}
      </div>
    </header>
  );
}
export default Header;
