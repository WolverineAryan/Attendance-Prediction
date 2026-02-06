import React, { useState, useRef, useEffect } from "react";
import ChatBot from "./ChatBot.jsx";

export default function ChatPopup() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [unread, setUnread] = useState(0);

  // Dragging state
  const popupRef = useRef(null);
  const [position, setPosition] = useState({ x: 25, y: 25 });
  const [dragging, setDragging] = useState(false);

  // Load previous chat state
  useEffect(() => {
    const saved = localStorage.getItem("andy_open");
    if (saved === "true") setOpen(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("andy_open", open);
  }, [open]);

  const onDragStart = (e) => {
    setDragging(true);
  };

  const onDrag = (e) => {
    if (!dragging) return;

    setPosition({
      x: window.innerWidth - e.clientX,
      y: window.innerHeight - e.clientY,
    });
  };

  const onDragEnd = () => setDragging(false);

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => {
            setOpen(true);
            setUnread(0);
          }}
          style={{
            position: "fixed",
            bottom: 25,
            right: 25,
            padding: 14,
            borderRadius: "50%",
            background: "#111827",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: 18,
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
          }}
        >
          🤖
          {unread > 0 && (
            <span
              style={{
                position: "absolute",
                top: -5,
                right: -5,
                background: "red",
                color: "white",
                borderRadius: "50%",
                padding: "3px 7px",
                fontSize: 12,
              }}
            >
              {unread}
            </span>
          )}
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div
          ref={popupRef}
          onMouseMove={onDrag}
          onMouseUp={onDragEnd}
          style={{
            position: "fixed",
            bottom: position.y,
            right: position.x,
            width: 380,
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(12px)",
            borderRadius: 16,
            boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
            border: "1px solid rgba(0,0,0,0.1)",
            zIndex: 999,
          }}
        >
          {/* Header */}
          <div
            onMouseDown={onDragStart}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 15px",
              borderBottom: "1px solid #ddd",
              cursor: "move",
            }}
          >
            <h4 style={{ margin: 0 }}>ANDY – AI Assistant</h4>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setMinimized(!minimized)}
                style={{ border: "none", background: "none", cursor: "pointer" }}
              >
                {minimized ? "🔼" : "🔽"}
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  setMinimized(false);
                }}
                style={{ border: "none", background: "none", cursor: "pointer" }}
              >
                ✖
              </button>
            </div>
          </div>

          {/* Chat Body */}
          {!minimized && (
            <div style={{ padding: 10 }}>
              <ChatBot onNewMessage={() => !open && setUnread(u => u + 1)} />
            </div>
          )}
        </div>
      )}
    </>
  );
}
