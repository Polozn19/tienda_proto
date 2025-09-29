// src/components/ProductCard.js
import React from "react";

const ProductCard = ({ product, onAddToCart }) => {
  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      // guardar en localStorage
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${product.name} agregado al carrito`);
    }
  };

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />
      <h3>{product.name}</h3>
      <p className="category">{product.category}</p>
      <p className="description">{product.description}</p>
      <p className="price">${product.price}</p>
      <p className="stock">Stock: {product.stock}</p>
      <button onClick={handleAdd}>Agregar al carrito</button>
    </div>
  );
};

export default ProductCard;
