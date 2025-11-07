import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./components/Dashboard";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [page, setPage] = useState("home");

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setPage("home");
  };

  return (
    <div>
      <Navbar setPage={setPage} token={token} logout={logout}/>
      <div style={{padding:20}}>
        {page === "home" && <Home token={token} />}
        {page === "login" && <Login setToken={(t)=>{ setToken(t); localStorage.setItem("token", t); setPage("dashboard"); }} />}
        {page === "register" && <Register setPage={setPage} />}
        {page === "dashboard" && <Dashboard token={token} />}
      </div>
    </div>
  );
}

export default App;
