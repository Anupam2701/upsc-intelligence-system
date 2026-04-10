import { useState, useEffect } from "react";
import axios from "axios";

const API = "https://upsc-intelligence-system.onrender.com";

export default function Editor({
  subject,
  topic,
  reference,
  subtopic,
  notes,
  fetchNotes
}) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (notes.length > 0) {
      setTitle(notes[0].title);
      setContent(notes[0].content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [notes]);

  // 🔥 AUTO SAVE (debounced feel)
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!title && !content) return;

      await axios.post(`${API}/notes/`, {
        title,
        content,
        subject,
        topic,
        reference,
        subtopic,
        type: "concept"
      });

      fetchNotes();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [title, content]);

  return (
    <div className="flex-1 bg-[#0a0a0a] p-6 flex flex-col">

      {/* BREADCRUMB */}
      <div className="text-xs text-gray-500 mb-3">
        {subject} › {topic} › {reference} › {subtopic}
      </div>

      {/* TITLE */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Untitled..."
        className="text-2xl font-semibold bg-transparent outline-none mb-4"
      />

      {/* CONTENT */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start writing..."
        className="flex-1 bg-transparent outline-none text-gray-300 resize-none"
      />
    </div>
  );
}