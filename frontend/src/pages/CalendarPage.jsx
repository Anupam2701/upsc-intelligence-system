import CalendarView from "../components/CalendarView";

export default function CalendarPage({ sessions }) {
  return (
    <div className="text-white space-y-6">
      <h1 className="text-3xl font-bold">Calendar</h1>
      <CalendarView sessions={sessions} />
    </div>
  );
}