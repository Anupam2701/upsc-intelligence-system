import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  BarChart3,
  BookOpen,
  Brain,
  Clock,
  GraduationCap,
} from "lucide-react";

export default function Sidebar() {
  const linkClass =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-white/10";

  const activeClass =
    "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white";

  return (
    <div className="w-64 h-screen fixed left-0 top-0 bg-[#020617] border-r border-white/10 p-5 flex flex-col justify-between">

      {/* LOGO */}
      <div>
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 mb-10">
          MY UPSC DAILY TRACKER
        </h1>

        {/* NAVIGATION */}
        <nav className="space-y-2 text-gray-400">

          <NavLink to="/" end className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>

          <NavLink to="/daily" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
            <Clock size={18} /> Daily
          </NavLink>

          <NavLink to="/calendar" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
            <Calendar size={18} /> Calendar
          </NavLink>

          <NavLink to="/analytics" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
            <BarChart3 size={18} /> Analytics
          </NavLink>

          <NavLink to="/notes" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
            <BookOpen size={18} /> Notes
          </NavLink>

          {/* 🔥 NEW UPSC SECTION */}
          <NavLink to="/upsc" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
            <GraduationCap size={18} /> UPSC Hub
          </NavLink>

          <NavLink to="/ai" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
            <Brain size={18} /> AI Insights
          </NavLink>

        </nav>
      </div>

      {/* FOOTER */}
      <div className="text-xs text-gray-500">
        <p>UPSC Intelligence System</p>
        <p className="text-indigo-400">v1.0</p>
      </div>
    </div>
  );
}