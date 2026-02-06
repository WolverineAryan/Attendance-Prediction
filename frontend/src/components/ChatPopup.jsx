import React, { useState, useRef, useEffect } from "react";
import ChatBot from "./ChatBot.jsx";

export default function ChatPopup() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const popupRef = useRef(null);

  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [size, setSize] = useState({ width: 380, height: 520 });

  const drag = useRef({ active: false, offsetX: 0, offsetY: 0 });

  // Load saved state
  useEffect(() => {
    const saved = localStorage.getItem("chat_open");
    if (saved === "true") setOpen(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("chat_open", open);
  }, [open]);

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

    setPosition({
      x: e.clientX - drag.current.offsetX,
      y: e.clientY - drag.current.offsetY,
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
  }, [position]);

  return (
    <>
 

      {/* CHAT WINDOW */}
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
            resize: "both",
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
            <span className="font-semibold">ANDY – Assistant</span>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => setMinimized(!minimized)}
                style={{ background: "none", border: "none", color: "white" }}
              >
                {minimized ? "▲" : "▼"}
              </button>

              <button
                onClick={() => setOpen(false)}
                style={{ background: "none", border: "none", color: "white" }}
              >
                ✖
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
