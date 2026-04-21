import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import PageHeader from "../components/PageHeader";

const API = "https://upsc-intelligence-system.onrender.com";

export default function DailyPage({ sessions, fetchSessions }) {

  const today = new Date().toISOString().split("T")[0];

  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = tomorrowDate.toISOString().split("T")[0];

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

  // ================= FORM =================
  const [form, setForm] = useState({
    date: today,
    subject: "",
    topic: "",
    start_time: "",
    end_time: "",
    quality_score: "",
    exam: "UPSC CSE",
  });

  // ================= DROPDOWN =================
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState(null);

  const exams = [
    "UPSC CSE",
    "RBI",
    "SEBI",
    "NABARD",
    "IRDAI",
    "PFRDA",
    "Interview Prep",
  ];

  const handleOpenDropdown = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setDropdownPos({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
    });

    setDropdownOpen((prev) => !prev);
  };

  // ================= TODO =================
  const [todos, setTodos] = useState([]);
  const [todayInput, setTodayInput] = useState("");
  const [tomorrowInput, setTomorrowInput] = useState("");

  const fetchTodos = async () => {
    const res = await axios.get(`${API}/todos/`);
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
    axios.post(`${API}/todos/rollover`);
  }, []);

  const addTodo = async (type) => {
    const text = type === "today" ? todayInput : tomorrowInput;
    if (!text) return;

    const date = type === "today" ? today : tomorrow;

    await axios.post(`${API}/todos/`, { text, date, type });
    fetchTodos();

    type === "today" ? setTodayInput("") : setTomorrowInput("");
  };

  const toggleTodo = async (id) => {
    await axios.put(`${API}/todos/${id}`);
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/todos/${id}`);
    fetchTodos();
  };

  // ================= UTILS =================
  const calculateDuration = (start, end) => {
    const s = new Date(`1970-01-01T${start}`);
    const e = new Date(`1970-01-01T${end}`);
    return (e - s) / (1000 * 60);
  };

  // ================= ADD SESSION =================
  const handleSubmit = async () => {
    try {
      const duration = calculateDuration(form.start_time, form.end_time);

      await axios.post(`${API}/sessions/`, {
        ...form,
        duration,
        quality_score: Number(form.quality_score),
        revision: false,
      });

      fetchSessions();

      setForm({
        date: today,
        subject: "",
        topic: "",
        start_time: "",
        end_time: "",
        quality_score: "",
        exam: "UPSC CSE",
      });

    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/sessions/${id}`);
    fetchSessions();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      <PageHeader
        title="Daily Command Center 🚀"
        subtitle="Log sessions and track focus"
      />

      {/* ================= STATS ================= */}
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

      {/* ================= TODO ================= */}
      <div className="grid md:grid-cols-2 gap-4">

        <div className="card space-y-3">
          <h3>Today's Plan ☀️</h3>

          <div className="flex gap-2">
            <input
              value={todayInput}
              onChange={(e) => setTodayInput(e.target.value)}
              className="input flex-1"
              placeholder="Add today's task..."
            />
            <button onClick={() => addTodo("today")} className="btn-primary">
              Add
            </button>
          </div>

          {todos.filter(t => t.date === today).map(t => (
            <div key={t.id} className="flex justify-between">
              <span onClick={() => toggleTodo(t.id)} className="cursor-pointer">
                {t.text}
              </span>
              <button onClick={() => deleteTodo(t.id)} className="text-red-400">
                Delete
              </button>
            </div>
          ))}
        </div>

        <div className="card space-y-3">
          <h3>Tomorrow Plan 🌙</h3>

          <div className="flex gap-2">
            <input
              value={tomorrowInput}
              onChange={(e) => setTomorrowInput(e.target.value)}
              className="input flex-1"
              placeholder="Plan tomorrow..."
            />
            <button onClick={() => addTodo("tomorrow")} className="btn-primary">
              Add
            </button>
          </div>

          {todos.filter(t => t.date === tomorrow).map(t => (
            <div key={t.id} className="flex justify-between">
              <span>{t.text}</span>
              <button onClick={() => deleteTodo(t.id)} className="text-red-400">
                Delete
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* ================= QUICK ADD ================= */}
      <div className="card space-y-3">
        <h3>Quick Add ⚡</h3>

        {/* ✅ PORTAL DROPDOWN */}
        <button
          onClick={handleOpenDropdown}
          className="input w-full flex justify-between items-center"
        >
          {form.exam}
          <span>▼</span>
        </button>

        {dropdownOpen &&
          createPortal(
            <div
              className="fixed bg-[#0f172a] border border-white/10 rounded-lg shadow-xl z-[9999]"
              style={{
                top: dropdownPos?.top,
                left: dropdownPos?.left,
                width: dropdownPos?.width,
              }}
            >
              {exams.map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    setForm({ ...form, exam: item });
                    setDropdownOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-indigo-500 cursor-pointer"
                >
                  {item}
                </div>
              ))}
            </div>,
            document.body
          )}

        <div className="grid md:grid-cols-5 gap-3">

          <input className="input" placeholder="Subject"
            value={form.subject}
            onChange={(e)=>setForm({...form, subject:e.target.value})}
          />

          <input className="input" placeholder="Topic"
            value={form.topic}
            onChange={(e)=>setForm({...form, topic:e.target.value})}
          />

          <input type="time" className="input"
            value={form.start_time}
            onChange={(e)=>setForm({...form, start_time:e.target.value})}
          />

          <input type="time" className="input"
            value={form.end_time}
            onChange={(e)=>setForm({...form, end_time:e.target.value})}
          />

          <input className="input" placeholder="Quality"
            value={form.quality_score}
            onChange={(e)=>setForm({...form, quality_score:e.target.value})}
          />

        </div>

        <button onClick={handleSubmit} className="btn-primary">
          Add Session
        </button>
      </div>

      {/* ================= TIMELINE ================= */}
      <div className="card">
        <h3>Timeline</h3>

        {todaySessions.map((s) => (
          <div key={s.id} className="flex justify-between mt-3">
            <div>
              {s.start_time} → {s.end_time}
              <div>{s.subject} ({s.exam})</div>
            </div>

            <div>
              {s.duration} min
              <button onClick={()=>handleDelete(s.id)} className="text-red-400 ml-2">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}