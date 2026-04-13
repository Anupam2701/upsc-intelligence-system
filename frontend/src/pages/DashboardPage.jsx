import Dashboard from "../components/Dashboard";
import PageHeader from "../components/PageHeader";

export default function DashboardPage({ sessions }) {
  return (
    <div className="max-w-7xl mx-auto space-y-6">

      <PageHeader
        title="Dashboard"
        subtitle="Track your performance & consistency"
      />

      <Dashboard sessions={sessions} />

    </div>
  );
}