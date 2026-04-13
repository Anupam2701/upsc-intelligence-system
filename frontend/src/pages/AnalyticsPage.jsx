import PageHeader from "../components/PageHeader";
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

export default function AnalyticsPage({ sessions }) {

  // 🔥 LAST 7 DAYS
  const last7Days = [...Array(7)].map((_, i) =>
    format(subDays(new Date(), i), "yyyy-MM-dd")
  ).reverse();

  const weeklyData = last7Days.map((day) =>
    sessions
      .filter((s) => s.date === day)
      .reduce((sum, s) => sum + s.duration, 0)
  );

  // 🔥 SUBJECT DISTRIBUTION
  const subjectMap = {};
  sessions.forEach((s) => {
    subjectMap[s.subject] =
      (subjectMap[s.subject] || 0) + s.duration;
  });

  // 🔥 CONSISTENCY SCORE
  const activeDays = new Set(sessions.map((s) => s.date)).size;
  const totalDays =
    sessions.length > 0
      ? Math.ceil(
          (new Date(sessions[sessions.length - 1].date) -
            new Date(sessions[0].date)) /
            (1000 * 60 * 60 * 24)
        ) + 1
      : 1;

  const consistency = Math.round((activeDays / totalDays) * 100);

  // 🔥 DAILY AVERAGE
  const totalTime = sessions.reduce((sum, s) => sum + s.duration, 0);
  const dailyAvg = Math.round(totalTime / (activeDays || 1));

  // 🔥 BEST DAY
  let bestDay = "";
  let maxTime = 0;

  last7Days.forEach((day, i) => {
    if (weeklyData[i] > maxTime) {
      maxTime = weeklyData[i];
      bestDay = day;
    }
  });

  // 🔥 CHART STYLE (DARK MODE)
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#cbd5f5",
        },
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
    <div className="max-w-7xl mx-auto space-y-6">

      <PageHeader
  title="Analytics 📊"
  subtitle="Track your consistency"
/>
      

      {/* 🔥 STATS */}
      <div className="grid md:grid-cols-4 gap-4">

        <div className="card">
          <p className="text-gray-400">Consistency</p>
          <h2 className="text-2xl font-bold text-green-400">
            {consistency}%
          </h2>
        </div>

        <div className="card">
          <p className="text-gray-400">Daily Avg</p>
          <h2 className="text-2xl font-bold text-indigo-400">
            {dailyAvg} min
          </h2>
        </div>

        <div className="card">
          <p className="text-gray-400">Best Day</p>
          <h2 className="text-2xl font-bold">
            {bestDay || "N/A"}
          </h2>
        </div>

        <div className="card">
          <p className="text-gray-400">Total Time</p>
          <h2 className="text-2xl font-bold">
            {totalTime} min
          </h2>
        </div>

      </div>

      {/* 🔥 WEEKLY TREND */}
      <div className="card">
        <h3 className="mb-4 font-semibold">Weekly Trend</h3>

        <Line
          data={{
            labels: last7Days.map((d) => d.slice(5)),
            datasets: [
              {
                label: "Minutes",
                data: weeklyData,
                borderColor: "#6366f1",
                backgroundColor: "rgba(99,102,241,0.2)",
                fill: true,
                tension: 0.4,
              },
            ],
          }}
          options={chartOptions}
        />
      </div>

      {/* 🔥 SUBJECT DISTRIBUTION */}
      <div className="card">
        <h3 className="mb-4 font-semibold">
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
              },
            ],
          }}
          options={chartOptions}
        />
      </div>

    </div>
  );
}