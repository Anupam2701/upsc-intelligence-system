import { useState } from "react";

const sections = [
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

  const content = {

    Overview: (
      <div>
        <h2 className="title">UPSC CSE Overview</h2>

        <p className="text">
          UPSC Civil Services Examination is one of the toughest exams in India.
          It recruits candidates for IAS, IPS, IFS, IRS and more.
        </p>

        <ul className="list">
          <li>Conducted by: UPSC</li>
          <li>Frequency: Annual</li>
          <li>Age: 21–32 (relaxations apply)</li>
          <li>Attempts: 6 (General)</li>
        </ul>
      </div>
    ),

    Prelims: (
      <div>
        <h2 className="title">Prelims</h2>

        <ul className="list">
          <li>GS Paper 1 (200 marks)</li>
          <li>CSAT (qualifying)</li>
          <li>MCQ based</li>
          <li>Negative marking: 1/3</li>
        </ul>
      </div>
    ),

    Mains: (
      <div>
        <h2 className="title">Mains</h2>

        <ul className="list">
          <li>9 Papers total</li>
          <li>Essay + GS + Optional</li>
          <li>Descriptive answers</li>
          <li>Total: 1750 marks</li>
        </ul>
      </div>
    ),

    Interview: (
      <div>
        <h2 className="title">Interview</h2>

        <p className="text">
          Personality test (275 marks). Focus on clarity, honesty,
          decision-making and awareness.
        </p>
      </div>
    ),

    Syllabus: (
      <div>
        <h2 className="title">Syllabus</h2>

        <ul className="list">
          <li>Polity</li>
          <li>Economy</li>
          <li>History</li>
          <li>Geography</li>
          <li>Environment</li>
          <li>Science</li>
          <li>Ethics</li>
        </ul>
      </div>
    ),

    Optional: (
      <div>
        <h2 className="title">Optional Subjects</h2>

        <p className="text">
          Choose wisely. High scoring options:
        </p>

        <ul className="list">
          <li>PSIR</li>
          <li>Sociology</li>
          <li>Geography</li>
          <li>Anthropology</li>
        </ul>
      </div>
    ),

    Strategy: (
      <div>
        <h2 className="title">Marks & Strategy</h2>

        <ul className="list">
          <li>Mains: 1750</li>
          <li>Interview: 275</li>
          <li>Total: 2025</li>
        </ul>

        <h3 className="subtitle">Preparation Strategy</h3>

        <ul className="list">
          <li>Start with NCERTs</li>
          <li>Read The Hindu daily</li>
          <li>Practice answer writing</li>
          <li>Take mock tests</li>
        </ul>
      </div>
    ),
  };

  return (
    <div className="flex h-screen bg-[#020617] text-white">

      {/* LEFT SIDEBAR */}
      <div className="w-1/4 p-4 border-r border-gray-800 space-y-2">

        <h2 className="text-lg font-semibold mb-3">
          UPSC CSE 📚
        </h2>

        {sections.map((s) => (
          <div
            key={s}
            onClick={() => setActive(s)}
            className={`p-2 rounded cursor-pointer transition ${
              active === s
                ? "bg-indigo-600"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {s}
          </div>
        ))}
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="bg-[#111827] border border-white/10 rounded-xl p-6">
    {content[active]}
        </div>
    </div>
    </div>
  );
}