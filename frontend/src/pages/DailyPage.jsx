import { useState } from "react";
import axios from "axios";

const API = "https://upsc-intelligence-system.onrender.com";

export default function DailyPage({ sessions, fetchSessions }) {
  const today = new Date().toISOString().split("T")[0];

  const todaySessions = sessions.filter((s) => s.date === today);

  const totalTime = todaySessions.reduce((sum, s) => sum + s.duration, 0);

  const goal = 300; // 5 hrs goal
  const progress = Math.min((totalTime / goal) * 100, 100);

  const avgQuality =
    todaySessions.length > 0
      ? todaySessions.reduce((sum, s) => sum + s.quality_score, 0) /
        todaySessions.length
      : 0;

  const focusScore = Math.round(
    (progress * 0.6) + (avgQuality * 20)
  );

  const [form, setForm] = useState({
    date: today,
    subject: "",
    topic: "",
    duration: "",
    quality_score: "",
    revision: false,
  });

const handleSubmit = async () => {
  try {
    await axios.post(`${API}/sessions/`, {
      ...form,
      duration: Number(form.duration),
      quality_score: Number(form.quality_score),
    });

    await fetchSessions(); // 🔥 wait for refresh

    setForm({
      date: today,
      subject: "",
      topic: "",
      duration: "",
      quality_score: "",
      revision: false,
    });

  } catch (err) {
    console.error("ADD SESSION ERROR:", err.response?.data || err.message);
  }
};

  return (
    <div className="space-y-6 text-white">

      {/* 🔥 HEADER */}
      <h1 className="text-3xl font-bold">Daily Command Center 🚀</h1>

      {/* 🔥 STATS */}
      <div className="grid md:grid-cols-3 gap-4">

        <div className="card">
          <p className="text-gray-400">Focus Time</p>
          <h2 className="text-3xl font-bold text-indigo-400">
            {totalTime} min
          </h2>

          {/* progress bar */}
          <div className="mt-2 w-full bg-white/10 rounded-full h-2">
            <div
              className="bg-indigo-500 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="card">
          <p className="text-gray-400">Focus Score</p>
          <h2 className="text-3xl font-bold text-green-400">
            {focusScore}
          </h2>
        </div>

        <div className="card">
          <p className="text-gray-400">Sessions</p>
          <h2 className="text-3xl font-bold">
            {todaySessions.length}
          </h2>
        </div>

      </div>

      {/* 🔥 QUICK ADD (Notion style) */}
      <div className="card space-y-3">
        <h3 className="font-semibold">Quick Add ⚡</h3>

        <div className="grid md:grid-cols-5 gap-3">
          <input
            placeholder="Subject"
            value={form.subject}
            onChange={(e) =>
              setForm({ ...form, subject: e.target.value })
            }
            className="input"
          />

          <input
            placeholder="Topic"
            value={form.topic}
            onChange={(e) =>
              setForm({ ...form, topic: e.target.value })
            }
            className="input"
          />

          <input
            placeholder="Minutes"
            value={form.duration}
            onChange={(e) =>
              setForm({ ...form, duration: e.target.value })
            }
            className="input"
          />

          <input
            placeholder="Quality"
            value={form.quality_score}
            onChange={(e) =>
              setForm({ ...form, quality_score: e.target.value })
            }
            className="input"
          />

          <button
            onClick={handleSubmit}
            className="bg-indigo-500 hover:bg-indigo-600 rounded-lg"
          >
            Add
          </button>
        </div>
      </div>

      {/* 🔥 TIMELINE (Notion-like) */}
      <div className="card">
        <h3 className="mb-4 font-semibold">Timeline</h3>

        {todaySessions.length === 0 ? (
          <p className="text-gray-400">No sessions yet</p>
        ) : (
          todaySessions.map((s, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-l-2 border-indigo-500 pl-4 mb-3"
            >
              <div>
                <p className="font-medium">{s.subject}</p>
                <p className="text-xs text-gray-400">{s.topic}</p>
              </div>

              <span className="text-indigo-400">
                {s.duration} min
              </span>
            </div>
          ))
        )}
      </div>

    </div>
  );
}