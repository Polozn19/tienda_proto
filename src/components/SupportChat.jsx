import React, { useState, useEffect, useRef } from "react";
import "../styles/SupportChat.css";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_ww18k6l";
const TEMPLATE_ID = "template_84kvd8i";
const PUBLIC_KEY = "2k2KBNsgn-nrLcuAF";
const DEST_EMAIL = "pierraneira19@gmail.com";

const SupportChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hola 👋 ¿En qué puedo ayudarte hoy?", id: Date.now() },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [humanMode, setHumanMode] = useState(false); // hablar con humano
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [showForm, setShowForm] = useState(false);
  const windowRef = useRef(null);

  // Quick buttons (puedes editar)
  const quickButtons = [
    { key: "precios", label: "Ver precios" },
    { key: "envio", label: "Estado de envío" },
    { key: "pagos", label: "Formas de pago" },
    { key: "contacto", label: "Contacto" },
  ];

  // Respuestas por categoría/flujo:
  const getBotResponse = (text) => {
    const msg = (text || "").toLowerCase();
    if (!msg) return "¿Puedes decirlo nuevamente, por favor?";
    if (["hola", "buenas", "hey"].some(k=>msg.includes(k))) return "¡Hola! ¿En qué puedo ayudarte?";
    if (msg.includes("precio") || msg.includes("precios") || msg.includes("ver precios")) 
      return "Los precios varían según el producto. ¿Qué producto te interesa? Puedes usar la búsqueda en la página de productos.";
    if (msg.includes("envio") || msg.includes("entrega") || msg.includes("estado de envío")) 
      return "Realizamos envíos a todo el país en 2-5 días hábiles. ¿Quieres que verifique el estado de un pedido?";
    if (msg.includes("pago") || msg.includes("tarjeta") || msg.includes("pagos")) 
      return "Aceptamos tarjeta, transferencia y pago en línea. ¿Necesitas ayuda para pagar ahora?";
    if (msg.includes("contacto") || msg.includes("whatsapp")) 
      return "Puedes escribirnos al correo de soporte. Si quieres, pulsa 'Hablar con humano' y en seguida te lo enviaremos por email.";
    if (msg.includes("hablar") && msg.includes("humano")) 
      return "Entendido. Pulsa el botón 'Hablar con humano' y enviaremos tu conversación al equipo de soporte.";
    return "Gracias por tu mensaje. Un asesor te responderá pronto 🙌";
  };

  // play pop sound (bot only) - small WebAudio pop
  const playPop = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "square";
      o.frequency.setValueAtTime(900, ctx.currentTime);
      g.gain.setValueAtTime(0.0001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.14, ctx.currentTime + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
      o.connect(g); g.connect(ctx.destination);
      o.start(); o.stop(ctx.currentTime + 0.15);
      setTimeout(()=>{ try{ctx.close()}catch(e){} }, 400);
    } catch (e) {}
  };

  // send user's message and trigger bot (with "typing..." indicator)
  const sendMessage = (text) => {
    const trimmed = (text||"").trim();
    if (!trimmed) return;
    const userMsg = { sender: "user", text: trimmed, id: Date.now() + Math.random() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    // bot "typing"
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const botReply = getBotResponse(trimmed);
      const botMsg = { sender: "bot", text: botReply, id: Date.now() + Math.random() };
      setMessages(prev => [...prev, botMsg]);
      playPop();
    }, 700 + Math.random()*600); // slight random to feel natural
  };

  // Quick button pressed
  const handleQuick = (key) => {
    // map keys to sample texts
    const map = {
      precios: "ver precios",
      envio: "estado de envío",
      pagos: "formas de pago",
      contacto: "contacto",
    };
    const text = map[key] || key;
    sendMessage(text);
  };

  // UI: open/close with animation handling
  const openWindow = () => { setIsClosing(false); setIsOpen(true); };
  const closeWindow = () => { setIsClosing(true); };
  const onAnimationEnd = (e) => {
    if (isClosing && e.target === windowRef.current) {
      setIsOpen(false);
      setIsClosing(false);
    }
  };

  // "Hablar con humano": send email via EmailJS with conversation + user data
  const sendConversationByEmail = async () => {
    // build conversation log
    const conversationLog = messages.map(m => `${m.sender === "user" ? "Usuario" : "Soporte"}: ${m.text}`).join("\n");
    const params = {
      user_name: userData.name || "Sin nombre",
      user_email: userData.email || "Sin email",
      conversation_log: conversationLog,
      to_email: DEST_EMAIL
    };

    try {
      // returns a Promise
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, PUBLIC_KEY);
      // feedback
      setMessages(prev => [...prev, { sender: "bot", text: "Tu conversación ha sido enviada al equipo. Te contactarán pronto.", id: Date.now()+1 }]);
      playPop();
      setHumanMode(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setMessages(prev => [...prev, { sender: "bot", text: "Error al enviar. Por favor intenta de nuevo más tarde.", id: Date.now()+2 }]);
    }
  };

  // Handler: user clicks "Hablar con humano" button
  const handleTalkToHuman = () => {
    // require name/email: show form if not provided
    if (!userData.name || !userData.email) {
      setShowForm(true);
      return;
    }
    // send immediately
    sendConversationByEmail();
  };

  // Submit the small form (name & email)
  const submitForm = (e) => {
    e.preventDefault();
    setShowForm(false);
    // a short delay then send the conversation automatically
    setTimeout(()=> sendConversationByEmail(), 300);
    // add a bot message confirming envio in progress
    setMessages(prev => [...prev, { sender: "bot", text: "Enviando tu información al equipo... ⏳", id: Date.now()+3 }]);
  };

  // auto-scroll to bottom when messages change
  useEffect(() => {
    const el = windowRef.current;
    if (!el) return;
    const body = el.querySelector(".chat-body");
    if (body) body.scrollTop = body.scrollHeight + 200;
  }, [messages, typing]);

  // detect dark mode by body class or localStorage (keeps parity con tu app)
  const detectDark = () => {
    if (typeof document === "undefined") return false;
    if (document.body.classList.contains("dark-mode")) return true;
    try { return localStorage.getItem("darkMode") === "true"; } catch { return false; }
  };
  const themeClass = detectDark() ? "dark" : "light";

  // keyboard enter
  const onKeyDown = (e) => { if (e.key === "Enter") sendMessage(input); };

  return (
    <>
      <button
        className="chat-bubble"
        aria-label="Abrir chat de soporte"
        onClick={() => (isOpen ? closeWindow() : openWindow())}
      >
        💬
      </button>

      {isOpen && (
        <div
          ref={windowRef}
          className={`chat-window ${themeClass} ${isClosing ? "closing" : "opening"}`}
          onAnimationEnd={onAnimationEnd}
          role="dialog"
          aria-modal="false"
        >
          <div className="chat-header">
            <div className="chat-title">Soporte Técnico</div>
            <div className="chat-controls">
              <button
                className="min-btn"
                onClick={() => closeWindow()}
                aria-label="Cerrar chat"
                title="Cerrar"
              >✖</button>
            </div>
          </div>

          {/* quick buttons */}
          <div className="quick-buttons">
            {quickButtons.map(q => (
              <button key={q.key} className="quick-btn" onClick={() => handleQuick(q.key)}>{q.label}</button>
            ))}
            <button className="quick-btn special" onClick={() => { setShowForm(true); setMessages(prev => [...prev, { sender: "bot", text: "Por favor, deja tu nombre y correo para poder contactarte.", id: Date.now()+4 }]); }}>
              Dejar datos
            </button>
            <button className="quick-btn human" onClick={handleTalkToHuman}>Hablar con humano</button>
          </div>

          <div className="chat-body" aria-live="polite">
            {messages.map((m, idx) => (
              <div key={m.id} className={`chat-message ${m.sender} appear`} style={{ animationDelay: `${idx * 40}ms` }}>
                {m.text}
              </div>
            ))}

            {typing && (
              <div className="chat-message bot typing">
                <div className="dot" /><div className="dot" /><div className="dot" />
              </div>
            )}
          </div>

          <div className="chat-footer">
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              value={input}
              onChange={(e)=> setInput(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label="Escribe un mensaje"
            />
            <button className="send-btn" onClick={() => sendMessage(input)} aria-label="Enviar">➤</button>
          </div>

          {/* small form overlay */}
          {showForm && (
            <div className="form-overlay" role="dialog" aria-modal="true">
              <form className="mini-form" onSubmit={submitForm}>
                <h4>Déjanos tus datos</h4>
                <label>
                  Nombre
                  <input type="text" value={userData.name} onChange={(e)=> setUserData({...userData, name: e.target.value})} required />
                </label>
                <label>
                  Correo
                  <input type="email" value={userData.email} onChange={(e)=> setUserData({...userData, email: e.target.value})} required />
                </label>
                <div className="form-actions">
                  <button type="button" className="btn-ghost" onClick={()=> setShowForm(false)}>Cancelar</button>
                  <button type="submit" className="btn-primary">Enviar y contactar</button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SupportChat;
