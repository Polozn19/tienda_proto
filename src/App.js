import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";

function App() {
  // 📦 Estado del carrito (persistente en localStorage)
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // ⭐ Estado de la wishlist (persistente en localStorage)
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // 🔍 Estado del buscador
  const [searchTerm, setSearchTerm] = useState("");

  // Guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Guardar wishlist en localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // ➕ Agregar producto al carrito
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // ➖ Disminuir cantidad
  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ❌ Eliminar producto del carrito
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // 🗑 Vaciar carrito
  const clearCart = () => {
    setCart([]);
  };

  // ⭐ Agregar / quitar de wishlist
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id); // quitar
      }
      return [...prev, product]; // agregar
    });
  };

  return (
    <Router>
      <Navbar
        cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlist.length}
        setSearchTerm={setSearchTerm}
      />
      <Routes>
        <Route
          path="/"
          element={
            <ProductList
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              wishlist={wishlist}
              searchTerm={searchTerm}
            />
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
  );
}

export default App;
