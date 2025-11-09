import { useEffect, useState } from "react";
import { getReports, updateStatus } from "../services/api";
import { Pie, Bar } from "react-chartjs-2";
import { Chart, ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Dashboard({ token, setPage }) {
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({});
  const [refresh, setRefresh] = useState(false);
  const isAdmin = localStorage.getItem("is_admin") === "true";
  const name = localStorage.getItem("name");

  useEffect(() => {
    (async () => {
      const data = await getReports(isAdmin ? null : token);
      setReports(data);
      const counts = data.reduce((acc, r) => {
        acc[r.issue_type] = (acc[r.issue_type] || 0) + 1;
        return acc;
      }, {});
      setStats(counts);
    })();
  }, [token, refresh]);

  const ongoing = reports.filter((r) => r.status === "Ongoing");
  const completed = reports.filter((r) => r.status === "Completed");

  const handleMarkComplete = async (id) => {
    await updateStatus(id, "Completed");
    setRefresh(!refresh);
  };

  return (
    <div className="dashboard">
      <h1>👋 Welcome {name}</h1>
      <p className="subtext">
        {isAdmin ? "You are logged in as an Authority" : "You are logged in as a Citizen"}
      </p>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card blue"><h3>Total</h3><p>{reports.length}</p></div>
        <div className="stat-card green"><h3>Completed</h3><p>{completed.length}</p></div>
        <div className="stat-card orange"><h3>Ongoing</h3><p>{ongoing.length}</p></div>
      </div>

      {!isAdmin && (
        <button onClick={() => setPage("submit")} className="upload-btn submit-btn">
          ➕ Submit a New Issue
        </button>
      )}

      {/* Charts */}
      <div className="charts">
        <div className="chart-card">
          <h3>🧾 Reports by Type</h3>
          <Pie
            data={{
              labels: Object.keys(stats),
              datasets: [{
                data: Object.values(stats),
                backgroundColor: ["#42a5f5", "#66bb6a", "#ffa726", "#ab47bc", "#ef5350"]
              }]
            }}
          />
        </div>

        <div className="chart-card">
          <h3>📈 Ongoing vs Completed</h3>
          <Bar
            data={{
              labels: ["Ongoing", "Completed"],
              datasets: [{
                label: "Reports",
                data: [ongoing.length, completed.length],
                backgroundColor: ["#29b6f6", "#66bb6a"]
              }]
            }}
          />
        </div>
      </div>

      {/* Reports */}
      <div className="report-section">
        <h2>{isAdmin ? "All Ongoing Issues" : "Your Ongoing Issues"}</h2>
        {ongoing.length === 0 && <p>No ongoing issues.</p>}
        <div className="report-list">
          {ongoing.map((r) => (
            <div className="report-card" key={r.id}>
              <p><b>{r.issue_type}</b> — {r.description}</p>
              <small>📍 {r.lat.toFixed(2)}, {r.lon.toFixed(2)}</small>
              {isAdmin && (
                <button className="mark-btn" onClick={() => handleMarkComplete(r.id)}>
                  ✅ Mark Completed
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Completed */}
      <div className="report-section">
        <h2>✅ Completed Issues</h2>
        {completed.length === 0 && <p>No completed issues yet.</p>}
        <div className="report-list">
          {completed.map((r) => (
            <div className="report-card completed" key={r.id}>
              <p><b>{r.issue_type}</b> — {r.description}</p>
              <small>📍 {r.lat.toFixed(2)}, {r.lon.toFixed(2)}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
