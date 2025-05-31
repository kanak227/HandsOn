import { BrainCircuit, Image, Globe, BarChart, Users, Zap } from "lucide-react"
import { Link } from "react-router-dom"

const ExplorePage = () => {
  return (
    <div className="explore-page">
      <nav className="asl-navbar">
        <div className="asl-container">
          <Link to="/" className="asl-logo">
            HandsOn
          </Link>
          <ul className="asl-nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/self-testing">Self Testing</Link></li>
            <li><Link to="/video-calling">Video Calling</Link></li>
            <li><Link to="/learn">Learn ASL</Link></li>
            <li><Link to="/explore">Explore Model</Link></li>
          </ul>
        </div>
      </nav>
      
      <header className="hero">
        <div className="container">
          <h1>
            Explore Our <span>AI Model</span>
          </h1>
          <p>
            Uncover the capabilities of our state-of-the-art American Sign Language (ASL) recognition system, engineered for accuracy, speed, and accessibility.
          </p>
        </div>
      </header>

      <section className="technical-details">
        <div className="container">
          <h2>Technical Highlights</h2>
          <div className="tech-grid">
            <div className="tech-card box">
              <BrainCircuit className="icon" />
              <h3>MobileNet Architecture</h3>
              <p>
                Our solution leverages the highly efficient MobileNet architecture, specifically optimized for deployment on mobile and edge devices. This ensures high performance without sacrificing computational efficiency.
              </p>
            </div>
            <div className="tech-card box">
              <Image className="icon" />
              <h3>Comprehensive Dataset</h3>
              <p>
                The model is fine-tuned on a meticulously curated dataset comprising over 30,000 ASL gesture images. This extensive dataset enables robust recognition across a wide spectrum of hand shapes, orientations, and lighting conditions.
              </p>
            </div>
            <div className="tech-card box">
              <Globe className="icon" />
              <h3>Real-Time Inference</h3>
              <p>
                Experience instantaneous detection and recognition, delivering real-time feedback to facilitate seamless and natural communication.
              </p>
            </div>
            <div className="tech-card box">
              <BarChart className="icon" />
              <h3>Exceptional Accuracy</h3>
              <p>
                Achieving an outstanding 99% accuracy rate, our model ensures reliable and precise ASL gesture recognition, even in challenging scenarios.
              </p>
            </div>
            <div className="tech-card box">
              <Users className="icon" />
              <h3>Multi-User Capability</h3>
              <p>
                Designed to support simultaneous gesture detection from multiple users, the system adapts to diverse environments and collaborative settings.
              </p>
            </div>
            <div className="tech-card box">
              <Zap className="icon" />
              <h3>Ultra-Low Latency</h3>
              <p>
                Engineered for minimal latency, the platform guarantees smooth and highly responsive user interactions, critical for real-time applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="asl-footer">
        <div className="footer-container">
          <span>© {new Date().getFullYear()} HandsOn. All rights reserved.</span>
        </div>
      </footer>

      <style jsx>{`
        .explore-page {
          font-family: 'Inter', sans-serif;
          color: #fff;
          line-height: 1.6;
          background: #18181b;
        }
        .asl-navbar, .asl-nav-links a, .asl-logo {
          color: #fff !important;
        }
        .hero, .hero h1, .hero p, .technical-details h2 {
          color: #fff;
        }
        .tech-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2rem;
        }
        .tech-card.box {
          background: #23232a;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.2);
          padding: 2rem 1.5rem;
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .tech-card.box:hover {
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
        .tech-card .icon {
          width: 48px;
          height: 48px;
          margin-bottom: 1rem;
          color: #38bdf8;
        }
        .tech-card h3 {
          margin: 0.5rem 0 0.75rem 0;
          font-size: 1.2rem;
          color: #fff;
        }
        .tech-card p {
          color: #e5e7eb;
          font-size: 1rem;
          text-align: center;
        }
        .technical-details h2 {
          margin-top: 3rem;
          margin-bottom: 2rem;
          text-align: center;
          font-size: 2rem;
        }
        .asl-footer {
          background: #18181b;
          color: #fff;
          text-align: center;
          padding: 1.5rem 0 1rem 0;
          margin-top: 3rem;
          font-size: 1rem;
          border-top: 1px solid #23232a;
        }
        .footer-container {
          max-width: 900px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  )
}

export default ExplorePage
