import { useState, useEffect } from "react";
import axios from "axios";
import NotesBoard from "../components/Notes/NotesBoard";

const API = "https://upsc-intelligence-system.onrender.com";

export default function NotesPage() {
  const [notes, setNotes] = useState({});
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  // 🔥 FETCH STRUCTURED NOTES
  const fetchNotes = async () => {
    const res = await axios.get(`${API}/notes/structured`);
    setNotes(res.data || {});
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // 🔥 FLATTEN NOTES FOR SELECTED TOPIC
  const getFlatNotes = () => {
    if (!selectedSubject || !selectedTopic) return [];

    const topicData = notes[selectedSubject]?.[selectedTopic] || {};

    return Object.values(topicData).flat();
  };

  return (
    <div className="flex gap-6 text-white h-[85vh]">

      {/* 🔥 SUBJECT PANEL */}
      <div className="w-1/6 card overflow-y-auto">
        <h2 className="mb-3 font-semibold">Subjects</h2>

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
      <div className="flex-1 overflow-y-auto">

        {/* EMPTY STATE */}
        {!selectedSubject && (
          <div className="card text-center py-10">
            <h2 className="text-lg font-semibold">
              Select a subject to begin 🚀
            </h2>
          </div>
        )}

        {selectedSubject && !selectedTopic && (
          <div className="card text-center py-10">
            <h2 className="text-lg font-semibold">
              Select or create a topic
            </h2>
          </div>
        )}

        {/* 🔥 GOD LEVEL NOTES UI */}
        {selectedSubject && selectedTopic && (
          <NotesBoard
            notes={getFlatNotes()}
            fetchNotes={fetchNotes}
            selectedSubject={selectedSubject}
            selectedTopic={selectedTopic}
          />
        )}
      </div>
    </div>
  );
}