import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Sidebar from "./components/Sidebar";

// Pages
import DashboardPage from "./pages/DashboardPage";
import DailyPage from "./pages/DailyPage";
import CalendarPage from "./pages/CalendarPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import NotesPage from "./pages/NotesPage";
import AIPage from "./pages/AIPage";

const API = "https://upsc-intelligence-system.onrender.com";

export default function App() {
  const [sessions, setSessions] = useState([]);

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
      <div className="flex bg-[#020617] min-h-screen">

        {/* 🔥 SIDEBAR */}
        <Sidebar />

        {/* 🔥 MAIN CONTENT */}
        <div className="ml-64 w-full p-6">
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
            <Route path="/calendar" element={<CalendarPage sessions={sessions} />} />
            <Route
  path="/analytics"
  element={<AnalyticsPage sessions={sessions} />}
/>
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/ai" element={<AIPage />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
}