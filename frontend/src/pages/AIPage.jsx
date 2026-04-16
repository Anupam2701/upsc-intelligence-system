import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const API = "https://upsc-intelligence-system.onrender.com";

export default function AIPage() {
  const [tab, setTab] = useState("chat");

  const [messages, setMessages] = useState(() => {
    return JSON.parse(localStorage.getItem("ai_chat")) || [];
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

      const fullText = res.data.answer;

      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "" },
      ]);

      let index = 0;

      const interval = setInterval(() => {
        index++;

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].content =
            fullText.slice(0, index);
          return updated;
        });

        if (index >= fullText.length) {
          clearInterval(interval);
          setLoading(false);
        }
      }, 10);

    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "⚠️ Error generating response" },
      ]);
      setLoading(false);
    }
  };

  // ================= PLANNER =================
  const generatePlan = async () => {
    setLoading(true);
    setOutput("");

    try {
      const res = await axios.get(`${API}/ai/plan`);
      setOutput(res.data.plan);
    } catch {
      setOutput("⚠️ Error generating plan");
    }

    setLoading(false);
  };

  // ================= STRATEGY =================
  const generateStrategy = async () => {
    setLoading(true);
    setOutput("");

    try {
      const res = await axios.get(`${API}/ai/strategy`);
      setOutput(res.data.strategy);
    } catch {
      setOutput("⚠️ Error generating strategy");
    }

    setLoading(false);
  };

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col text-white space-y-4">

      {/* HEADER */}
      <h1 className="text-3xl font-bold">
        AI Intelligence 🧠
      </h1>

      {/* TABS */}
      <div className="flex gap-3">
        {["chat", "planner", "strategy"].map((t) => (
          <button
            key={t}
            onClick={() => {
              setTab(t);
              setOutput("");
            }}
            className={`px-4 py-2 rounded-lg capitalize ${
              tab === t
                ? "bg-indigo-500"
                : "bg-white/10 text-gray-400"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ================= CHAT ================= */}
      {tab === "chat" && (
        <>
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
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-xl text-sm
                  ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500"
                      : "bg-white/10 border border-white/10"
                  }`}
                >
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            ))}

            {loading && (
              <p className="text-indigo-400 animate-pulse">
                AI is typing...
              </p>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* INPUT */}
          <div className="flex gap-2">
            <input
              placeholder="Ask UPSC question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button onClick={sendMessage} className="btn-primary">
              Send
            </button>
          </div>
        </>
      )}

      {/* ================= PLANNER ================= */}
      {tab === "planner" && (
        <div className="card space-y-4">
          <h3 className="text-lg font-semibold">
            📅 Tomorrow Planner
          </h3>

          <button onClick={generatePlan} className="btn-primary">
            Generate Plan
          </button>

          {loading && (
            <p className="text-indigo-400 animate-pulse">
              Generating plan...
            </p>
          )}

          {output && (
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 whitespace-pre-wrap">
              {output}
            </div>
          )}
        </div>
      )}

      {/* ================= STRATEGY ================= */}
      {tab === "strategy" && (
        <div className="card space-y-4">
          <h3 className="text-lg font-semibold">
            📊 Strategy Analysis
          </h3>

          <button onClick={generateStrategy} className="btn-primary">
            Analyze My Prep
          </button>

          {loading && (
            <p className="text-indigo-400 animate-pulse">
              Analyzing...
            </p>
          )}

          {output && (
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 whitespace-pre-wrap">
              {output}
            </div>
          )}
        </div>
      )}
    </div>
  );
}