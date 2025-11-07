import { useEffect, useState } from "react";
import { getReports } from "../services/api";

export default function Dashboard({ token }) {
  const [reports,setReports]=useState([]);
  const [stats,setStats]=useState({});

  useEffect(()=>{
    (async()=>{
      const data = await getReports(token);
      setReports(data);
      const counts = data.reduce((acc,r)=>{
        acc[r.issue_type] = (acc[r.issue_type]||0)+1;
        return acc;
      },{});
      setStats(counts);
    })();
  },[token]);

  return (
    <div className="dashboard-container">
      <h1>My Dashboard</h1>
      <div className="stats-section">
        {Object.keys(stats).length ? Object.entries(stats).map(([k,v])=>(
          <div className="stat-card" key={k}>
            <h3>{k}</h3>
            <p>{v} reports</p>
          </div>
        )) : <p>No reports yet</p>}
      </div>

      <h2>Recent Reports</h2>
      <table className="report-table">
        <thead><tr><th>Issue</th><th>Description</th><th>Location</th><th>Status</th><th>Time</th></tr></thead>
        <tbody>
          {reports.slice(0,10).map(r=>(
            <tr key={r.id}>
              <td>{r.issue_type}</td>
              <td>{r.description}</td>
              <td>{r.lat.toFixed(3)}, {r.lon.toFixed(3)}</td>
              <td>{r.email_sent ? "✅ Sent":"❌"}</td>
              <td>{new Date(r.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
