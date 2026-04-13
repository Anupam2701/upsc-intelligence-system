import { useState } from "react";
import PageHeader from "../components/PageHeader";

const SECTIONS = [
  "Overview",
  "Prelims",
  "Mains",
  "Interview",
  "Syllabus",
  "Optional",
  "Strategy",
];

export default function UPSCPage() {
  const [active, setActive] = useState("Overview");

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      <PageHeader
        title="UPSC Hub"
        subtitle="Everything about UPSC CSE"
      />

      <div className="flex gap-6">

        {/* 🔥 LEFT MENU */}
        <div className="w-56 space-y-2">
          {SECTIONS.map((s) => (
            <div
              key={s}
              onClick={() => setActive(s)}
              className={`p-3 rounded-xl cursor-pointer text-sm transition
              ${
                active === s
                  ? "bg-indigo-500/20 text-white border border-indigo-500/30"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {s}
            </div>
          ))}
        </div>

        {/* 🔥 RIGHT CONTENT */}
        <div className="flex-1 grid md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* OVERVIEW */}
          {active === "Overview" && (
            <>
              <div className="card">
                <h3 className="font-semibold mb-2">Overview</h3>
                <p className="text-sm text-gray-400">
                  UPSC CSE recruits IAS, IPS, IFS, IRS.
                </p>
                <ul className="text-sm mt-2 space-y-1 text-gray-300">
                  <li>• Conducted by UPSC</li>
                  <li>• Annual Exam</li>
                  <li>• Age: 21–32</li>
                  <li>• Attempts: 6</li>
                </ul>
              </div>

              <div className="card">
                <h3 className="font-semibold mb-2">Stages</h3>
                <p className="text-gray-400 text-sm">
                  Prelims → Mains → Interview
                </p>
              </div>
            </>
          )}

          {/* PRELIMS */}
          {active === "Prelims" && (
            <>
              <div className="card">
                <h3 className="font-semibold mb-2">Paper I (GS)</h3>
                <p className="text-sm text-gray-400">
                  200 marks, 100 questions
                </p>
              </div>

              <div className="card">
                <h3 className="font-semibold mb-2">Paper II (CSAT)</h3>
                <p className="text-sm text-gray-400">
                  Qualifying (33%)
                </p>
              </div>
            </>
          )}

          {/* MAINS */}
          {active === "Mains" && (
            <>
              <div className="card">
                <h3 className="font-semibold mb-2">Structure</h3>
                <p className="text-sm text-gray-400">
                  9 papers total
                </p>
              </div>

              <div className="card">
                <h3 className="font-semibold mb-2">GS Papers</h3>
                <p className="text-sm text-gray-400">
                  GS I–IV (250 marks each)
                </p>
              </div>

              <div className="card">
                <h3 className="font-semibold mb-2">Essay</h3>
                <p className="text-sm text-gray-400">
                  250 marks
                </p>
              </div>
            </>
          )}

          {/* INTERVIEW */}
          {active === "Interview" && (
            <div className="card">
              <h3 className="font-semibold mb-2">Personality Test</h3>
              <p className="text-sm text-gray-400">
                275 marks, evaluates suitability for civil services.
              </p>
            </div>
          )}

          {/* SYLLABUS */}
          {active === "Syllabus" && (
            <>
              <div className="card">
                <h3 className="font-semibold mb-2">Prelims GS</h3>
                <p className="text-sm text-gray-400">
                  History, Geography, Polity, Economy, Environment
                </p>
              </div>

              <div className="card">
                <h3 className="font-semibold mb-2">Mains GS</h3>
                <p className="text-sm text-gray-400">
                  GS I–IV + Essay
                </p>
              </div>
            </>
          )}

          {/* OPTIONAL */}
          {active === "Optional" && (
            <div className="card">
              <h3 className="font-semibold mb-2">Optional Subject</h3>
              <p className="text-sm text-gray-400">
                Choose one subject (500 marks)
              </p>
            </div>
          )}

          {/* STRATEGY */}
          {active === "Strategy" && (
            <>
              <div className="card">
                <h3 className="font-semibold mb-2">Preparation</h3>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• NCERTs</li>
                  <li>• Standard Books</li>
                  <li>• Current Affairs</li>
                </ul>
              </div>

              <div className="card">
                <h3 className="font-semibold mb-2">Practice</h3>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Answer Writing</li>
                  <li>• Mock Tests</li>
                </ul>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}