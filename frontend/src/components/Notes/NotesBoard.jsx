import { useState } from "react";
import axios from "axios";

const tabs = ["concept", "revision", "mistake", "pyq"];
const API = "https://upsc-intelligence-system.onrender.com";

export default function NotesBoard({ notes, fetchNotes, selectedSubject, selectedTopic }) {
  const [activeTab, setActiveTab] = useState("concept");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  const filtered = notes.filter(n => n.type === activeTab);

  // ADD NOTE
  const handleAdd = async () => {
    if (!title || !content) return;

    await axios.post(`${API}/notes/`, {
      title,
      content,
      subject: selectedSubject,
      topic: selectedTopic,
      type: activeTab
    });

    setTitle("");
    setContent("");
    fetchNotes();
  };

  // DELETE
  const handleDelete = async (id) => {
    await axios.delete(`${API}/notes/${id}`);
    fetchNotes();
  };

  // UPDATE
  const handleUpdate = async (note) => {
    await axios.put(`${API}/notes/${note.id}`, {
      title: note.title,
      content: note.content
    });
    setEditingId(null);
    fetchNotes();
  };

  return (
    <div className="flex-1 p-6 space-y-5">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-semibold">
          {selectedTopic || "Select a topic"}
        </h2>
        <p className="text-gray-400 text-sm">
          Organize your knowledge like a pro 🧠
        </p>
      </div>

      {/* TABS */}
      <div className="flex gap-3">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl capitalize transition ${
              activeTab === tab
                ? "bg-indigo-500 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ADD NOTE */}
      <div className="bg-gray-900 p-4 rounded-xl space-y-2 border border-gray-800">
        <input
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 outline-none"
        />

        <textarea
          placeholder="Write your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 h-24 outline-none"
        />

        <button
          onClick={handleAdd}
          className="bg-indigo-500 px-4 py-2 rounded hover:bg-indigo-600 transition"
        >
          Save
        </button>
      </div>

      {/* NOTES LIST */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">

        {filtered.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No notes yet. Start writing 🚀
          </p>
        ) : (
          filtered.map(note => (
            <div
              key={note.id}
              className="bg-gray-900 p-4 rounded-xl hover:bg-gray-800 transition group"
            >

              {editingId === note.id ? (
                <>
                  <input
                    value={note.title}
                    onChange={(e) => note.title = e.target.value}
                    className="w-full bg-gray-800 p-2 rounded mb-2"
                  />

                  <textarea
                    value={note.content}
                    onChange={(e) => note.content = e.target.value}
                    className="w-full bg-gray-800 p-2 rounded"
                  />

                  <button
                    onClick={() => handleUpdate(note)}
                    className="mt-2 bg-green-500 px-3 py-1 rounded"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{note.title}</h3>

                    <div className="opacity-0 group-hover:opacity-100 transition flex gap-2">
                      <button
                        onClick={() => setEditingId(note.id)}
                        className="text-yellow-400"
                      >
                        ✏️
                      </button>

                      <button
                        onClick={() => handleDelete(note.id)}
                        className="text-red-400"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mt-1">
                    {note.content}
                  </p>
                </>
              )}

            </div>
          ))
        )}
      </div>

    </div>
  );
}