import React from "react";
import { Link } from "react-router-dom";
import "../styles/Cart.css";

function Cart({ cart, addToCart, decreaseQuantity, removeFromCart, clearCart }) {
  // Cálculos
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const igv = subtotal * 0.18;
  const total = subtotal + igv;

  // Generar boleta imprimible
  const generarBoleta = () => {
    const fecha = new Date().toLocaleString();
    const rows = cart
      .map(
        (it, i) =>
          `${i + 1}. ${it.name} x${it.quantity} - S/. ${(it.price * it.quantity).toFixed(2)}`
      )
      .join("<br/>");

    const html = `
      <html>
        <head>
          <title>Boleta</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { margin: 0 0 10px 0; color: #6a1b9a; }
            .muted { color: #555; margin-bottom: 10px; }
            .line { border-top: 1px solid #ccc; margin: 10px 0; }
            .total { font-weight: bold; font-size: 18px; margin-top: 10px; }
          </style>
        </head>
        <body>
          <h1>Boleta de compra</h1>
          <div class="muted">Fecha: ${fecha}</div>
          <div class="line"></div>
          <div>${rows || "Sin productos"}</div>
          <div class="line"></div>
          <div>Subtotal: S/. ${subtotal.toFixed(2)}</div>
          <div>IGV (18%): S/. ${igv.toFixed(2)}</div>
          <div class="total">Total a pagar: S/. ${total.toFixed(2)}</div>
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
                {/* Producto */}
                <div className="cart-left">
                  <img
                    src={item.image || "/images/placeholder.png"}
                    alt={item.name}
                    className="cart-thumb"
                  />
                  <div>
                    <h3 className="cart-name">{item.name}</h3>
                    <div className="cart-price">S/. {item.price.toFixed(2)}</div>
                    <div className="cart-stock">Stock: {item.stock}</div>
                  </div>
                </div>

                {/* Controles cantidad */}
                <div className="qty-controls">
                  <button
                    className="qty-btn"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    ➖
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    disabled={item.quantity >= item.stock}
                    onClick={() => addToCart(item)}
                  >
                    ➕
                  </button>
                </div>

                {/* Subtotal y eliminar */}
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

          {/* Totales */}
          <div className="cart-summary">
            <p>Subtotal: <strong>S/. {subtotal.toFixed(2)}</strong></p>
            <p>IGV (18%): <strong>S/. {igv.toFixed(2)}</strong></p>
            <p>Total: <strong>S/. {total.toFixed(2)}</strong></p>
          </div>

          {/* Acciones */}
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
