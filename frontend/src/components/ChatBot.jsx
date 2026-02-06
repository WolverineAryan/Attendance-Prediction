import React, { useState, useEffect, useRef } from "react";
import api from "../utils/axiosConfig";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ChatBot({ onNewMessage }) {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("andy_history");
    return saved
      ? JSON.parse(saved)
      : [{ text: "Hi! I’m ANDY. Ask me anything.", sender: "bot" }];
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const endRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Save history
  useEffect(() => {
    localStorage.setItem("andy_history", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      setLoading(true);

      const res = await axios.post(`${API_URL}/chat`, {
        message: input,
      });

      const botReply = {
        text: res.data.reply || "I couldn't understand that.",
        sender: "bot",
      };

      setMessages((prev) => [...prev, botReply]);

      if (onNewMessage) onNewMessage();

    } catch {
      setMessages((prev) => [
        ...prev,
        { text: "Server not reachable.", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: 400 }}>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          marginBottom: 10,
          padding: 10,
          background: "#f9fafb",
          borderRadius: 10,
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.sender === "user" ? "right" : "left",
              marginBottom: 8,
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: 10,
                background: m.sender === "user" ? "#111827" : "#e5e7eb",
                color: m.sender === "user" ? "white" : "black",
              }}
            >
              {m.text}
            </span>
          </div>
        ))}

        {loading && <div>ANDY is typing...</div>}

        <div ref={endRef}></div>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask ANDY..."
          style={{ flex: 1, padding: 10, borderRadius: 10 }}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
