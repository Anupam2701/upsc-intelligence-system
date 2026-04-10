import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  subDays,
} from "date-fns";

const API = "https://upsc-intelligence-system.onrender.com";

export default function CalendarView({ sessions }) {
  const [mode, setMode] = useState("month");
  const today = new Date();

  // 🔥 MONTH DATA
  const monthDays = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today),
  });

  const getTotal = (date) =>
    sessions
      .filter((s) => s.date === format(date, "yyyy-MM-dd"))
      .reduce((sum, s) => sum + s.duration, 0);

  // 🔥 WEEK DATA
  const last7Days = [...Array(7)].map((_, i) =>
    format(subDays(today, i), "yyyy-MM-dd")
  ).reverse();

  return (
    <div className="space-y-6">

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">
          Calendar Planner 📅
        </h2>

        {/* 🔥 MODE SWITCH */}
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

      {/* 🔥 MONTH VIEW */}
      {mode === "month" && (
        <div className="grid grid-cols-7 gap-3">
          {monthDays.map((day) => {
            const total = getTotal(day);

            return (
              <div
                key={day}
                className={`h-20 rounded-xl flex flex-col items-center justify-center text-sm transition ${
                  total === 0
                    ? "bg-white/5"
                    : total < 60
                    ? "bg-indigo-500/40"
                    : total < 120
                    ? "bg-indigo-500/70"
                    : "bg-indigo-500"
                } hover:scale-105`}
              >
                {format(day, "d")}
                {total > 0 && (
                  <span className="text-xs">{total}m</span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 🔥 WEEK VIEW */}
      {mode === "week" && (
        <div className="card">
          <div className="flex justify-between items-end h-40">
            {last7Days.map((day) => {
              const total = sessions
                .filter((s) => s.date === day)
                .reduce((sum, s) => sum + s.duration, 0);

              return (
                <div key={day} className="flex flex-col items-center">
                  <div
                    className="bg-indigo-500 w-8 rounded"
                    style={{ height: `${total / 2}px` }}
                  />
                  <span className="text-xs mt-2 text-gray-400">
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
        <div className="card">
          <h3 className="mb-4 text-white">Today's Timeline</h3>

          {[...Array(12)].map((_, i) => {
            const hour = i + 8;

            return (
              <div
                key={i}
                className="flex justify-between border-b border-white/10 py-2 text-gray-300"
              >
                <span>{hour}:00</span>
                <span className="text-gray-500">-</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}