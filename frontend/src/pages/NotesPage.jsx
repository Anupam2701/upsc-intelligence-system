import { useState, useEffect } from "react";
import axios from "axios";
import Column from "../components/Notes/Column";
import Editor from "../components/Notes/Editor";

const API = "https://upsc-intelligence-system.onrender.com"

export default function NotesPage() {
  const [data, setData] = useState({});

  const [subject, setSubject] = useState(null);
  const [topic, setTopic] = useState(null);
  const [reference, setReference] = useState(null);
  const [subtopic, setSubtopic] = useState(null);

  // FETCH
  const fetchNotes = async () => {
    const res = await axios.get(`${API}/notes/structured`);
    setData(res.data || {});
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // DERIVED DATA
  const subjects = Object.keys(data);

  const topics = subject ? Object.keys(data[subject] || {}) : [];

  const references =
    subject && topic
      ? Object.keys(data[subject][topic] || {})
      : [];

  const subtopics =
    subject && topic && reference
      ? Object.keys(data[subject][topic][reference] || {})
      : [];

  const notes =
    subject && topic && reference && subtopic
      ? data[subject][topic][reference][subtopic]?.concept || []
      : [];

  return (
    <div className="flex h-[90vh] text-white">

      <Column
        title="Subject"
        items={subjects}
        selected={subject}
        onSelect={(v) => {
          setSubject(v);
          setTopic(null);
          setReference(null);
          setSubtopic(null);
        }}
      />

      <Column
        title="Topic"
        items={topics}
        selected={topic}
        onSelect={(v) => {
          setTopic(v);
          setReference(null);
          setSubtopic(null);
        }}
      />

      <Column
        title="Reference"
        items={references}
        selected={reference}
        onSelect={(v) => {
          setReference(v);
          setSubtopic(null);
        }}
      />

      <Column
        title="Subtopic"
        items={subtopics}
        selected={subtopic}
        onSelect={setSubtopic}
      />

      {/* EDITOR */}
      {subtopic ? (
        <Editor
          subject={subject}
          topic={topic}
          reference={reference}
          subtopic={subtopic}
          notes={notes}
          fetchNotes={fetchNotes}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a subtopic to start writing ✍️
        </div>
      )}
    </div>
  );
}