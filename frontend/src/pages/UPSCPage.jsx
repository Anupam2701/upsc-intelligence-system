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

          {/* SYLLABUS */}
          {active === "Syllabus" && (
            <>
              <div className="card">
                <h3 className="font-semibold mb-2">Prelims GS</h3>
                <p className="text-sm text-gray-400">
                  GS-I: Current events of national and international importance, History of India and Indian National Movement, Indian and World Geography, Indian Polity and Governance, Economic and Social Development, Environmental Ecology, Biodiversity, Climate Change, and General Science
                  CSAT: Comprehension, Interpersonal skills, Logical reasoning, Analytical ability, Decision-making, Problem-solving, Basic numeracy (Class X level), and Data interpretation (Class X level)
                </p>
              </div>

              <div className="card">
                <h3 className="font-semibold mb-2">Mains GS(General Studies)</h3>
                <p className="text-sm text-gray-400">
                  Qualifying Papers (Not counted for final ranking):

                  Paper A: One of the Indian Languages (included in the 8th Schedule) - 300 Marks (Minimum 25% to qualify).

                  Paper B: English - 300 Marks (Minimum 25% to qualify).

                  Merit Papers (Counted for final ranking):

                  Paper I: Essay (250 Marks)

                  Paper II (GS-I): Indian Heritage and Culture, History and Geography of the World and Society (250 Marks)

                  Paper III (GS-II): Governance, Constitution, Polity, Social Justice, and International Relations (250 Marks)

                  Paper IV (GS-III): Technology, Economic Development, Biodiversity, Environment, Security, and Disaster Management (250 Marks)

                  Paper V (GS-IV): Ethics, Integrity, and Aptitude (250 Marks)

                  Paper VI (Optional Paper 1): Subject chosen by the candidate (250 Marks)

                  Paper VII (Optional Paper 2): Subject chosen by the candidate (250 Marks)

                  Total Mains Marks: 1750

                  GRAND TOTAL MARKS: 1750(GS) + 275(INTERVIEW) = 2025
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
                Candidates can choose from a list of roughly 48 subjects, which include:

                Academic Subjects: Agriculture, Anthropology, Economics, Geography, History, Law, Management, Mathematics, Philosophy, Physics, Political Science & International Relations (PSIR), Public Administration, Sociology, Zoology, and various Engineering disciplines.

                Literature Subjects: Candidates can also choose the literature of a language as their optional (e.g., English, Hindi, Maithili, Malayalam, Tamil, Urdu, etc.).
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