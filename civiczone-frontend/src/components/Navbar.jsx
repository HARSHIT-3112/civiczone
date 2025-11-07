export default function Navbar({setPage, token, logout}) {
  return (
    <nav className="navbar">
      <div style={{display:"flex", alignItems:"center", gap:20}}>
        <div className="logo">🌐 CivicZone</div>
        <button onClick={()=>setPage("home")} className="link">Home</button>
        <button onClick={()=>setPage("dashboard")} className="link">Dashboard</button>
      </div>
      <div>
        {!token ? (
          <>
            <button onClick={()=>setPage("login")} className="link">Login</button>
            <button onClick={()=>setPage("register")} className="link">Register</button>
          </>
        ) : (
          <button onClick={logout} className="link">Logout</button>
        )}
      </div>
    </nav>
  );
}
