import React from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

function Navbar({ cartCount = 0 }) {
  return (
    <nav className="navbar flex justify-between items-center px-6 py-3 bg-[#1f1f1f] shadow-md">
      {/* Logo corregido */}
      <h1 className="logo text-xl font-bold text-[#bb86fc] tracking-wide">
        Prototipo de tienda
      </h1>

      {/* Links */}
      <div className="flex items-center gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-sm font-medium transition-colors ${
              isActive ? "text-[#bb86fc]" : "text-gray-300 hover:text-[#bb86fc]"
            }`
          }
        >
          Productos
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `relative flex items-center gap-1 text-sm font-medium transition-colors ${
              isActive ? "text-[#bb86fc]" : "text-gray-300 hover:text-[#bb86fc]"
            }`
          }
        >
          <ShoppingCart size={18} />
          Carrito
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
              {cartCount}
            </span>
          )}
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
