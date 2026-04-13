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

export default function Sidebar({ collapsed }) {
  const linkClass =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-white/10";

  const activeClass =
    "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white";

  return (
    <div
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] ${
        collapsed ? "w-20" : "w-64"
      } bg-[#020617] border-r border-white/10 p-4 transition-all duration-300`}
    >
      <div className="h-full overflow-y-auto">
      <nav className="space-y-2 text-gray-400">

        <NavLink to="/" end className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
          <LayoutDashboard size={18} />
          {!collapsed && "Dashboard"}
        </NavLink>

        <NavLink to="/daily" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
          <Clock size={18} />
          {!collapsed && "Daily"}
        </NavLink>

        <NavLink to="/calendar" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
          <Calendar size={18} />
          {!collapsed && "Calendar"}
        </NavLink>

        <NavLink to="/analytics" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
          <BarChart3 size={18} />
          {!collapsed && "Analytics"}
        </NavLink>

        <NavLink to="/notes" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
          <BookOpen size={18} />
          {!collapsed && "Notes"}
        </NavLink>

        <NavLink to="/upsc" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
          <GraduationCap size={18} />
          {!collapsed && "UPSC Hub"}
        </NavLink>

        <NavLink to="/ai" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
          <Brain size={18} />
          {!collapsed && "AI"}
        </NavLink>

      </nav>
      </div>
    </div>
  );
}