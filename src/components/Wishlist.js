import React from "react";
import "./ProductList.css";

const Wishlist = ({ wishlist, toggleWishlist, addToCart }) => {
  return (
    <div className="product-list">
      <h2>⭐ Mi Lista de Deseos</h2>
      {wishlist.length === 0 ? (
        <p>No tienes productos en tu wishlist.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="product-price">${product.price}</p>
              <button onClick={() => addToCart(product)}>🛒 Agregar al carrito</button>
              <button onClick={() => toggleWishlist(product)}>❌ Quitar</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
