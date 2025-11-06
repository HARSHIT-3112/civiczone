function ResultCard({ result }) {
  return (
    <div className="result-card">
      <h3>🧠 Analysis Result</h3>
      <p>
        <b>Detected Issue:</b> {result.label}
      </p>
      <p>
        <b>Description:</b> {result.description}
      </p>
    </div>
  );
}

export default ResultCard;
