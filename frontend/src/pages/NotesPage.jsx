import { useState, useEffect } from "react";
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

  // FETCH NOTES
  const fetchNotes = async () => {
    const res = await axios.get(`${API}/notes/`);
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // FILTER
  const filteredNotes = notes.filter(
    (n) => n.subject === selectedSubject
  );

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

  // 🔥 SAVE (CREATE OR UPDATE)
  const handleSave = async () => {
    try {
      if (selectedNote) {
        // UPDATE
        await axios.put(`${API}/notes/${selectedNote.id}`, {
          title: editor.title,
          content: editor.content,
        });
      } else {
        // CREATE
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

      fetchNotes();
      handleNew();

    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // 🔥 DELETE
  const handleDelete = async () => {
    if (!selectedNote) return;

    await axios.delete(`${API}/notes/${selectedNote.id}`);

    fetchNotes();
    handleNew();
  };

  return (
    <div className="flex h-screen text-white">

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
            className={`p-3 rounded cursor-pointer ${
              selectedSubject === s
                ? "bg-indigo-600"
                : "bg-gray-800"
            }`}
          >
            {s}
          </div>
        ))}

        {/* NEW BUTTON */}
        <button
          onClick={handleNew}
          className="bg-green-600 px-3 py-2 rounded w-full"
        >
          + New Note
        </button>

        {/* NOTES LIST */}
        <div className="space-y-2 mt-4">

          {filteredNotes.map((n) => (
            <div
              key={n.id}
              onClick={() => openNote(n)}
              className={`p-2 rounded cursor-pointer ${
                selectedNote?.id === n.id
                  ? "bg-indigo-500"
                  : "bg-gray-800"
              }`}
            >
              {n.title}
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

        <div className="flex gap-3">

          <button
            onClick={handleSave}
            className="bg-indigo-600 px-6 py-2 rounded"
          >
            Save
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-600 px-6 py-2 rounded"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}