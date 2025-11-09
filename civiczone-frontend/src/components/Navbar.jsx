export default function Navbar({ setPage, token, handleLogout }) {
  return (
    <nav className="navbar">
      <div
        className="logo"
        style={{ cursor: "pointer" }}
        onClick={() => setPage("home")}
      >
        🌐 CivicZone
      </div>
      <div>
        {!token ? (
          <>
            <button onClick={() => setPage("home")}>Home</button>
            <button onClick={() => setPage("login")}>Login</button>
            <button onClick={() => setPage("register")}>Register</button>
          </>
        ) : (
          <>
            <button onClick={() => setPage("dashboard")}>Dashboard</button>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
