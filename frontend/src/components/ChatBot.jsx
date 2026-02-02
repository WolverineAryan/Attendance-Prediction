import { useState } from "react";
import axios from "axios";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const userMsg = { text: input, sender: "user" };
    setMessages([...messages, userMsg]);

    const res = await axios.post("http://localhost:5000/chat", {
      question: input
    });

    setMessages(m => [...m, userMsg, { text: res.data.reply, sender: "bot" }]);
    setInput("");
  };

  return (
    <>
      <button className="chat-toggle" onClick={() => setOpen(!open)}>
        💬 AI Bot
      </button>

      {open && (
        <div className="chat-window">
          <div className="chat-messages">
            {messages.map((m, i) => (
              <p key={i} className={m.sender}>
                {m.text}
              </p>
            ))}
          </div>

          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about your data..."
          />

          <button onClick={sendMessage}>Send</button>
        </div>
      )}
    </>
  );
}
