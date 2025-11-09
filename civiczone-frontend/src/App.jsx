import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./components/Dashboard";
import SubmitIssue from "./pages/SubmitIssue";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";

export default function App() {
  const [page, setPage] = useState("LandingPage");
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setPage("home");
  };

  return (
    <>
      <Navbar setPage={setPage} token={token} handleLogout={handleLogout} />
      {page === "landing" && <LandingPage setPage={setPage} />}
      {page === "home" && <Home setPage={setPage} />}
      {page === "login" && <Login setPage={setPage} setToken={setToken} />}
      {page === "register" && <Register setPage={setPage} />}
      {page === "dashboard" && <Dashboard token={token} setPage={setPage} />}
      {page === "submit" && <SubmitIssue token={token} setPage={setPage} />}
    </>
  );
}
