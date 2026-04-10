
export default function HabitTracker({ habits, setHabits }) {
  const toggle = (key) =>
    setHabits({ ...habits, [key]: !habits[key] });

  return (
    <div className="card">
      <h3 className="font-semibold mb-4">Daily Habits</h3>

      {Object.keys(habits).map((h) => (
        <div
          key={h}
          className="flex justify-between items-center mb-3"
        >
          <span className="capitalize">{h}</span>

          <button
            onClick={() => toggle(h)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
    habits[h]
      ? "bg-indigo-500"
      : "bg-slate-700"
  }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                habits[h] ? "translate-x-6" : ""
              }`}
            />
          </button>
        </div>
      ))}
    </div>
  );
}