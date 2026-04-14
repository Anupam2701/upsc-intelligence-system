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
                  <li>• Attempts: 6(General)</li>
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
                <h3 className="font-semibold mb-2">Paper I GS(General Studies)</h3>
                <p className="text-sm text-gray-400">
                  200 marks, 100 questions
                </p>
              </div>

              <div className="card">
                <h3 className="font-semibold mb-2">Paper II CSAT(Civil Services Aptitude Test)</h3>
                <p className="text-sm text-gray-400">
                  Qualifying (33%) #Only if a candidate gets greater than or equals to 33% in CSAT, GS-I will be evaluated for Merit
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
                <h3 className="font-semibold mb-2">GS(General Studies) Papers</h3>
                <p className="text-sm text-gray-400">
                  GS I–IV (250 marks each)
                </p>
              </div>

              <div className="card">
                <h3 className="font-semibold mb-2">2 Compulsary Language Paper (English + Any one from the pool of 22 Indian languages) (Minimum 25% to qualify)</h3>
                <p className="text-sm text-gray-400">
                  300 marks each
                </p>
              </div>

              <div className="card">
                <h3 className="font-semibold mb-2">Optional (Paper 1 and Paper 2)</h3>
                <p className="text-sm text-gray-400">
                  250 marks each
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

          {/* MAINS GS */}
{active === "Mains" && (
  <>
    <div className="card">
      <h3 className="font-semibold mb-4">Mains GS (General Studies)</h3>
      
      <div className="space-y-4 text-sm text-gray-400">
        <div>
          <p className="font-medium text-gray-300 mb-2">Qualifying Papers (Not counted for final ranking):</p>
          <ul className="list-disc list-outside pl-5 space-y-1">
            <li>
              <span className="font-medium text-gray-300">Paper A:</span> One of the Indian Languages (included in the 8th Schedule) - 300 Marks (Minimum 25% to qualify).
            </li>
            <li>
              <span className="font-medium text-gray-300">Paper B:</span> English - 300 Marks (Minimum 25% to qualify).
            </li>
          </ul>
        </div>

        <div>
          <p className="font-medium text-gray-300 mb-2">Merit Papers (Counted for final ranking):</p>
          <ul className="list-disc list-outside pl-5 space-y-1">
            <li><span className="font-medium text-gray-300">Paper I:</span> Essay (250 Marks)</li>
            <li><span className="font-medium text-gray-300">Paper II (GS-I):</span> Indian Heritage and Culture, History and Geography of the World and Society (250 Marks)</li>
            <li><span className="font-medium text-gray-300">Paper III (GS-II):</span> Governance, Constitution, Polity, Social Justice, and International Relations (250 Marks)</li>
            <li><span className="font-medium text-gray-300">Paper IV (GS-III):</span> Technology, Economic Development, Biodiversity, Environment, Security, and Disaster Management (250 Marks)</li>
            <li><span className="font-medium text-gray-300">Paper V (GS-IV):</span> Ethics, Integrity, and Aptitude (250 Marks)</li>
            <li><span className="font-medium text-gray-300">Paper VI (Optional Paper 1):</span> Subject chosen by the candidate (250 Marks)</li>
            <li><span className="font-medium text-gray-300">Paper VII (Optional Paper 2):</span> Subject chosen by the candidate (250 Marks)</li>
          </ul>
        </div>

        <div className="pt-2 border-t border-gray-700 font-semibold text-gray-200">
          <p>Total Mains Marks: 1750</p>
          <p>GRAND TOTAL MARKS: 1750 (Written) + 275 (Interview) = 2025</p>
        </div>
      </div>
    </div>
  </>
)}

{/* OPTIONAL */}
{active === "Optional" && (
  <div className="card">
    <h3 className="font-semibold mb-3">Optional Subject</h3>
    <div className="text-sm text-gray-400 space-y-3">
      <p>
        Choose <span className="font-medium text-gray-300">one</span> subject (Total 500 marks via two papers). Candidates can choose from a list of roughly 48 subjects, which include:
      </p>
      
      <ul className="list-disc list-outside pl-5 space-y-2">
        <li>
          <span className="font-medium text-gray-300">Academic Subjects:</span> Agriculture, Anthropology, Economics, Geography, History, Law, Management, Mathematics, Philosophy, Physics, Political Science & International Relations (PSIR), Public Administration, Sociology, Zoology, and various Engineering disciplines.
        </li>
        <li>
          <span className="font-medium text-gray-300">Literature Subjects:</span> Candidates can also choose the literature of a language as their optional (e.g., English, Hindi, Maithili, Malayalam, Tamil, Urdu, etc.).
        </li>
      </ul>
    </div>
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