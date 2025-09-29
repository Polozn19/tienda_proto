import React, { useState, useEffect } from "react";
import "../styles/BannerHero.css";

import banner1 from "../assets/img/banner1.jpg";
import banner2 from "../assets/img/banner2.jpg";
import banner3 from "../assets/img/banner3.jpg";


const images = [banner1, banner2, banner3];

function BannerHero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Avanza automáticamente cada 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="banner-hero">
      <img
        src={images[currentIndex]}
        alt={`banner-${currentIndex}`}
        className="banner-image"
      />
      <div className="banner-overlay">
        <div className="banner-content">
          <h1 className="banner-title">Bienvenido al mundo de la tecnologia</h1>
          <p className="banner-subtitle">
            Ofertas exclusivas y más
          </p>
          <button className="banner-btn">Explorar ahora</button>
        </div>
      </div>

      {/* Botones de navegación */}
      <button className="banner-btn-nav left" onClick={prevSlide}>
        ❮
      </button>
      <button className="banner-btn-nav right" onClick={nextSlide}>
        ❯
      </button>

      {/* Indicadores */}
      <div className="banner-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </section>
  );
}

export default BannerHero;
