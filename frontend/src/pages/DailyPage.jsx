import { useState } from "react";
import axios from "axios";
import PageHeader from "../components/PageHeader";

const API = "https://upsc-intelligence-system.onrender.com";

export default function DailyPage({ sessions, fetchSessions }) {
  const today = new Date().toISOString().split("T")[0];

  const todaySessions = sessions.filter((s) => s.date === today);

  const totalTime = todaySessions.reduce((sum, s) => sum + s.duration, 0);

  const goal = 300;
  const progress = Math.min((totalTime / goal) * 100, 100);

  const avgQuality =
    todaySessions.length > 0
      ? todaySessions.reduce((sum, s) => sum + s.quality_score, 0) /
        todaySessions.length
      : 0;

  const focusScore = Math.round(progress * 0.6 + avgQuality * 20);

  const [form, setForm] = useState({
    date: today,
    subject: "",
    topic: "",
    start_time: "",
    end_time: "",
    quality_score: "",
  });

  // 🔥 AUTO DURATION
  const calculateDuration = (start, end) => {
    const s = new Date(`1970-01-01T${start}`);
    const e = new Date(`1970-01-01T${end}`);
    return (e - s) / (1000 * 60);
  };

  // 🔥 ADD SESSION
  const handleSubmit = async () => {
    try {
      const duration = calculateDuration(form.start_time, form.end_time);

      await axios.post(`${API}/sessions/`, {
        ...form,
        duration,
        quality_score: Number(form.quality_score),
        revision: false,
      });

      await fetchSessions();

      setForm({
        date: today,
        subject: "",
        topic: "",
        start_time: "",
        end_time: "",
        quality_score: "",
      });

    } catch (err) {
      console.error("ADD SESSION ERROR:", err.response?.data || err.message);
    }
  };

  // 🔥 DELETE
  const handleDelete = async (id) => {
    await axios.delete(`${API}/sessions/${id}`);
    fetchSessions();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* HEADER */}
      <PageHeader
  title="Daily Command Center 🚀"
  subtitle="Log sessions and track focus"
/>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-4">

        <div className="card">
          <p className="text-gray-400">Focus Time</p>
          <h2 className="text-3xl font-bold text-indigo-400">
            {totalTime} min
          </h2>

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

      {/* QUICK ADD */}
      <div className="card space-y-3">
        <h3 className="font-semibold">Quick Add ⚡</h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">

          <input
            placeholder="Subject"
            value={form.subject}
            onChange={(e) =>
              setForm({ ...form, subject: e.target.value })
            }
            className="input w-full"
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
            type="time"
            value={form.start_time}
            onChange={(e) =>
              setForm({ ...form, start_time: e.target.value })
            }
            className="input"
          />

          <input
            type="time"
            value={form.end_time}
            onChange={(e) =>
              setForm({ ...form, end_time: e.target.value })
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

        </div>

        <button
          onClick={handleSubmit}
          className="bg-indigo-500 hover:bg-indigo-600 rounded-lg px-4 py-2"
        >
          Add Session
        </button>
      </div>

      {/* TIMELINE */}
      <div className="card">
        <h3 className="mb-4 font-semibold">Timeline</h3>

        {todaySessions.length === 0 ? (
          <p className="text-gray-400">No sessions yet</p>
        ) : (
          todaySessions.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between border-l-2 border-indigo-500 pl-4 mb-3"
            >
              <div>
                <p className="font-medium">
                  {s.start_time} → {s.end_time}
                </p>
                <p className="text-sm">{s.subject}</p>
                <p className="text-xs text-gray-400">{s.topic}</p>
              </div>

              <div className="flex gap-3 items-center">
                <span className="text-indigo-400">
                  {s.duration} min
                </span>

                <button
                  onClick={() => handleDelete(s.id)}
                  className="text-red-400 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}