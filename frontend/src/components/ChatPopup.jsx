import React, { useState, useRef, useEffect } from "react";
import ChatBot from "./ChatBot.jsx";

import { FaRobot, FaTimes, FaMinus, FaExpand } from "react-icons/fa";

export default function ChatPopup() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const popupRef = useRef(null);

  // Start popup near bottom-right where button exists
  const [position, setPosition] = useState({
    x: window.innerWidth - 420,
    y: window.innerHeight - 580,
  });

  const [size] = useState({ width: 380, height: 520 });

  const drag = useRef({ active: false, offsetX: 0, offsetY: 0 });

  // ===== OPEN CHAT (RESET POSITION) =====
  const openChat = () => {
    setPosition({
      x: window.innerWidth - 420,
      y: window.innerHeight - 580,
    });

    setOpen(true);
    setMinimized(false);
  };

  // ===== DRAGGING =====
  const startDrag = (e) => {
    drag.current = {
      active: true,
      offsetX: e.clientX - position.x,
      offsetY: e.clientY - position.y,
    };
  };

  const onMouseMove = (e) => {
    if (!drag.current.active) return;

    let newX = e.clientX - drag.current.offsetX;
    let newY = e.clientY - drag.current.offsetY;

    // Prevent popup from leaving screen
    newX = Math.max(10, Math.min(newX, window.innerWidth - size.width - 10));
    newY = Math.max(10, Math.min(newY, window.innerHeight - size.height - 10));

    setPosition({
      x: newX,
      y: newY,
    });
  };

  const stopDrag = () => {
    drag.current.active = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", stopDrag);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stopDrag);
    };
  });

  return (
    <>
      {/* ===== FLOATING CHATBOT ICON ===== */}
      {!open && (
        <button
          onClick={openChat}
          style={{
            position: "fixed",
            bottom: 25,
            right: 25,
            padding: 14,
            borderRadius: "50%",
            background: "#065f46",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: 22,
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <FaRobot />
        </button>
      )}

      {/* ===== CHAT WINDOW ===== */}
      {open && (
        <div
          ref={popupRef}
          style={{
            position: "fixed",
            left: position.x,
            top: position.y,
            width: size.width,
            height: minimized ? 50 : size.height,
            background: "#ffffff",
            borderRadius: 10,
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            border: "1px solid #e5e7eb",
            display: "flex",
            flexDirection: "column",
            zIndex: 999,
            overflow: "hidden",
          }}
        >
          {/* HEADER */}
          <div
            onMouseDown={startDrag}
            style={{
              padding: "10px 14px",
              background: "#065f46",
              color: "white",
              cursor: "move",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
              <FaRobot style={{ marginRight: 6 }} />
              ANDY – Assistant
            </span>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setMinimized(!minimized)}
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                {minimized ? <FaExpand /> : <FaMinus />}
              </button>

              <button
                onClick={() => setOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* BODY */}
          {!minimized && (
            <div style={{ flex: 1, overflow: "auto", padding: 8 }}>
              <ChatBot />
            </div>
          )}
        </div>
      )}
    </>
  );
}
