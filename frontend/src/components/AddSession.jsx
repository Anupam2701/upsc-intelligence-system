import { useState } from "react";
import axios from "axios";

const API = "https://upsc-intelligence-system.onrender.com";

function AddSession({ fetchSessions }) {
  const [form, setForm] = useState({
    date: "",
    subject: "",
    topic: "",
    duration: "",
    quality_score: "",
    revision: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${API}/sessions/`, {
        ...form,
        duration: Number(form.duration),
        quality_score: Number(form.quality_score),
      });

      alert("Added!");

      // 🔥 Refresh without reload
      fetchSessions();

      // ✅ Reset form
      setForm({
        date: "",
        subject: "",
        topic: "",
        duration: "",
        quality_score: "",
        revision: false,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow my-6">
      <h2 className="text-lg font-semibold mb-3">➕ Add Study Session</h2>

      <div className="grid md:grid-cols-2 gap-3">
        <input type="date" name="date" value={form.date} onChange={handleChange} className="border p-2 rounded" />
        <input placeholder="Subject" name="subject" value={form.subject} onChange={handleChange} className="border p-2 rounded" />
        <input placeholder="Topic" name="topic" value={form.topic} onChange={handleChange} className="border p-2 rounded" />
        <input placeholder="Duration" name="duration" value={form.duration} onChange={handleChange} className="border p-2 rounded" />
        <input placeholder="Quality (1-5)" name="quality_score" value={form.quality_score} onChange={handleChange} className="border p-2 rounded" />
      </div>

      <div className="mt-3">
        <label>
          <input type="checkbox" name="revision" checked={form.revision} onChange={handleChange} />
          <span className="ml-2">Revision</span>
        </label>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
}

export default AddSession;