import React, { useState } from "react";
import "./Support.css";

function Support() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Mensaje enviado:", form);
    setSent(true);
  };

  return (
    <div className="support">
      <h2>📩 Contactar Soporte</h2>
      {sent ? (
        <p className="success">✅ Tu mensaje fue enviado con éxito.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Tu nombre"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Tu correo"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Escribe tu mensaje..."
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Enviar</button>
        </form>
      )}
    </div>
  );
}

export default Support;
