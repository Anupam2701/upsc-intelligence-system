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

        {/* LEFT MENU */}
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

        {/* RIGHT CONTENT */}
        <div className="flex-1 space-y-4">

          {/* ================= OVERVIEW ================= */}
          {active === "Overview" && (
            <div className="grid md:grid-cols-2 gap-4">

              <div className="card">
                <h3 className="font-semibold mb-2">Overview</h3>
                <p className="text-sm text-gray-400 mb-2">
                  UPSC Civil Services Examination is one of the toughest exams in India. 
                  It recruits candidates for IAS, IPS, IFS, IRS and more.
                </p>
                <ul className="text-sm space-y-1 text-gray-300">
                  <li>• Conducted by UPSC</li>
                  <li>• Frequency: Annual</li>
                  <li>• Age: 21–32 (relaxations apply)</li>
                  <li>• Attempts: 6 (General)</li>
                </ul>
              </div>

              <div className="card">
                <h3 className="font-semibold mb-2">Stages</h3>
                <p className="text-gray-400">
                  Prelims → Mains → Interview
                </p>
              </div>

            </div>
          )}

          {/* ================= PRELIMS ================= */}
          {active === "Prelims" && (
            <div className="grid md:grid-cols-2 gap-4">

              <div className="card">
                <h3 className="font-semibold mb-2">Paper I (GS)</h3>
                <p className="text-gray-400">
                  200 marks, 100 questions
                </p>
              </div>

              <div className="card">
                <h3 className="font-semibold mb-2">Paper II (CSAT)</h3>
                <p className="text-gray-400">
                  200 marks, 80 questions (Qualifying 33%)
                </p>
              </div>

            </div>
          )}

          {/* ================= MAINS ================= */}
          {active === "Mains" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

              <div className="card">
                <h3 className="font-semibold">Total Papers</h3>
                <p className="text-gray-400">9 Papers</p>
              </div>

              <div className="card">
                <h3 className="font-semibold">GS Papers</h3>
                <p className="text-gray-400">GS I–IV (250 marks each)</p>
              </div>

              <div className="card">
                <h3 className="font-semibold">Essay</h3>
                <p className="text-gray-400">250 marks</p>
              </div>

              <div className="card">
                <h3 className="font-semibold">Optional</h3>
                <p className="text-gray-400">2 Papers (250 each)</p>
              </div>

              <div className="card">
                <h3 className="font-semibold">Language Papers</h3>
                <p className="text-gray-400">English + Indian Language</p>
              </div>

            </div>
          )}

          {/* ================= INTERVIEW ================= */}
          {active === "Interview" && (
            <div className="card">
              <h3 className="font-semibold mb-2">Personality Test</h3>
              <p className="text-gray-400">
                275 Marks. Evaluates suitability for civil services.
              </p>
            </div>
          )}

          {/* ================= SYLLABUS ================= */}
          {active === "Syllabus" && (
            <div className="space-y-4">

              {/* TITLE */}
              <div className="card">
                <h3 className="font-semibold text-lg">
                  Mains GS (General Studies)
                </h3>
              </div>

              {/* GRID */}
              <div className="grid lg:grid-cols-2 gap-4">

                {/* QUALIFYING */}
                <div className="card">
                  <h3 className="font-medium text-gray-300 mb-3">
                    Qualifying Papers (Not counted for final ranking):
                  </h3>

                  <ul className="list-disc pl-5 space-y-2 text-gray-400 text-sm">
                    <li>
                      <span className="text-gray-300 font-medium">Paper A:</span> 
                      One of the Indian Languages (included in the 8th Schedule) - 300 Marks 
                      (Minimum 25% to qualify)
                    </li>

                    <li>
                      <span className="text-gray-300 font-medium">Paper B:</span> 
                      English - 300 Marks (Minimum 25% to qualify)
                    </li>
                  </ul>
                </div>

                {/* MERIT */}
                <div className="card">
                  <h3 className="font-medium text-gray-300 mb-3">
                    Merit Papers (Counted for final ranking):
                  </h3>

                  <ul className="list-disc pl-5 space-y-2 text-gray-400 text-sm">
                    <li>Paper I: Essay (250 Marks)</li>
                    <li>Paper II (GS-I): History, Geography, Society (250)</li>
                    <li>Paper III (GS-II): Polity, Governance, IR (250)</li>
                    <li>Paper IV (GS-III): Economy, Env, Tech, Security (250)</li>
                    <li>Paper V (GS-IV): Ethics (250)</li>
                    <li>Paper VI: Optional Paper 1 (250)</li>
                    <li>Paper VII: Optional Paper 2 (250)</li>
                  </ul>
                </div>

              </div>

              {/* TOTAL */}
              <div className="card text-center">
                <h3 className="text-lg font-semibold">
                  Total Mains Marks: 1750
                </h3>
                <p className="text-gray-400">
                  GRAND TOTAL: 1750 (Written) + 275 (Interview) = 2025
                </p>
              </div>

            </div>
          )}

          {/* ================= OPTIONAL ================= */}
          {active === "Optional" && (
            <div className="card space-y-3">
              <h3 className="font-semibold">Optional Subject</h3>

              <p className="text-gray-400 text-sm">
                Choose one subject (Total 500 marks via two papers).
              </p>

              <ul className="list-disc pl-5 text-gray-400 text-sm space-y-2">
                <li>
                  Academic Subjects: Agriculture, Anthropology, Economics,
                  Geography, History, Law, Philosophy, Sociology, etc.
                </li>

                <li>
                  Literature Subjects: English, Hindi, Tamil, Urdu, etc.
                </li>
              </ul>
            </div>
          )}

          {/* ================= STRATEGY ================= */}
          {active === "Strategy" && (
            <div className="grid md:grid-cols-2 gap-4">

              <div className="card">
                <h3 className="font-semibold mb-2">Preparation</h3>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• NCERT Foundation</li>
                  <li>• Standard Textbooks</li>
                  <li>• Daily Current Affairs</li>
                </ul>
              </div>

              <div className="card">
                <h3 className="font-semibold mb-2">Practice</h3>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Answer Writing</li>
                  <li>• Mock Tests</li>
                  <li>• Revision</li>
                </ul>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}