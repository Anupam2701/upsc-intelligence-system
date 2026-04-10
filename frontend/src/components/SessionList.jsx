export default function SessionList({ sessions }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-3">Study Sessions</h3>

      {sessions.map((s, i) => (
        <div
          key={i}
          className="border-b py-2 flex justify-between"
        >
          <span>
            {s.subject} ({s.date})
          </span>
          <span>{s.duration} min</span>
        </div>
      ))}
    </div>
  );
}