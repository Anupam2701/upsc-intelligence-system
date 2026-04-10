import { useState } from "react";

export default function StudyForm({ addSession }) {
  const [form, setForm] = useState({
    subject: "",
    duration: "",
    date: "",
  });


  const submit = () => {
    if (!form.subject || !form.duration || !form.date) return;

    addSession({
      ...form,
      duration: Number(form.duration),
    });

    setForm({ subject: "", duration: "", date: "" });
  };

  return (
    <div className="card">
      <h3 className="font-semibold mb-4">Add Study Session</h3>

      <div className="grid md:grid-cols-4 gap-3">
        <input
          className="p-3 rounded-lg border focus:ring-2 focus:ring-indigo-400"
          placeholder="Subject"
          value={form.subject}
          onChange={(e) =>
            setForm({ ...form, subject: e.target.value })
          }
        />

        <input
          type="number"
          className="p-3 rounded-lg border"
          placeholder="Minutes"
          value={form.duration}
          onChange={(e) =>
            setForm({ ...form, duration: e.target.value })
          }
        />

        <input
          type="date"
          className="p-3 rounded-lg border"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
        />

        <button
          onClick={submit}
          className="bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Add
        </button>
      </div>
    </div>
  );
}