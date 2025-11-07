export default function ResultCard({ result }){
  if(!result) return null;
  return (
    <div className="result-card">
      <h3>Analysis Result</h3>
      <p><b>Issue:</b> {result.issue_type}</p>
      <p><b>Description:</b> {result.description}</p>
      <p><b>Status:</b> {result.email_sent ? "Email sent" : "Email failed"}</p>
    </div>
  );
}
