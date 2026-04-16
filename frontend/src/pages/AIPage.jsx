import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const API = "https://upsc-intelligence-system.onrender.com";

export default function AIPage() {
  const [messages, setMessages] = useState(() => {
    return JSON.parse(localStorage.getItem("ai_chat")) || [];
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  // 🔥 Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔥 Save history
  useEffect(() => {
    localStorage.setItem("ai_chat", JSON.stringify(messages));
  }, [messages]);

  // ================= CHAT =================
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);

    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(`${API}/ai/chat`, {
        question: input,
      });

      // 🔥 FAKE STREAMING EFFECT
      const fullText = res.data.answer;
      let streamed = "";

      const aiMsg = { role: "ai", content: "" };
      setMessages((prev) => [...prev, aiMsg]);

      for (let i = 0; i < fullText.length; i++) {
        streamed += fullText[i];

        await new Promise((r) => setTimeout(r, 5));

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].content = streamed;
          return updated;
        });
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "⚠️ Error generating response" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col text-white">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-4">
        AI Intelligence 🧠
      </h1>

      {/* CHAT CONTAINER */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-2xl 
        bg-white/5 backdrop-blur-xl border border-white/10">

        {messages.length === 0 && (
          <p className="text-gray-400 text-center mt-20">
            Ask anything about UPSC...
          </p>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-xl text-sm leading-relaxed
              ${
                msg.role === "user"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500"
                  : "bg-white/10 border border-white/10"
              }`}
            >
              <ReactMarkdown>
                {msg.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}

        {/* TYPING ANIMATION */}
        {loading && (
          <div className="text-indigo-400 animate-pulse">
            AI is typing...
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* INPUT */}
      <div className="mt-4 flex gap-2">
        <input
          placeholder="Ask UPSC question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10 outline-none"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button
          onClick={sendMessage}
          className="px-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500"
        >
          Send
        </button>
      </div>

      {/* CLEAR HISTORY */}
      <button
        onClick={() => {
          localStorage.removeItem("ai_chat");
          setMessages([]);
        }}
        className="text-xs text-gray-400 mt-2 hover:text-white"
      >
        Clear Chat
      </button>
    </div>
  );
}