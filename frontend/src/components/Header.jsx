import { Menu, LogOut } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";

export default function Header({ toggleSidebar }) {
const [userEmail, setUserEmail] = useState("");

useEffect(() => {
const getUser = async () => {
const {
data: { user },
} = await supabase.auth.getUser();


  if (user) {
    setUserEmail(user.email);
  }
};

getUser();


}, []);

const handleLogout = async () => {
await supabase.auth.signOut();
window.location.href = "/login";
};

return ( <div
   className="fixed top-0 left-0 right-0 h-16
   bg-[#020617]/80 backdrop-blur-xl border-b border-white/10
   flex items-center justify-between px-4 md:px-6 z-[100]"
 >

```
  {/* LEFT */}
  <div className="flex items-center gap-3">
    <button onClick={toggleSidebar}>
      <Menu
        size={20}
        className="text-gray-300 hover:text-white"
      />
    </button>

    <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">
      MY EXAM TRACKER
    </h1>
  </div>

  {/* RIGHT */}
  <div className="flex items-center gap-4">

    <div className="hidden md:flex flex-col items-end">
      <span className="text-xs text-gray-500">
        Logged In
      </span>

      <span className="text-sm text-gray-300">
        {userEmail}
      </span>
    </div>

    <button
      onClick={handleLogout}
      className="
      flex items-center gap-2
      px-3 py-2 rounded-lg
      bg-red-500/20
      hover:bg-red-500/30
      border border-red-500/20
      text-red-300
      transition-all
      "
    >
      <LogOut size={16} />
      <span className="hidden md:block">
        Logout
      </span>
    </button>

  </div>

</div>


);
}
