import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar({ cartCount, wishlistCount, setSearchTerm, toggleTheme, darkMode }) {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">🛍️ Mi Tienda</Link>

      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Buscar productos..."
          className="search-input"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="nav-links">
        <Link to="/wishlist">⭐ Wishlist ({wishlistCount})</Link>
        <Link to="/cart">🛒 Carrito ({cartCount})</Link>

        {/* Boton para cambiar tema */}
        <div className="theme-toggle" onClick={toggleTheme}>
          <div className={`toggle-circle ${darkMode ? "dark" : "light"}`}>
            {darkMode ? "🌙" : "☀️"}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
