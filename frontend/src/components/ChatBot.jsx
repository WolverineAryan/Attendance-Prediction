import { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const askQuestion = async () => {
    if (!question) return;

    const userMsg = { from: "user", text: question };
    setMessages([...messages, userMsg]);

    try {
      const res = await axios.post(`${API_URL}/chat`, {
        question: question,
      });

      setMessages((prev) => [
        ...prev,
        { from: "bot", text: res.data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Error connecting to AI." },
      ]);
    }

    setQuestion("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          padding: "10px 15px",
        }}
      >
        💬 AI Chat
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 70,
            right: 20,
            width: 350,
            height: 450,
            background: "#fff",
            borderRadius: 12,
            padding: 10,
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h4>Attendance AI Bot</h4>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {messages.map((m, i) => (
              <p key={i}>
                <b>{m.from}:</b> {m.text}
              </p>
            ))}
          </div>

          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask something..."
          />

          <button onClick={askQuestion}>Send</button>
        </div>
      )}
    </>
  );
}
