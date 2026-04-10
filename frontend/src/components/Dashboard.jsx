import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { format, subDays } from "date-fns";

ChartJS.register(
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const API = "https://upsc-intelligence-system.onrender.com";

export default function Dashboard({ sessions }) {
  // 🔹 Total Time
  const totalTime = sessions.reduce((sum, s) => sum + s.duration, 0);

  // 🔹 Group by Subject
  const subjectMap = {};
  sessions.forEach((s) => {
    subjectMap[s.subject] =
      (subjectMap[s.subject] || 0) + s.duration;
  });

  // 🔹 Last 7 Days
  const last7Days = [...Array(7)].map((_, i) =>
    format(subDays(new Date(), i), "yyyy-MM-dd")
  ).reverse();

  const weeklyData = last7Days.map((day) =>
    sessions
      .filter((s) => s.date === day)
      .reduce((sum, s) => sum + s.duration, 0)
  );

  // 🔹 Streak
  let streak = 0;
  for (let i = 0; i < last7Days.length; i++) {
    if (weeklyData[6 - i] > 0) streak++;
    else break;
  }

  // 🔥 COMMON CHART OPTIONS (DARK MODE)
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#cbd5f5",
          font: { size: 12 },
        },
      },
      tooltip: {
        backgroundColor: "#020617",
        titleColor: "#fff",
        bodyColor: "#cbd5f5",
        borderColor: "#6366f1",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { color: "#94a3b8" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
      y: {
        ticks: { color: "#94a3b8" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* 🔥 Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card">
          <p className="text-gray-400">Total Time</p>
          <h2 className="text-3xl font-bold text-indigo-400">
            {totalTime} min
          </h2>
        </div>

        <div className="card">
          <p className="text-gray-400">Study Streak</p>
          <h2 className="text-3xl font-bold text-green-400">
            {streak} days
          </h2>
        </div>

        <div className="card">
          <p className="text-gray-400">Sessions</p>
          <h2 className="text-3xl font-bold text-white">
            {sessions.length}
          </h2>
        </div>
      </div>

      {/* 🔥 Subject Distribution */}
      <div className="card">
        <h3 className="mb-4 font-semibold text-gray-200">
          Subject Distribution
        </h3>

        <Bar
          data={{
            labels: Object.keys(subjectMap),
            datasets: [
              {
                label: "Minutes",
                data: Object.values(subjectMap),
                backgroundColor: [
                  "#6366f1",
                  "#8b5cf6",
                  "#22c55e",
                  "#f59e0b",
                ],
                borderRadius: 8,
                barThickness: 40,
              },
            ],
          }}
          options={chartOptions}
        />
      </div>

      {/* 🔥 Weekly Trend */}
      <div className="card">
        <h3 className="mb-4 font-semibold text-gray-200">
          Last 7 Days Trend
        </h3>

        <Line
          data={{
            labels: last7Days.map((d) => d.slice(5)),
            datasets: [
              {
                label: "Minutes",
                data: weeklyData,
                borderColor: "#6366f1",
                backgroundColor: "rgba(99,102,241,0.2)",
                tension: 0.4,
                fill: true,
                pointBackgroundColor: "#6366f1",
                pointRadius: 4,
              },
            ],
          }}
          options={chartOptions}
        />
      </div>
    </div>
  );
}