import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  subDays,
  addMonths,
  subMonths,
  addDays,
} from "date-fns";

export default function CalendarView({ sessions }) {
  const [mode, setMode] = useState("month");
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const todayStr = format(new Date(), "yyyy-MM-dd");

  // 🔥 MONTH DATA (DYNAMIC)
  const monthDays = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const getDaySessions = (date) =>
    sessions.filter((s) => s.date === format(date, "yyyy-MM-dd"));

  const getTotal = (date) =>
    getDaySessions(date).reduce((sum, s) => sum + s.duration, 0);

  // 🔥 WEEK DATA (DYNAMIC)
  const last7Days = [...Array(7)].map((_, i) =>
    format(subDays(currentDate, i), "yyyy-MM-dd")
  ).reverse();

  const getSessionsByDate = (date) =>
    sessions.filter((s) => s.date === date);

  // 🔥 HEATMAP INTENSITY
  const getHeatColor = (minutes) => {
    if (minutes === 0) return "bg-white/5";
    if (minutes < 60) return "bg-indigo-500/30";
    if (minutes < 120) return "bg-indigo-500/60";
    return "bg-indigo-500";
  };

  // 🔥 NAVIGATION
  const prev = () => {
    if (mode === "month") setCurrentDate(subMonths(currentDate, 1));
    else if (mode === "week") setCurrentDate(subDays(currentDate, 7));
  };

  const next = () => {
    if (mode === "month") setCurrentDate(addMonths(currentDate, 1));
    else if (mode === "week") setCurrentDate(addDays(currentDate, 7));
  };

  return (
    <div className="space-y-6">

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">
          Calendar Planner 📅
        </h2>

        <div className="flex gap-2">
          {["month", "week", "day"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1 rounded-lg text-sm ${
                mode === m
                  ? "bg-indigo-500 text-white"
                  : "bg-white/10 text-gray-400"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* 🔥 NAV BAR */}
      {mode !== "day" && (
        <div className="flex justify-between items-center">

          <button onClick={prev} className="btn-primary px-3 py-1">
            ←
          </button>

          <h3 className="text-white font-semibold">
            {mode === "month"
              ? `${format(currentDate, "MMMM yyyy")}`
              : `Week of ${format(subDays(currentDate, 6), "MMM d")} - ${format(currentDate, "MMM d")}`}
          </h3>

          <button onClick={next} className="btn-primary px-3 py-1">
            →
          </button>

        </div>
      )}

      {/* 🔥 MONTH VIEW */}
      {mode === "month" && (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {monthDays.map((day) => {
            const total = getTotal(day);

            return (
              <div
                key={day}
                onClick={() => {
                  setSelectedDate(format(day, "yyyy-MM-dd"));
                  setMode("day");
                }}
                className={`h-24 rounded-xl p-2 flex flex-col text-xs cursor-pointer transition hover:scale-105 ${getHeatColor(total)}`}
              >
                <div className="text-[10px] text-gray-300">
                  {format(day, "d")}
                </div>

                {total > 0 && (
                  <span className="text-[10px] mt-auto text-white">
                    {total}m
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 🔥 WEEK VIEW */}
      {mode === "week" && (
        <div className="card p-6">
          <div className="flex justify-between items-end h-56">

            {last7Days.map((day) => {
              const total = getSessionsByDate(day).reduce(
                (sum, s) => sum + s.duration,
                0
              );

              return (
                <div
                  key={day}
                  onClick={() => {
                    setSelectedDate(day);
                    setMode("day");
                  }}
                  className="flex flex-col items-center gap-2 cursor-pointer"
                >
                  <div
                    className={`w-10 rounded-lg ${getHeatColor(total)}`}
                    style={{ height: `${Math.max(total / 2, 10)}px` }}
                  />

                  <span className="text-xs text-gray-400">
                    {day.slice(5)}
                  </span>
                </div>
              );
            })}

          </div>
        </div>
      )}

      {/* 🔥 DAY VIEW */}
      {mode === "day" && (
        <div className="card space-y-3">

          <h3 className="text-white font-semibold">
            {selectedDate || todayStr}
          </h3>

          {(selectedDate
            ? getSessionsByDate(selectedDate)
            : getSessionsByDate(todayStr)
          ).length === 0 ? (
            <p className="text-gray-400 text-sm">
              No sessions
            </p>
          ) : (
            (selectedDate
              ? getSessionsByDate(selectedDate)
              : getSessionsByDate(todayStr)
            ).map((s) => (
              <div
                key={s.id}
                className="border-l-4 border-indigo-500 pl-4 py-2 flex justify-between"
              >
                <div>
                  <div className="text-sm text-gray-400">
                    {s.start_time} → {s.end_time}
                  </div>

                  <div className="font-medium">
                    {s.subject}
                  </div>

                  <div className="text-xs text-gray-400">
                    {s.topic}
                  </div>
                </div>

                <div className="text-indigo-400 text-sm">
                  {s.duration}m
                </div>
              </div>
            ))
          )}

        </div>
      )}

    </div>
  );
}