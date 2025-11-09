import { useState } from "react";
import { login } from "../services/api";

export default function Login({ setPage, setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("⏳ Logging in...");

    try {
      const data = await login({ email, password });
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("is_admin", data.is_admin);
      localStorage.setItem("name", data.name || "User");
      setToken(data.access_token);
      setMsg("✅ Login successful!");
      setTimeout(() => setPage("dashboard"), 1200);
    } catch (err) {
      setMsg("❌ Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>🔐 Welcome Back</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {msg && <p className="msg">{msg}</p>}
      </div>
    </div>
  );
}
