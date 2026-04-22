import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

const API = "https://upsc-intelligence-system.onrender.com";

const EXAMS = [
  "UPSC CSE",
  "RBI",
  "SEBI",
  "NABARD",
  "IRDAI",
  "PFRDA",
  "Interview Prep",
];

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [exam, setExam] = useState("UPSC CSE");

  const [newSubject, setNewSubject] = useState("");

  const [editor, setEditor] = useState({
    title: "",
    content: "",
  });

  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState(false);

  const textRef = useRef();

  // ✅ FIXED: useCallback
  const fetchNotes = useCallback(async () => {
    const res = await axios.get(`${API}/notes/?exam=${exam}`);
    setNotes(res.data);
  }, [exam]);

  // ✅ FIXED: useCallback
  const fetchSubjects = useCallback(async () => {
    const res = await axios.get(`${API}/notes/subjects?exam=${exam}`);
    setSubjects(res.data);

    if (res.data.length > 0) {
      setSelectedSubject((prev) =>
        prev && res.data.includes(prev) ? prev : res.data[0]
      );
    }
  }, [exam]);

  // ✅ FIXED DEPENDENCIES
  useEffect(() => {
    fetchNotes();
    fetchSubjects();
  }, [fetchNotes, fetchSubjects]);

  useEffect(() => {
    textRef.current?.focus();
  }, [selectedNote]);

  // 🔥 FILTER
  const filteredNotes = notes
    .filter((n) => n.subject === selectedSubject)
    .filter((n) =>
      n.title.toLowerCase().includes(search.toLowerCase())
    );

  // ✅ FIXED DEPENDENCIES
  const handleSave = useCallback(async () => {
    try {
      if (selectedNote) {
        await axios.put(`${API}/notes/${selectedNote.id}`, {
          title: editor.title,
          content: editor.content,
        });
      } else {
        await axios.post(`${API}/notes/`, {
          exam,
          subject: selectedSubject,
          topic: "",
          reference: "",
          subtopic: "",
          title: editor.title || "Untitled",
          content: editor.content,
        });
      }

      await fetchNotes();
      await fetchSubjects();

      setSaved(true);
      setTimeout(() => setSaved(false), 1200);

      setSelectedNote(null);
      setEditor({ title: "", content: "" });

    } catch (err) {
      console.error(err);
    }
  }, [selectedNote, editor, selectedSubject, exam, fetchNotes, fetchSubjects]);

  const handleNew = () => {
    setSelectedNote(null);
    setEditor({ title: "", content: "" });
  };

  const handleDelete = async () => {
    if (!selectedNote) return;

    await axios.delete(`${API}/notes/${selectedNote.id}`);
    await fetchNotes();
    handleNew();
  };

  const handleAddSubject = () => {
    if (!newSubject.trim()) return;

    setSubjects((prev) => [...prev, newSubject]);
    setSelectedSubject(newSubject);
    setNewSubject("");
  };

  const openNote = (note) => {
    setSelectedNote(note);
    setEditor({
      title: note.title,
      content: note.content,
    });
  };

  return (
    <div className="flex h-screen bg-[#020617] text-white">

      {/* LEFT PANEL */}
      <div className="w-1/4 p-4 space-y-4 border-r border-gray-800 overflow-y-auto">

        {/* EXAM DROPDOWN */}
        <select
          value={exam}
          onChange={(e) => {
            setExam(e.target.value);
            setSelectedSubject("");
          }}
          className="input w-full"
        >
          {EXAMS.map((e) => (
            <option key={e} value={e}>{e}</option>
          ))}
        </select>

        <h2 className="text-lg font-semibold">Subjects</h2>

        {/* SUBJECT LIST */}
        {subjects.map((s) => (
          <div
            key={s}
            onClick={() => {
              setSelectedSubject(s);
              handleNew();
            }}
            className={`p-3 rounded cursor-pointer ${
              selectedSubject === s
                ? "bg-indigo-600"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {s}
          </div>
        ))}

        {/* ADD SUBJECT */}
        <div className="flex gap-2">
          <input
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            placeholder="New subject"
            className="input w-full"
          />
          <button onClick={handleAddSubject} className="btn-primary">
            +
          </button>
        </div>

        {/* NEW NOTE */}
        <button
          onClick={handleNew}
          className="bg-green-600 px-3 py-2 rounded w-full hover:bg-green-500"
        >
          + New Note
        </button>

        {/* SEARCH */}
        <input
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input w-full"
        />

        {/* NOTES LIST */}
        <div className="space-y-2 max-h-[50vh] overflow-y-auto">
          {filteredNotes.map((n) => (
            <div
              key={n.id}
              onClick={() => openNote(n)}
              className={`p-2 rounded cursor-pointer ${
                selectedNote?.id === n.id
                  ? "bg-indigo-500"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {n.title}
            </div>
          ))}
        </div>

      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 p-6 overflow-y-auto">

        <div className="card max-w-4xl space-y-4">

          <input
            placeholder="Untitled"
            value={editor.title}
            onChange={(e) =>
              setEditor({ ...editor, title: e.target.value })
            }
            className="w-full bg-transparent text-2xl font-semibold outline-none"
          />

          <textarea
            ref={textRef}
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

          {saved && (
            <div className="text-green-400 text-sm">Saved ✓</div>
          )}

        </div>

      </div>
    </div>
  );
}