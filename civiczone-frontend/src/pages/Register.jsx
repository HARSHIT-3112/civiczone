import { useState } from "react";
import { register } from "../services/api";

export default function Register({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setMsg("⚠️ Passwords do not match!");
      return;
    }

    setLoading(true);
    setMsg("⏳ Registering...");

    try {
      await register({ email, password, name });
      setMsg("✅ Registered successfully! Redirecting to login...");
      setTimeout(() => setPage("login"), 1500);
    } catch (err) {
      setMsg("❌ Registration failed. Try again with a new email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>🧍‍♂️ Create Your Account</h2>
        <p className="subtitle">Join CivicZone and start improving your city!</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="switch">
            Already have an account?{" "}
            <span onClick={() => setPage("login")}>Login here</span>
          </p>
        </form>

        {msg && <p className="msg">{msg}</p>}
      </div>
    </div>
  );
}
