import React from "react";
import "../styles/ProductList.css"; // reutilizamos los estilos base

const Wishlist = ({ wishlist = [], toggleWishlist, addToCart }) => {
  return (
    <div className="pl-product-list">
      <h2>❤️ Mi Lista de Deseos</h2>

      {wishlist.length === 0 ? (
        <p>No tienes productos en tu lista de deseos.</p>
      ) : (
        <div className="pl-wishlist-grid">
          {wishlist.map((product) => (
            <article className="pl-wishlist-card" key={product.id}>
              {/* Botón para quitar de favoritos */}
              <button
                className="pl-wishlist-btn active"
                onClick={() => toggleWishlist(product)}
                aria-label="Quitar de la lista"
              >
                ❌
              </button>

              <div className="pl-image-wrap">
                <img
                  src={product.image || "/images/placeholder.png"}
                  alt={product.name}
                  className="pl-image"
                />
              </div>

              <div className="pl-body">
                <h3 className="pl-name">{product.name}</h3>
                <p className="pl-desc">{product.description}</p>
              </div>

              <div className="pl-footer">
                <div className="pl-meta">
                  <span className="pl-price">S/. {product.price}</span>
                  <span className={`pl-stock ${product.stock > 0 ? "in" : "out"}`}>
                    {product.stock > 0 ? `En stock (${product.stock})` : "Agotado"}
                  </span>
                </div>

                <button
                  className="pl-add-btn"
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}
                >
                  🛒 Añadir
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
