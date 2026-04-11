import { useState, useEffect } from "react";
import axios from "axios";

const API = "https://upsc-intelligence-system.onrender.com";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);

  const [form, setForm] = useState({
    subject: "",
    topic: "",
    reference: "",
    subtopic: "",
    title: "",
    content: ""
  });

  const fetchNotes = async () => {
    const res = await axios.get(`${API}/notes/`);
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAdd = async () => {
    await axios.post(`${API}/notes/`, form);
    fetchNotes();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/notes/${id}`);
    fetchNotes();
  };

  return (
    <div className="p-6 text-white space-y-4">

      <h1 className="text-2xl font-bold">Notes</h1>

      {/* FORM */}
      <div className="space-y-2">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            placeholder={key}
            value={form[key]}
            onChange={(e) =>
              setForm({ ...form, [key]: e.target.value })
            }
            className="input w-full"
          />
        ))}

        <button
          onClick={handleAdd}
          className="bg-indigo-500 px-4 py-2 rounded"
        >
          Add Note
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-2">
        {notes.map((n) => (
          <div key={n.id} className="bg-gray-800 p-3 rounded">
            <h3>{n.title}</h3>
            <p className="text-sm text-gray-400">{n.content}</p>

            <button
              onClick={() => handleDelete(n.id)}
              className="text-red-400 text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}