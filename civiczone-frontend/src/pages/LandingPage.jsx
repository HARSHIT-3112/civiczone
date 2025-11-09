export default function LandingPage({ setPage }) {
  return (
    <div className="landing">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Make Your City <span>Smarter</span> and <span>Cleaner</span>
          </h1>
          <p>
            CivicZone empowers citizens to report issues like potholes, garbage, and pollution in just a click — connecting directly with the right authorities.
          </p>
          <div className="cta-buttons">
            <button onClick={() => setPage("register")} className="btn-primary">
              🚀 Get Started
            </button>
            <button onClick={() => setPage("login")} className="btn-secondary">
              🔑 Login
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features">
        <h2>Why CivicZone?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <img src="https://cdn-icons-png.flaticon.com/512/3601/3601652.png" alt="report" />
            <h3>Report Instantly</h3>
            <p>Capture or upload an image of the issue and we’ll handle the rest.</p>
          </div>
          <div className="feature-card">
            <img src="https://cdn-icons-png.flaticon.com/512/893/893257.png" alt="track" />
            <h3>Track Progress</h3>
            <p>Stay updated with real-time dashboard and live status tracking.</p>
          </div>
          <div className="feature-card">
            <img src="https://cdn-icons-png.flaticon.com/512/1077/1077041.png" alt="resolve" />
            <h3>Faster Resolution</h3>
            <p>Authorities receive direct notifications to resolve issues quickly.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="workflow">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <span>1</span>
            <p>Upload photo or capture using your phone camera.</p>
          </div>
          <div className="step">
            <span>2</span>
            <p>Our system auto-detects the issue and its location.</p>
          </div>
          <div className="step">
            <span>3</span>
            <p>Email is sent automatically to the respective department.</p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="final-cta">
        <h2>Be the Change Maker 🌎</h2>
        <p>Your small action can make a big difference for your city.</p>
        <button onClick={() => setPage("register")} className="btn-primary big-btn">
          Join CivicZone Now
        </button>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© {new Date().getFullYear()} CivicZone. Built with ❤️ by Harshit Chaturvedi.</p>
      </footer>
    </div>
  );
}
