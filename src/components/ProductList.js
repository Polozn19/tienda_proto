import React from "react";
import Slider from "react-slick";
import products from "../data/products";
import "./ProductList.css";

const ProductList = ({ addToCart, toggleWishlist, wishlist, searchTerm }) => {
  const categories = [...new Set(products.map((p) => p.category))];

  // Configuración del carrusel
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="product-list">
      {categories.map((category) => (
        <div key={category} className="category-section">
          <h2 className="category-title">{category}</h2>
          <Slider {...sliderSettings}>
            {products
              .filter(
                (p) =>
                  p.category === category &&
                  p.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((product) => (
                <div key={product.id} className="product-card">
                  <button
                    className={`wishlist-btn ${
                      wishlist.some((w) => w.id === product.id) ? "active" : ""
                    }`}
                    onClick={() => toggleWishlist(product)}
                  >
                    ⭐
                  </button>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <h3>{product.name}</h3>
                  <p className="product-desc">{product.description}</p>
                  <p className="product-price">${product.price}</p>
                  <p className="product-stock">Stock: {product.stock}</p>
                  <button onClick={() => addToCart(product)}>
                    Agregar al carrito
                  </button>
                </div>
              ))}
          </Slider>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
