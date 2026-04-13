import CalendarView from "../components/CalendarView";
import PageHeader from "../components/PageHeader";
export default function CalendarPage({ sessions }) {
  return (
    <div className="hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/20">

      {/* 🔥 HEADER */}
      <div className="max-w-7xl mx-auto space-y-6">
        <PageHeader
  title="Calendar"
  subtitle="Visualize your study consistency"
/>

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