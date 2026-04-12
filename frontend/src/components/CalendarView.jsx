import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  subDays,
} from "date-fns";

export default function CalendarView({ sessions }) {
  const [mode, setMode] = useState("month");
  const today = new Date();
  const todayStr = format(today, "yyyy-MM-dd");

  // 🔥 MONTH DATA
  const monthDays = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today),
  });

  const getDaySessions = (date) =>
    sessions.filter((s) => s.date === format(date, "yyyy-MM-dd"));

  const getTotal = (date) =>
    getDaySessions(date).reduce((sum, s) => sum + s.duration, 0);

  // 🔥 WEEK DATA
  const last7Days = [...Array(7)].map((_, i) =>
    format(subDays(today, i), "yyyy-MM-dd")
  ).reverse();

  const getSessionsByDate = (date) =>
    sessions.filter((s) => s.date === date);

  return (
    <div className="space-y-6">

      {/* HEADER */}
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

      {/* 🔥 MONTH VIEW (UPGRADED) */}
      {mode === "month" && (
        <div className="grid grid-cols-7 gap-3">

          {monthDays.map((day) => {
            const total = getTotal(day);
            const daySessions = getDaySessions(day);

            return (
              <div
                key={day}
                className={`h-24 rounded-xl p-1 flex flex-col text-xs transition ${
                  total === 0
                    ? "bg-white/5"
                    : total < 60
                    ? "bg-indigo-500/40"
                    : total < 120
                    ? "bg-indigo-500/70"
                    : "bg-indigo-500"
                } hover:scale-105`}
              >
                {/* DATE */}
                <div className="text-[10px] text-gray-300">
                  {format(day, "d")}
                </div>

                {/* SUBJECT TAGS */}
                <div className="mt-1 space-y-0.5 overflow-hidden">
                  {daySessions.slice(0, 2).map((s) => (
                    <div
                      key={s.id}
                      className="bg-black/30 rounded px-1 text-[10px]"
                    >
                      {s.subject}
                    </div>
                  ))}

                  {daySessions.length > 2 && (
                    <div className="text-[10px] text-gray-200">
                      +{daySessions.length - 2}
                    </div>
                  )}
                </div>

                {/* TOTAL */}
                {total > 0 && (
                  <span className="text-[10px] mt-auto">
                    {total}m
                  </span>
                )}
              </div>
            );
          })}

        </div>
      )}

      {/* 🔥 WEEK VIEW (UPGRADED) */}
      {mode === "week" && (
        <div className="card">
          <div className="flex justify-between items-end h-40">

            {last7Days.map((day) => {
              const daySessions = getSessionsByDate(day);

              const total = daySessions.reduce(
                (sum, s) => sum + s.duration,
                0
              );

              return (
                <div key={day} className="flex flex-col items-center">

                  {/* BAR */}
                  <div
                    className="bg-indigo-500 w-8 rounded transition"
                    style={{ height: `${total / 2}px` }}
                  />

                  {/* LABEL */}
                  <span className="text-xs mt-2 text-gray-400">
                    {day.slice(5)}
                  </span>

                  {/* SUBJECT */}
                  {daySessions[0] && (
                    <span className="text-[10px] text-gray-300">
                      {daySessions[0].subject}
                    </span>
                  )}

                </div>
              );
            })}

          </div>
        </div>
      )}

      {/* 🔥 DAY VIEW (REAL TIMELINE 🔥🔥) */}
      {mode === "day" && (
        <div className="card space-y-3">

          <h3 className="text-white font-semibold">
            Today's Timeline
          </h3>

          {getSessionsByDate(todayStr).length === 0 ? (
            <p className="text-gray-400 text-sm">
              No sessions today
            </p>
          ) : (
            getSessionsByDate(todayStr).map((s) => (
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