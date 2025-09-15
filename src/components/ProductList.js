import React from "react";

const products = [
  { id: 1, name: "Laptop Gamer", price: 2500 },
  { id: 2, name: "Mouse Inalámbrico", price: 150 },
  { id: 3, name: "Teclado Mecánico", price: 300 }
];

function ProductList({ addToCart }) {
  return (
    <div className="product-list">
      {products.map((p) => (
        <div key={p.id} className="product-card">
          <h3>{p.name}</h3>
          <p>S/. {p.price}</p>
          <button onClick={() => addToCart(p)}>Agregar al carrito</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
