import { useState } from "react";
import axios from "axios";

const API = "https://upsc-intelligence-system.onrender.com";

export default function AIPage() {
  const [tab, setTab] = useState("planner");

  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const [question, setQuestion] = useState("");

  // ================= PLANNER =================
  const generatePlan = async () => {
    setLoading(true);
    setOutput("");

    try {
      const res = await axios.post(`${API}/ai/plan`);
      setOutput(res.data.plan);
    } catch (err) {
      setOutput("⚠️ Error generating plan");
    }

    setLoading(false);
  };

  // ================= CHAT =================
  const askAI = async () => {
    if (!question) return;

    setLoading(true);
    setOutput("");

    try {
      const res = await axios.post(`${API}/ai/chat`, {
        question,
      });

      setOutput(res.data.answer);
    } catch (err) {
      setOutput("⚠️ AI error");
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
    } catch (err) {
      setOutput("⚠️ Error generating strategy");
    }

    setLoading(false);
  };

  return (
    <div className="space-y-6 text-white">

      {/* HEADER */}
      <h1 className="text-3xl font-bold">AI Intelligence Hub 🧠</h1>

      {/* TABS */}
      <div className="flex gap-3">
        {["planner", "chat", "strategy"].map((t) => (
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

      {/* ================= CONTENT ================= */}
      <div className="card space-y-4">

        {/* PLANNER */}
        {tab === "planner" && (
          <>
            <h3 className="font-semibold text-lg">
              📅 Tomorrow Planner
            </h3>

            <button
              onClick={generatePlan}
              className="btn-primary"
            >
              Generate Plan
            </button>
          </>
        )}

        {/* CHAT */}
        {tab === "chat" && (
          <>
            <h3 className="font-semibold text-lg">
              💬 Ask AI
            </h3>

            <div className="flex gap-2">
              <input
                placeholder="Ask UPSC doubt..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="input w-full"
              />

              <button onClick={askAI} className="btn-primary">
                Ask
              </button>
            </div>
          </>
        )}

        {/* STRATEGY */}
        {tab === "strategy" && (
          <>
            <h3 className="font-semibold text-lg">
              📊 Strategy Analysis
            </h3>

            <button
              onClick={generateStrategy}
              className="btn-primary"
            >
              Analyze My Prep
            </button>
          </>
        )}

        {/* LOADER */}
        {loading && (
          <p className="text-indigo-400 animate-pulse">
            AI is thinking...
          </p>
        )}

        {/* OUTPUT */}
        {output && !loading && (
          <div className="bg-white/5 p-4 rounded-xl border border-white/10 whitespace-pre-wrap">
            {output}
          </div>
        )}

      </div>
    </div>
  );
}
