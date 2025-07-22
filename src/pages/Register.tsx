// src/pages/Register.tsx
import { useState } from "react";
import { register } from "../api/auth";

export default function Register({ onRegisterSuccess }: { onRegisterSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password, birthDate, name, lastname, phone);
      onRegisterSuccess(); // Go back to login screen
    } catch (err) {
      setError("Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80 space-y-4">
        <h2 className="text-xl font-semibold">Register</h2>

        {error && <p className="text-red-500">{error}</p>}

        <input
          type="text"
          placeholder="First Name"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          className="w-full border p-2 rounded"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          className="w-full border p-2 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
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
        <input
          type="date"
          className="w-full border p-2 rounded"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
        />

        <button type="submit" className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600">
          Register
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <span onClick={onRegisterSuccess} className="text-teal-600 hover:underline cursor-pointer">
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
