const BASE_URL = "http://localhost:8000";

export async function analyzeIssue(image, lat, lon) {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("lat", lat);
  formData.append("lon", lon);

  const response = await fetch(`${BASE_URL}/analyze`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Backend request failed");
  return await response.json();
}
