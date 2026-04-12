import CalendarView from "../components/CalendarView";

export default function CalendarPage({ sessions }) {
  return (
    <div className="text-white p-6 space-y-6 bg-[#0f0f0f] min-h-screen">

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          Calendar
        </h1>

        <div className="text-sm text-gray-400">
          Track your consistency 📊
        </div>
      </div>

      {/* 🔥 MAIN CARD */}
      <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
        <CalendarView sessions={sessions} />
      </div>

    </div>
  );
}