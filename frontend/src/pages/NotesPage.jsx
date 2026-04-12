import { useState, useEffect } from "react";
import axios from "axios";

const API = "https://upsc-intelligence-system.onrender.com";

// 🔥 FIXED SUBJECTS
const SUBJECTS = ["HISTORY", "POLITY", "GEOGRAPHY"];

export default function NotesPage() {
  const [notes, setNotes] = useState([]);

  const [selectedSubject, setSelectedSubject] = useState("HISTORY");

  const [editor, setEditor] = useState({
    title: "",
    content: "",
  });

  // FETCH NOTES
  const fetchNotes = async () => {
    const res = await axios.get(`${API}/notes/`);
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // 🔥 SAVE NOTE (CONTROLLED)
  const handleSave = async () => {
    if (!editor.content && !editor.title) return;

    try {
      const res = await axios.post(`${API}/notes/`, {
        subject: selectedSubject,
        topic: "",
        reference: "",
        subtopic: "",
        title: editor.title || "Untitled",
        content: editor.content,
        type: "concept",
      });

      console.log("Saved:", res.data);

      // Clear editor after save
      setEditor({ title: "", content: "" });

      fetchNotes();
    } catch (err) {
      console.error("Save Error:", err.response?.data || err.message);
    }
  };

  // FILTER NOTES BY SUBJECT
  const filteredNotes = notes.filter(
    (n) => n.subject === selectedSubject
  );

  return (
    <div className="flex h-screen text-white">

      {/* LEFT PANEL */}
      <div className="w-1/4 p-4 space-y-4 border-r border-gray-800">

        <h2 className="text-lg font-semibold">Subjects</h2>

        {SUBJECTS.map((s) => (
          <div
            key={s}
            onClick={() => setSelectedSubject(s)}
            className={`p-3 rounded cursor-pointer ${
              selectedSubject === s
                ? "bg-indigo-600"
                : "bg-gray-800"
            }`}
          >
            {s}
          </div>
        ))}

        {/* NOTES LIST */}
        <div className="mt-6 space-y-2">
          <h3 className="text-sm text-gray-400">Notes</h3>

          {filteredNotes.map((n) => (
            <div key={n.id} className="text-sm text-gray-300">
              • {n.title}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 p-6 space-y-4">

        <input
          placeholder="Title..."
          value={editor.title}
          onChange={(e) =>
            setEditor({ ...editor, title: e.target.value })
          }
          className="w-full bg-transparent text-xl outline-none"
        />

        <textarea
          placeholder="Start writing..."
          value={editor.content}
          onChange={(e) =>
            setEditor({ ...editor, content: e.target.value })
          }
          className="w-full h-[70vh] bg-transparent outline-none text-gray-300"
        />

        {/* 🔥 SAVE BUTTON */}
        <button
          onClick={handleSave}
          className="bg-indigo-600 px-6 py-2 rounded hover:bg-indigo-500"
        >
          Save Note
        </button>

      </div>
    </div>
  );
}