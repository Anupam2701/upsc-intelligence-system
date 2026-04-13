import CalendarView from "../components/CalendarView";
import PageHeader from "../components/PageHeader";
export default function CalendarPage({ sessions }) {
  return (
    <div className="hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/20">

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