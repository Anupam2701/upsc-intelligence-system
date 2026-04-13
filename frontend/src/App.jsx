import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

// Pages
import DashboardPage from "./pages/DashboardPage";
import DailyPage from "./pages/DailyPage";
import CalendarPage from "./pages/CalendarPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import NotesPage from "./pages/NotesPage";
import AIPage from "./pages/AIPage";
import UPSCPage from "./pages/UPSCPage";

const API = "https://upsc-intelligence-system.onrender.com";

export default function App() {
  const [sessions, setSessions] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // 🔥 Fetch sessions
  const fetchSessions = async () => {
    try {
      const res = await axios.get(`${API}/sessions/`);
      setSessions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <Router>
      <div className="bg-[#020617] min-h-screen text-white">

  {/* HEADER */}
  <Header toggleSidebar={() => setMobileOpen(true)} />

  {/* DESKTOP SIDEBAR */}
  <div className="hidden md:block">
    <Sidebar collapsed={collapsed} />
  </div>

  {/* MOBILE SIDEBAR (DRAWER) */}
  {mobileOpen && (
    <div className="fixed inset-0 z-50 flex">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setMobileOpen(false)}
      />

      {/* DRAWER */}
      <div className="relative w-64 bg-[#020617] h-full p-4 z-50">
        <Sidebar collapsed={false} />
      </div>
    </div>
  )}

  {/* MAIN CONTENT */}
  <div
    className={`
      pt-16 p-4 md:p-6 transition-all duration-300
      ${collapsed ? "md:ml-20" : "md:ml-64"}
    `}
  >
          <Routes>

            <Route path="/" element={<DashboardPage sessions={sessions} />} />

            <Route
              path="/daily"
              element={
                <DailyPage
                  sessions={sessions}
                  fetchSessions={fetchSessions}
                />
              }
            />

            <Route
              path="/calendar"
              element={<CalendarPage sessions={sessions} />}
            />

            <Route
              path="/analytics"
              element={<AnalyticsPage sessions={sessions} />}
            />

            <Route path="/notes" element={<NotesPage />} />

            <Route path="/ai" element={<AIPage />} />

            <Route path="/upsc" element={<UPSCPage />} />

          </Routes>
        </div>

      </div>
    </Router>
  );
}