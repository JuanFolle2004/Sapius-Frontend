// src/pages/Login.tsx
import { useState } from "react";
import { login } from "../api/auth";

interface LoginProps {
  onLogin: (goTo?: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      
      console.log("Login response:", res); // 👈 ADD THIS
      console.log("Saving token:", res.access_token); // ✅ Step 2

      localStorage.setItem("token", res.access_token);
      onLogin(); // triggers app to switch to logged-in view
    } catch (err) {
      setError("Login failed. Check credentials.");
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80 space-y-4">
        <h2 className="text-xl font-semibold">Login</h2>

        {error && <div className="text-red-500">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600"
        >
          Log In
        </button>

        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => onLogin("register")}
            className="text-teal-600 hover:underline cursor-pointer"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}
