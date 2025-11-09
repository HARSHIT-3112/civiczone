const BASE = "http://127.0.0.1:8000";

export async function register(user) {
  const res = await fetch(`${BASE}/auth/register`, {
    method:"POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(user)
  });
  if (!res.ok) throw new Error("Register failed");
  return res.json();
}

export async function login(credentials) {
  const res = await fetch(`${BASE}/auth/login`, {
    method:"POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(credentials)
  });
  if(!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function createReport(file, lat, lon, token) {
  const form = new FormData();
  form.append("file", file);
  form.append("lat", lat);
  form.append("lon", lon);
  form.append("token", token);

  const res = await fetch(`${BASE}/reports/create`, { method:"POST", body: form });
  if(!res.ok) throw new Error("Report failed");
  return res.json();
}

export async function getReports(token) {
  const url = token ? `${BASE}/reports/?token=${token}` : `${BASE}/reports/`;
  const res = await fetch(url);
  return res.json();
}

// src/services/api.js
export async function updateStatus(reportId, status) {
  const res = await fetch(`http://127.0.0.1:8000/reports/update_status/${reportId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }), // send object { status: "Completed" }
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to update status: ${res.status} ${text}`);
  }
  return res.json();
}
