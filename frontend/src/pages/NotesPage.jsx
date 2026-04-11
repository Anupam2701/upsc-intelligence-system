import { useState, useEffect } from "react";
import axios from "axios";

const API = "https://upsc-intelligence-system.onrender.com";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);

  const [selected, setSelected] = useState({
    subject: "",
    topic: "",
    reference: "",
  });

  const [editor, setEditor] = useState({
    title: "",
    content: "",
  });

  // 🔥 FETCH
  const fetchNotes = async () => {
    const res = await axios.get(`${API}/notes/`);
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // 🔥 AUTO SAVE
  useEffect(() => {
    if (!editor.content && !editor.title) return;

    const timeout = setTimeout(async () => {
      try {
        await axios.post(`${API}/notes/`, {
          ...selected,
          title: editor.title || "Untitled",
          content: editor.content,
        });

        fetchNotes();
      } catch (err) {
        console.error(err);
      }
    }, 1000); // debounce

    return () => clearTimeout(timeout);
  }, [editor]);

  // 🔥 UNIQUE LISTS
  const subjects = [...new Set(notes.map(n => n.subject))];
  const topics = [...new Set(notes.filter(n => n.subject === selected.subject).map(n => n.topic))];
  const references = [...new Set(notes.filter(n => n.topic === selected.topic).map(n => n.reference))];

  return (
    <div className="flex h-screen text-white">

      {/* LEFT PANEL */}
      <div className="flex gap-4 w-1/3 p-4">

        {/* SUBJECTS */}
        <div className="w-1/3 space-y-2">
          <h3 className="text-sm text-gray-400">Subjects</h3>
          {subjects.map((s, i) => (
            <div
              key={i}
              onClick={() => setSelected({ subject: s, topic: "", reference: "" })}
              className={`p-2 rounded cursor-pointer ${
                selected.subject === s ? "bg-indigo-600" : "bg-gray-800"
              }`}
            >
              {s}
            </div>
          ))}
        </div>

        {/* TOPICS */}
        <div className="w-1/3 space-y-2">
          <h3 className="text-sm text-gray-400">Topics</h3>
          {topics.map((t, i) => (
            <div
              key={i}
              onClick={() => setSelected({ ...selected, topic: t, reference: "" })}
              className={`p-2 rounded cursor-pointer ${
                selected.topic === t ? "bg-indigo-600" : "bg-gray-800"
              }`}
            >
              {t}
            </div>
          ))}
        </div>

        {/* REFERENCES */}
        <div className="w-1/3 space-y-2">
          <h3 className="text-sm text-gray-400">Refs</h3>
          {references.map((r, i) => (
            <div
              key={i}
              onClick={() => setSelected({ ...selected, reference: r })}
              className={`p-2 rounded cursor-pointer ${
                selected.reference === r ? "bg-indigo-600" : "bg-gray-800"
              }`}
            >
              {r}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL (EDITOR) */}
      <div className="flex-1 p-6 space-y-4">

        <input
          placeholder="Title..."
          value={editor.title}
          onChange={(e) => setEditor({ ...editor, title: e.target.value })}
          className="w-full bg-transparent text-xl outline-none"
        />

        <textarea
          placeholder="Start writing..."
          value={editor.content}
          onChange={(e) => setEditor({ ...editor, content: e.target.value })}
          className="w-full h-[70vh] bg-transparent outline-none text-gray-300"
        />

      </div>
    </div>
  );
}