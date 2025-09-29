import React, { useRef, useState, useEffect } from "react";
import products from "../data/products";
import "../styles/ProductList.css";

const ProductList = ({ addToCart, toggleWishlist, wishlist = [], searchTerm = "" }) => {
  const categories = [...new Set(products.map((p) => p.category))];

  // refs para cada fila
  const rowRefs = useRef([]);
  rowRefs.current = [];

  const setRowRef = (el, idx) => {
    rowRefs.current[idx] = el;
  };

  // estado para mostrar/ocultar flechas por fila
  const [canScrollLeft, setCanScrollLeft] = useState({});
  const [canScrollRight, setCanScrollRight] = useState({});

  // actualizar visibilidad de flechas para una fila
  const updateArrowsFor = (idx) => {
    const row = rowRefs.current[idx];
    if (!row) return;
    const left = row.scrollLeft > 5;
    const right = row.scrollLeft + row.clientWidth < row.scrollWidth - 5;
    setCanScrollLeft((s) => ({ ...s, [idx]: left }));
    setCanScrollRight((s) => ({ ...s, [idx]: right }));
  };

  // actualizar todas 
  const updateAllArrows = () => {
    rowRefs.current.forEach((r, i) => {
      if (!r) return;
      const left = r.scrollLeft > 5;
      const right = r.scrollLeft + r.clientWidth < r.scrollWidth - 5;
      setCanScrollLeft((s) => ({ ...s, [i]: left }));
      setCanScrollRight((s) => ({ ...s, [i]: right }));
    });
  };

  useEffect(() => {
    updateAllArrows();
    const onResize = () => updateAllArrows();
    window.addEventListener("resize", onResize);

    const listeners = [];
    rowRefs.current.forEach((row, idx) => {
      if (!row) return;
      const fn = () => updateArrowsFor(idx);
      row.addEventListener("scroll", fn);
      listeners.push({ row, fn });
    });

    return () => {
      window.removeEventListener("resize", onResize);
      listeners.forEach(({ row, fn }) => row.removeEventListener("scroll", fn));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, categories.length]);

  // desplazar fila idx: dir = -1 (izq) o 1 (der)
  const scrollRow = (idx, dir) => {
    const row = rowRefs.current[idx];
    if (!row) return;
    const distance = Math.round(row.clientWidth * 0.8) * dir;
    row.scrollBy({ left: distance, behavior: "smooth" });
    // actualizar después del desplazamiento
    setTimeout(() => updateArrowsFor(idx), 450);
  };

  const normalized = (searchTerm || "").toLowerCase().trim();

  return (
    <div className="pl-product-list">
      {categories.map((category, idx) => {
        const items = products.filter(
          (p) =>
            p.category === category &&
            p.name.toLowerCase().includes(normalized)
        );
        if (!items.length) return null;

        return (
          <section key={category} className="pl-category-block">
            <div className="pl-category-header">
              <h2 className="pl-category-title"> {category}</h2>
            </div>

            <div className="pl-row-wrapper">
              {/* Flecha izquierda (solo si aplica) */}
              {canScrollLeft[idx] && (
                <button
                  className="pl-row-arrow left"
                  onClick={() => scrollRow(idx, -1)}
                  aria-label={`Desplazar ${category} a la izquierda`}
                >
                  ◀
                </button>
              )}

              {/* Fila desplazable */}
              <div
                className="pl-products-row"
                ref={(el) => setRowRef(el, idx)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") scrollRow(idx, 1);
                  if (e.key === "ArrowLeft") scrollRow(idx, -1);
                }}
              >
                {items.map((product) => {
                  const inWishlist = wishlist.some((w) => w.id === product.id);
                  return (
                    <article className="pl-product-card" key={product.id}>
                      <button
                        className={`pl-wishlist-btn ${inWishlist ? "active" : ""}`}
                        onClick={() => toggleWishlist(product)}
                        aria-label="wishlist"
                      >
                        {inWishlist ? "❤️" : "🤍"}
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
                          <span className="btn-text" aria-hidden> Añadir</span>
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Flecha derecha (solo si aplica) */}
              {canScrollRight[idx] && (
                <button
                  className="pl-row-arrow right"
                  onClick={() => scrollRow(idx, 1)}
                  aria-label={`Desplazar ${category} a la derecha`}
                >
                  ▶
                </button>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default ProductList;
