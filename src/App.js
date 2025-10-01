import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import ProductList from "./components/ProductList";
import BannerHero from "./components/BannerHero";
import SupportChat from "./components/SupportChat";

import "./styles/App.css";

function App() {
  // 📦 Carrito persistente
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // ⭐ Wishlist persistente
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // 🔍 Búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // 🌙 Modo oscuro persistente
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // ✅ Guardar cambios en localStorage cuando cambie el estado
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // 🌙 Cambiar tema
  const toggleTheme = () => setDarkMode(!darkMode);

  // ➕ Agregar producto al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        if (existing.quantity < product.stock) {
          return prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return prevCart; // no excede stock
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // ➖ Disminuir cantidad
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ❌ Eliminar producto del carrito
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // 🗑️ Vaciar carrito
  const clearCart = () => setCart([]);

  // ⭐ Toggle wishlist
  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.find((p) => p.id === product.id);
      if (exists) {
        return prevWishlist.filter((p) => p.id !== product.id);
      }
      return [...prevWishlist, product];
    });
  };

  return (
    <>
      <SupportChat />
      <div className={darkMode ? "app dark-mode" : "app"}>
        <Router>
          {/* Barra superior */}
          <Navbar
            cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
            wishlistCount={wishlist.length}
            setSearchTerm={setSearchTerm}
            toggleTheme={toggleTheme}
            darkMode={darkMode}
          />

          {/* Rutas */}
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <BannerHero />
                  <ProductList
                    addToCart={addToCart}
                    toggleWishlist={toggleWishlist}
                    wishlist={wishlist}
                    searchTerm={searchTerm}
                  />
                </>
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  addToCart={addToCart}
                  decreaseQuantity={decreaseQuantity}
                  removeFromCart={removeFromCart}
                  clearCart={clearCart}
                />
              }
            />
            <Route
              path="/wishlist"
              element={
                <Wishlist
                  wishlist={wishlist}
                  toggleWishlist={toggleWishlist}
                  addToCart={addToCart}
                />
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
