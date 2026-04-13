import { Menu } from "lucide-react";

export default function Header({ toggleSidebar }) {
  return (
    <div className="fixed top-0 left-0 w-full h-16 bg-[#020617]/80 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6 z-50">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button onClick={toggleSidebar}>
          <Menu size={20} className="text-gray-300 hover:text-white" />
        </button>

        <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">
          MY UPSC DAILY TRACKER
        </h1>
      </div>

      {/* RIGHT */}
      <div className="text-sm text-gray-400">
        Stay Consistent 🚀
      </div>

    </div>
  );
}