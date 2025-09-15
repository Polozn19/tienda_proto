import React from "react";
import { Link } from "react-router-dom";

function Cart({
  cart,
  addToCart,
  decreaseQuantity,
  removeFromCart,
  clearCart,
}) {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Boleta imprimible (el usuario puede "Guardar como PDF" en el diálogo de impresión)
  const generarBoleta = () => {
    const fecha = new Date().toLocaleString();
    const rows = cart
      .map(
        (it, i) =>
          `${i + 1}. ${it.name}  x${it.quantity}  -  S/. ${(it.price * it.quantity).toFixed(2)}`
      )
      .join("<br/>");

    const html = `
      <html>
        <head>
          <title>Boleta</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { margin: 0 0 10px 0; }
            .muted { color: #555; }
            .line { border-top: 1px solid #ccc; margin: 10px 0; }
            .total { font-weight: bold; font-size: 18px; }
          </style>
        </head>
        <body>
          <h1>Boleta de compra</h1>
          <div class="muted">Fecha: ${fecha}</div>
          <div class="line"></div>
          <div>${rows || "Sin productos"}</div>
          <div class="line"></div>
          <div class="total">Total: S/. ${total.toFixed(2)}</div>
        </body>
      </html>
    `;

    const w = window.open("", "_blank", "width=800,height=600");
    if (!w) return;
    w.document.open();
    w.document.write(html);
    w.document.close();
    w.focus();
    w.print();
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Carrito</h2>

      {cart.length === 0 ? (
        <p className="cart-empty">Tu carrito está vacío.</p>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-left">
                  <img
                    src={item.image || "/images/placeholder.png"}
                    alt={item.name}
                    className="cart-thumb"
                  />
                  <div>
                    <h3 className="cart-name">{item.name}</h3>
                    <div className="cart-price">S/. {item.price.toFixed(2)}</div>
                  </div>
                </div>

                <div className="qty-controls">
                  <button
                    className="qty-btn"
                    onClick={() => decreaseQuantity(item.id)}
                    aria-label="Disminuir cantidad"
                  >
                    ➖
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => addToCart(item)}
                    aria-label="Aumentar cantidad"
                  >
                    ➕
                  </button>
                </div>

                <div className="cart-right">
                  <div className="cart-subtotal">
                    S/. {(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromCart(item.id)}  
                  >
                    ❌
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total-row">
            <span>Total:</span>
            <strong>S/. {total.toFixed(2)}</strong>
          </div>

          <div className="cart-actions">
            <Link to="/" className="btn btn-ghost">🛍️ Seguir comprando</Link>
            <button className="btn btn-danger" onClick={clearCart}>
              🗑️ Vaciar carrito
            </button>
            <button className="btn btn-primary" onClick={generarBoleta}>
              📄 Generar boleta
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
