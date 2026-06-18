import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Authentication Done");

    navigate("/");
  };

  return (
    // existing JSX
  )

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <div className="w-full max-w-md bg-[#0f172a] p-8 rounded-2xl border border-white/10">

        <h1 className="text-3xl font-bold text-white mb-6">
          UPSC Intelligence System
        </h1>

        <input
          className="w-full p-3 rounded bg-[#1e293b] text-white mb-4"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 rounded bg-[#1e293b] text-white mb-4"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full p-3 rounded bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Login
        </button>

      </div>
    </div>
  );
}