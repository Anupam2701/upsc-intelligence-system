import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

const API = "https://upsc-intelligence-system.onrender.com";

const SUBJECTS = ["HISTORY", "POLITY", "GEOGRAPHY"];

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("HISTORY");
  const [selectedNote, setSelectedNote] = useState(null);

  const [editor, setEditor] = useState({
    title: "",
    content: "",
  });

  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [pinned, setPinned] = useState([]);
  const [showCommand, setShowCommand] = useState(false);
  const [saved, setSaved] = useState(false);

  const textRef = useRef();

  // 🔥 FETCH
  const fetchNotes = async () => {
    const res = await axios.get(`${API}/notes/`);
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // 🔥 AUTO FOCUS
  useEffect(() => {
    textRef.current?.focus();
  }, [selectedNote]);

  // 🔥 FILTER
  const filteredNotes = notes
    .filter((n) => n.subject === selectedSubject)
    .filter((n) =>
      n.title.toLowerCase().includes(search.toLowerCase())
    );

  // 🔥 SAVE (FIXED WITH useCallback)
  const handleSave = useCallback(async () => {
    try {
      if (selectedNote) {
        await axios.put(`${API}/notes/${selectedNote.id}`, {
          title: editor.title,
          content: editor.content,
        });
      } else {
        await axios.post(`${API}/notes/`, {
          subject: selectedSubject,
          topic: "",
          reference: "",
          subtopic: "",
          title: editor.title || "Untitled",
          content: editor.content,
          type: "concept",
        });
      }

      const res = await axios.get(`${API}/notes/`);
      setNotes(res.data);

      setSaved(true);
      setTimeout(() => setSaved(false), 1200);

      setSelectedNote(null);
      setEditor({ title: "", content: "" });

    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  }, [selectedNote, editor, selectedSubject]);

  // 🔥 KEYBOARD SHORTCUTS
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowDown") {
        setActiveIndex((prev) =>
          Math.min(prev + 1, filteredNotes.length - 1)
        );
      }

      if (e.key === "ArrowUp") {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }

      if (e.key === "Enter") {
        if (filteredNotes[activeIndex]) {
          openNote(filteredNotes[activeIndex]);
        }
      }

      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setShowCommand((prev) => !prev);
      }

      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [filteredNotes, activeIndex, handleSave]);

  // 🔥 OPEN NOTE
  const openNote = (note) => {
    setSelectedNote(note);
    setEditor({
      title: note.title,
      content: note.content,
    });
  };

  // 🔥 NEW NOTE
  const handleNew = () => {
    setSelectedNote(null);
    setEditor({ title: "", content: "" });
  };

  // 🔥 DELETE
  const handleDelete = async () => {
    if (!selectedNote) return;

    await axios.delete(`${API}/notes/${selectedNote.id}`);

    const res = await axios.get(`${API}/notes/`);
    setNotes(res.data);

    handleNew();
  };

  // 🔥 PIN
  const togglePin = (id) => {
    setPinned((prev) =>
      prev.includes(id)
        ? prev.filter((p) => p !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="flex h-screen bg-[#020617] text-white">

      {/* LEFT PANEL */}
      <div className="w-1/4 p-4 space-y-4 border-r border-gray-800">

        <h2 className="text-lg font-semibold">Subjects</h2>

        {SUBJECTS.map((s) => (
          <div
            key={s}
            onClick={() => {
              setSelectedSubject(s);
              handleNew();
            }}
            className={`p-3 rounded cursor-pointer transition-all duration-200 ${
              selectedSubject === s
                ? "bg-indigo-600"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {s}
          </div>
        ))}

        <button
          onClick={handleNew}
          className="bg-green-600 px-3 py-2 rounded w-full hover:bg-green-500 transition"
        >
          + New Note
        </button>

        {/* SEARCH */}
        <input
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 rounded bg-gray-900 outline-none text-sm"
        />

        {/* PINNED */}
        {pinned.length > 0 && (
          <div>
            <h3 className="text-xs text-gray-400 mb-1">Pinned</h3>
            {notes
              .filter((n) => pinned.includes(n.id))
              .map((n) => (
                <div key={n.id} className="text-yellow-400 text-sm">
                  📌 {n.title}
                </div>
              ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {filteredNotes.length === 0 && (
          <div className="text-gray-500 text-sm mt-4">
            No notes yet. Start writing ✍️
          </div>
        )}

        {/* NOTES LIST */}
        <div className="space-y-2 mt-2 max-h-[55vh] overflow-y-auto">

          {filteredNotes.map((n, i) => (
            <div
              key={n.id}
              onClick={() => openNote(n)}
              className={`group p-2 rounded cursor-pointer flex justify-between items-center transition-all duration-200 ${
                selectedNote?.id === n.id
                  ? "bg-indigo-500"
                  : i === activeIndex
                  ? "bg-gray-700"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              <span>{n.title}</span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePin(n.id);
                }}
                className="text-yellow-400 opacity-0 group-hover:opacity-100 transition"
              >
                📌
              </button>
            </div>
          ))}

        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 p-6">
  <div className="card max-w-3xl space-y-4">

    <input
      placeholder="Untitled"
      value={editor.title}
      onChange={(e) =>
        setEditor({ ...editor, title: e.target.value })
      }
      className="w-full bg-transparent text-2xl font-semibold outline-none"
    />

    <textarea
      placeholder="Start writing..."
      value={editor.content}
      onChange={(e) =>
        setEditor({ ...editor, content: e.target.value })
      }
      className="w-full h-[70vh] bg-transparent outline-none text-gray-300"
    />

    <div className="flex gap-3">
      <button onClick={handleSave} className="btn-primary">
        Save
      </button>

      <button
        onClick={handleDelete}
        className="bg-red-500 px-4 py-2 rounded-lg"
      >
        Delete
      </button>
    </div>

  </div>

        {/* SAVE FEEDBACK */}
        {saved && (
          <div className="text-green-400 text-sm">Saved ✓</div>
        )}

        <div className="flex gap-3">

          <button
            onClick={handleSave}
            className="bg-indigo-600 px-6 py-2 rounded hover:bg-indigo-500 transition"
          >
            Save
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-600 px-6 py-2 rounded hover:bg-red-500 transition"
          >
            Delete
          </button>

        </div>

      </div>

      {/* COMMAND PALETTE */}
      {showCommand && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded w-1/3 border border-gray-800">
            <input
              placeholder="Search or create..."
              className="w-full p-3 bg-gray-800 outline-none"
            />
          </div>
        </div>
      )}

    </div>
  );
}