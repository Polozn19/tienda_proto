// src/data/products.js

// 🖥️ Laptops
import laptop1 from "../assets/img/laptop1.png";
import laptop2 from "../assets/img/laptop2.png";
import laptop3 from "../assets/img/laptop3.png";
import laptop4 from "../assets/img/laptop4.png";
import laptop5 from "../assets/img/laptop5.png";

// 🖥️ PCs y accesorios
import pc1 from "../assets/img/pc1.png";
import pc2 from "../assets/img/pc2.png";
import pc3 from "../assets/img/pc3.png";
import pc4 from "../assets/img/pc4.png";
import pc5 from "../assets/img/pc5.png";
import monitor1 from "../assets/img/monitor1.png";
import keyboard1 from "../assets/img/keyboard1.png";
import mouse1 from "../assets/img/mouse1.png";
import headphones1 from "../assets/img/headphones1.png";

// 🎮 Consolas
import ps5 from "../assets/img/ps5.png";
import xboxseriesx from "../assets/img/xboxseriesx.png";
import switchImg from "../assets/img/switch.png";
import steamdeck from "../assets/img/steamdeck.png";
import psvr2 from "../assets/img/psvr2.png";

// 🎮 Videojuegos
import zelda from "../assets/img/zelda.png";
import gowragnarok from "../assets/img/gowragnarok.png";
import halo from "../assets/img/halo.png";
import eldenring from "../assets/img/eldenring.png";
import cyberpunk from "../assets/img/cyberpunk.png";

// 💻 Software
import office365 from "../assets/img/office365.png";
import photoshop from "../assets/img/photoshop.png";
import kaspersky from "../assets/img/kaspersky.png";
import vs from "../assets/img/vs.png";
import autocad from "../assets/img/autocad.png";

// 🔊 Otros accesorios
import hdd from "../assets/img/hdd.png";
import ssd from "../assets/img/ssd.png";
import ram from "../assets/img/ram.png";
import psu from "../assets/img/psu.png";
import motherboard from "../assets/img/motherboard.png";

// 📱 Smartphones
import iphone14 from "../assets/img/iphone14.png";
import s23ultra from "../assets/img/s23ultra.png";
import pixel7 from "../assets/img/pixel7.png";
import xiaomi13 from "../assets/img/xiaomi13.png";
import oneplus11 from "../assets/img/oneplus11.png";

// 🖥️ Tablets y wearables
import ipadpro from "../assets/img/ipadpro.png";
import tabs9 from "../assets/img/tabs9.png";
import applewatchultra from "../assets/img/applewatchultra.png";
import galaxywatch6 from "../assets/img/galaxywatch6.png";
import metaquest3 from "../assets/img/metaquest3.png";

const products = [
  // 🖥️ Laptops
  { id: 1, name: "Laptop Gamer Raptor 15", price: 2500, category: "Laptops", image: laptop1, description: "Laptop gamer con RTX 4060, 16GB RAM y SSD 1TB.", stock: 5 },
  { id: 2, name: "Laptop Ultrabook Air X", price: 1800, category: "Laptops", image: laptop2, description: "Ultrabook ligera con procesador Intel i7 y pantalla OLED.", stock: 7 },
  { id: 3, name: "MacBook Pro 14” M2", price: 3200, category: "Laptops", image: laptop3, description: "MacBook Pro con chip M2 Pro y 16GB de RAM.", stock: 4 },
  { id: 4, name: "Laptop ASUS Creator Studio", price: 2100, category: "Laptops", image: laptop4, description: "Portátil para creadores con pantalla 4K y RTX 4070.", stock: 6 },
  { id: 5, name: "Laptop Lenovo ThinkPad X1", price: 1900, category: "Laptops", image: laptop5, description: "Laptop empresarial con teclado retroiluminado y seguridad TPM.", stock: 8 },

  // 🖥️ PCs
  { id: 6, name: "PC Gamer Predator X", price: 2800, category: "PCs", image: pc1, description: "PC de escritorio con Ryzen 9 y RTX 4080.", stock: 3 },
  { id: 7, name: "PC Workstation Creator Z", price: 3500, category: "PCs", image: pc2, description: "Workstation con Intel Xeon, 64GB RAM y RTX A6000.", stock: 2 },
  { id: 8, name: "PC Gamer Shadow Strike", price: 2200, category: "PCs", image: pc3, description: "PC gamer con Ryzen 7, RTX 4070 y SSD NVMe 1TB.", stock: 5 },
  { id: 9, name: "PC All-in-One Ultra Slim", price: 1500, category: "PCs", image: pc4, description: "All-in-One con pantalla táctil 27” y procesador Intel i5.", stock: 6 },
  { id: 10, name: "PC Gamer Mini-ITX Falcon", price: 1900, category: "PCs", image: pc5, description: "Compacta pero potente, con RTX 4060 y 32GB RAM.", stock: 4 },

  // 🖥️ Accesorios
  { id: 11, name: "Monitor Curvo 34'' UltraWide", price: 900, category: "Accesorios", image: monitor1, description: "Monitor gaming curvo con tasa de refresco 165Hz.", stock: 10 },
  { id: 12, name: "Teclado Mecánico RGB", price: 120, category: "Accesorios", image: keyboard1, description: "Teclado mecánico con switches azules y retroiluminación RGB.", stock: 15 },
  { id: 13, name: "Mouse Gamer HyperX Pulsefire", price: 60, category: "Accesorios", image: mouse1, description: "Mouse gamer con sensor óptico de 16,000 DPI.", stock: 20 },
  { id: 14, name: "Auriculares Inalámbricos Sony WH-1000XM5", price: 400, category: "Accesorios", image: headphones1, description: "Auriculares premium con cancelación de ruido activa.", stock: 12 },

  // 🎮 Consolas
  { id: 15, name: "PlayStation 5", price: 750, category: "Consolas", image: ps5, description: "Consola PS5 edición estándar con lector de discos.", stock: 10 },
  { id: 16, name: "Xbox Series X", price: 720, category: "Consolas", image: xboxseriesx, description: "Consola Xbox Series X con 1TB de almacenamiento.", stock: 9 },
  { id: 17, name: "Nintendo Switch OLED", price: 450, category: "Consolas", image: switchImg, description: "Consola híbrida con pantalla OLED y Joy-Con blancos.", stock: 11 },
  { id: 18, name: "Steam Deck 512GB", price: 650, category: "Consolas", image: steamdeck, description: "Consola portátil para juegos de PC con 512GB SSD.", stock: 6 },
  { id: 19, name: "PlayStation VR2", price: 600, category: "Accesorios", image: psvr2, description: "Visor de realidad virtual para PS5.", stock: 5 },

  // 🎮 Videojuegos
  { id: 20, name: "The Legend of Zelda: Tears of the Kingdom", price: 70, category: "Videojuegos", image: zelda, description: "Juego de aventuras exclusivo para Nintendo Switch.", stock: 25 },
  { id: 21, name: "God of War: Ragnarök", price: 60, category: "Videojuegos", image: gowragnarok, description: "Juego de acción exclusivo para PlayStation.", stock: 30 },
  { id: 22, name: "Halo Infinite", price: 55, category: "Videojuegos", image: halo, description: "Shooter exclusivo de Xbox y PC.", stock: 20 },
  { id: 23, name: "Elden Ring", price: 65, category: "Videojuegos", image: eldenring, description: "RPG de mundo abierto ganador de Juego del Año.", stock: 15 },
  { id: 24, name: "Cyberpunk 2077", price: 40, category: "Videojuegos", image: cyberpunk, description: "Juego futurista RPG de CD Projekt RED.", stock: 18 },

  // 💻 Software
  { id: 25, name: "Microsoft Office 365", price: 100, category: "Software", image: office365, description: "Suite ofimática con Word, Excel y PowerPoint.", stock: 50 },
  { id: 26, name: "Adobe Photoshop", price: 240, category: "Software", image: photoshop, description: "Software de edición de imágenes líder en la industria.", stock: 35 },
  { id: 27, name: "Antivirus Kaspersky Premium", price: 50, category: "Software", image: kaspersky, description: "Protección completa para PC y dispositivos móviles.", stock: 40 },
  { id: 28, name: "Visual Studio Professional", price: 500, category: "Software", image: vs, description: "Entorno de desarrollo integrado para programadores.", stock: 20 },
  { id: 29, name: "AutoCAD 2024", price: 1500, category: "Software", image: autocad, description: "Software de diseño asistido por computadora.", stock: 12 },

  // 🔊 Otros accesorios
  { id: 30, name: "Disco Duro Externo 2TB", price: 90, category: "Accesorios", image: hdd, description: "Almacenamiento portátil USB 3.0.", stock: 25 },
  { id: 31, name: "SSD NVMe 1TB Samsung", price: 130, category: "Accesorios", image: ssd, description: "SSD NVMe de alto rendimiento.", stock: 30 },
  { id: 32, name: "Memoria RAM 16GB DDR5", price: 120, category: "Accesorios", image: ram, description: "Módulo de memoria DDR5 para PC de alto rendimiento.", stock: 20 },
  { id: 33, name: "Fuente de Poder 750W Gold", price: 150, category: "Accesorios", image: psu, description: "Fuente certificada 80 Plus Gold para gaming.", stock: 18 },
  { id: 34, name: "Placa Madre ASUS ROG STRIX", price: 350, category: "Accesorios", image: motherboard, description: "Placa base para gamers con soporte DDR5.", stock: 10 },

  // 📱 Smartphones
  { id: 35, name: "iPhone 14 Pro Max", price: 1400, category: "Smartphones", image: iphone14, description: "Smartphone con cámara de 48MP y pantalla Super Retina XDR.", stock: 12 },
  { id: 36, name: "Samsung Galaxy S23 Ultra", price: 1350, category: "Smartphones", image: s23ultra, description: "Celular premium con S-Pen y cámara 200MP.", stock: 10 },
  { id: 37, name: "Google Pixel 7 Pro", price: 1100, category: "Smartphones", image: pixel7, description: "Smartphone con Android puro y cámara optimizada por IA.", stock: 14 },
  { id: 38, name: "Xiaomi 13 Pro", price: 950, category: "Smartphones", image: xiaomi13, description: "Smartphone con pantalla AMOLED 120Hz y cámara Leica.", stock: 16 },
  { id: 39, name: "OnePlus 11", price: 900, category: "Smartphones", image: oneplus11, description: "Celular potente con carga rápida de 100W.", stock: 20 },

  // 🖥️ Tablets y wearables
  { id: 40, name: "iPad Pro 12.9”", price: 1200, category: "Tablets", image: ipadpro, description: "Tablet Apple con chip M2 y pantalla Liquid Retina XDR.", stock: 8 },
  { id: 41, name: "Samsung Galaxy Tab S9", price: 1100, category: "Tablets", image: tabs9, description: "Tablet premium con S-Pen incluido.", stock: 9 },
  { id: 42, name: "Apple Watch Ultra", price: 800, category: "Wearables", image: applewatchultra, description: "Reloj inteligente para deportes extremos.", stock: 15 },
  { id: 43, name: "Samsung Galaxy Watch 6", price: 350, category: "Wearables", image: galaxywatch6, description: "Smartwatch con monitoreo avanzado de salud.", stock: 20 },
  { id: 44, name: "Meta Quest 3", price: 600, category: "Wearables", image: metaquest3, description: "Visor VR independiente de Meta.", stock: 12 },
];

export default products;
