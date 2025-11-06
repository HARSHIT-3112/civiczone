import Navbar from "./components/Navbar";
import ImageUploader from "./components/ImageUploader";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <div className="intro">
          <h1>CivicZone 🏙️</h1>
          <p>
            Report civic issues instantly — powered by AI and automatic
            location detection.
          </p>
        </div>
        <ImageUploader />
      </main>
    </div>
  );
}

export default App;
