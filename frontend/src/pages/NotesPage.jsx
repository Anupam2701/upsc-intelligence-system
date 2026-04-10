import { useState, useEffect } from "react";
import axios from "axios";

const TYPES = ["concept", "revision", "mistake", "pyq"];

const API = "https://upsc-intelligence-system.onrender.com";

export default function NotesPage() {
  const [notes, setNotes] = useState({});
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");

  const [activeAdd, setActiveAdd] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  // 🔥 FETCH
  const fetchNotes = async () => {
    const res = await axios.get(`${API}/notes/structured`);
    setNotes(res.data || {});
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // 🔥 ADD
  const handleAdd = async (type) => {
    if (!selectedSubject || !selectedTopic || !form.title) return;

    await axios.post(`${API}/notes/`, {
      ...form,
      subject: selectedSubject,
      topic: selectedTopic,
      type,
    });

    setForm({ title: "", content: "" });
    setActiveAdd(null);
    fetchNotes();
  };

 const handleDelete = async (id) => {
  try {
    await axios.delete(`${API}/notes/${id}`);
    fetchNotes();
  } catch (err) {
    console.error(err);
  }
};

  // 🔥 UPDATE
  const handleUpdate = async (id) => {
    await axios.put(`${API}/notes/${id}`, {
  title: form.title,
  content: form.content
});

    setEditingId(null);
    setForm({ title: "", content: "" });
    fetchNotes();
  };

  return (
    <div className="flex gap-6 text-white h-[85vh]">

      {/* 🔥 SUBJECT PANEL */}
      <div className="w-1/6 card overflow-y-auto">
        <h2 className="mb-3 font-semibold">Subjects</h2>

        {/* CREATE SUBJECT */}
        <input
          placeholder="➕ New Subject"
          className="input mb-3"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value) {
              setSelectedSubject(e.target.value);
              setSelectedTopic(null);
              e.target.value = "";
            }
          }}
        />

        {Object.keys(notes).length === 0 && (
          <p className="text-gray-400 text-sm">No notes yet</p>
        )}

        {Object.keys(notes).map((sub) => (
          <div
            key={sub}
            onClick={() => {
              setSelectedSubject(sub);
              setSelectedTopic(null);
            }}
            className={`p-2 rounded cursor-pointer ${
              selectedSubject === sub
                ? "bg-indigo-500/30"
                : "hover:bg-white/10"
            }`}
          >
            {sub}
          </div>
        ))}
      </div>

      {/* 🔥 TOPIC PANEL */}
      <div className="w-1/6 card overflow-y-auto">
        <h2 className="mb-3 font-semibold">Topics</h2>

        {selectedSubject && (
          <input
            placeholder="➕ New Topic"
            className="input mb-3"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value) {
                setSelectedTopic(e.target.value);
                e.target.value = "";
              }
            }}
          />
        )}

        {selectedSubject &&
          Object.keys(notes[selectedSubject] || {}).map((topic) => (
            <div
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`p-2 rounded cursor-pointer ${
                selectedTopic === topic
                  ? "bg-indigo-500/30"
                  : "hover:bg-white/10"
              }`}
            >
              {topic}
            </div>
          ))}
      </div>

      {/* 🔥 MAIN PANEL */}
      <div className="flex-1 space-y-4 overflow-y-auto">

        {/* EMPTY STATE */}
        {Object.keys(notes).length === 0 && (
          <div className="card text-center py-10">
            <h2 className="text-lg font-semibold">Start Taking Notes 🚀</h2>
            <p className="text-gray-400 text-sm">
              Create a subject and topic to begin
            </p>
          </div>
        )}

        {/* SEARCH + FILTER */}
        <div className="flex gap-3">
          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input flex-1"
          />

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="input"
          >
            <option value="">All</option>
            {TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        {!selectedTopic && selectedSubject && (
          <p className="text-gray-400">Select or create a topic</p>
        )}

        {/* 🔥 NOTES */}
        {selectedTopic &&
          TYPES.map((type) => {
            const safeNotes =
              notes?.[selectedSubject]?.[selectedTopic]?.[type] || [];

            return (
              <div key={type} className="card">

                <div className="flex justify-between mb-2">
                  <h3 className="capitalize font-semibold">{type}</h3>

                  <button
                    onClick={() => setActiveAdd(type)}
                    className="text-indigo-400 text-sm"
                  >
                    + Add
                  </button>
                </div>

                {/* ADD */}
                {activeAdd === type && (
                  <div className="space-y-2 mb-3">
                    <input
                      placeholder="Title"
                      value={form.title}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                      className="input"
                    />

                    <textarea
                      placeholder="Content"
                      value={form.content}
                      onChange={(e) =>
                        setForm({ ...form, content: e.target.value })
                      }
                      className="input h-20"
                    />

                    <button
                      onClick={() => handleAdd(type)}
                      className="bg-indigo-500 px-3 py-1 rounded"
                    >
                      Save
                    </button>
                  </div>
                )}

                {/* LIST */}
                {safeNotes
                  .filter((n) =>
                    n.title.toLowerCase().includes(search.toLowerCase())
                  )
                  .filter((n) =>
                    filterType ? n.type === filterType : true
                  )
                  .map((n) => (
                    <div key={n.id} className="border-b py-2">

                      {editingId === n.id ? (
                        <>
                          <input
                            value={form.title}
                            onChange={(e) =>
                              setForm({ ...form, title: e.target.value })
                            }
                            className="input"
                          />

                          <textarea
                            value={form.content}
                            onChange={(e) =>
                              setForm({ ...form, content: e.target.value })
                            }
                            className="input"
                          />

                          <button
                            onClick={() => handleUpdate(n.id)}
                            className="bg-green-500 px-2 py-1 rounded"
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <>
                          <p className="font-medium">{n.title}</p>
                          <p className="text-sm text-gray-400">
                            {n.content}
                          </p>

                          <div className="flex gap-3 text-xs mt-1">
                            <button
                              onClick={() => {
                                setEditingId(n.id);
                                setForm({
                                  title: n.title,
                                  content: n.content,
                                });
                              }}
                              className="text-indigo-400"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => handleDelete(n.id)}
                              className="text-red-400"
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}

              </div>
            );
          })}
      </div>
    </div>
  );
}