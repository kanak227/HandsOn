import React, { useState } from 'react';
import { Link } from "react-router-dom"
import { Camera, Video, BrainCircuit, Users, BookOpen, Heart, Github, Twitter, Linkedin } from 'lucide-react'
import "./home.css"
import hero from "./hero.jpg"

const testimonials = [
  {
    quote: "HandsOn's intuitive interface and real-time sign detection have made communication effortless in our organization.",
    name: "Priya S.",
    role: "HR Manager"
  },
  {
    quote: "The AI detection is impressively accurate and the learning modules are engaging. Highly recommended for all ages.",
    name: "Alex R.",
    role: "Student"
  },
  {
    quote: "As an educator, HandsOn has helped me create a more inclusive classroom. The resources are top-notch.",
    name: "John D.",
    role: "Teacher"
  },
  {
    quote: "The video communication feature bridges the gap between hearing and non-hearing individuals seamlessly.",
    name: "Sarah M.",
    role: "Healthcare Professional"
  },
  {
    quote: "A must-have tool for anyone looking to learn or communicate using sign language. The support team is fantastic.",
    name: "Ravi K.",
    role: "Parent"
  }
];

const HomePage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="homepage">
      {/* Navbar */}
      <nav className="asl-navbar">
              <div className="asl-container">
                <Link to="/" className="asl-logo">HandsOn</Link>
                <ul className="asl-nav-links">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/self-testing">Self Testing</Link></li>
                  <li><Link to="/video-calling">Video Calling</Link></li>
                  <li><Link to="/learn">Learn ASL</Link></li>
                  <li><Link to="/explore">Explore Model</Link></li>
                </ul>
              </div>
            </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>
              Empowering Communication, Enabling Inclusion <span role="img" aria-label="sparkles">✨</span>
            </h1>
            <p>
              HandsOn leverages advanced AI to provide seamless, real-time sign language recognition and learning tools. 
              Our platform is designed for professionals, educators, and families seeking to foster accessible and inclusive communication. <span role="img" aria-label="hands">👐</span>
            </p>
            <div className="hero-buttons" style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
              <Link to="/features" className="primary-button">
                <span role="img" aria-label="rocket">🚀</span> Explore Features
              </Link>
              <Link to="/about" className="secondary-button">
                <span role="img" aria-label="people">👥</span> Meet Our Team
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <img src={hero} alt="Sign Language Hero" className='heroimg' />
          </div>
        </div>
        <div className="wave-shape"></div>
      </section>

      

      {/* Features Section */}
      <section className="solution-section">
        <div className="container">
          <div className="section-header-new">
            <h2>Key Features</h2>
            <div className="header-line"></div>
          </div>
          <div className="solution-grid">
            <div className="solution-card">
              <BrainCircuit className="icon" />
              <h3>AI Sign Detection</h3>
              <p>Instantly recognize and translate ASL gestures using advanced AI models.</p>
            </div>
            <div className="solution-card">
              <BookOpen className="icon" />
              <h3>Learn & Practice</h3>
              <p>Interactive lessons and quizzes to master sign language at your own pace.</p>
            </div>
            <div className="solution-card">
              <Video className="icon" />
              <h3>Video Communication</h3>
              <p>Connect with others using real-time video calls with sign language support.</p>
            </div>
          </div>
        </div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </section>
      
      {/* Testimonials Section with Carousel */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>What People Are Saying</h2>
          </div>
          <div className="testimonials-carousel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="testimonial-card" style={{ minWidth: 320, maxWidth: 500, textAlign: 'center' }}>
              <div className="testimonial-content">
                <p>"{testimonials[currentTestimonial].quote}"</p>
                <div className="testimonial-author">
                  <div>
                    <h4>{testimonials[currentTestimonial].name}</h4>
                    <p>{testimonials[currentTestimonial].role}</p>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
              <button
                aria-label="Previous testimonial"
                onClick={prevTestimonial}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--primary-color)",
                  fontSize: 24,
                  cursor: "pointer"
                }}
              >&lt;</button>
              <div style={{ display: 'flex', gap: 4 }}>
                {testimonials.map((_, idx) => (
                  <span
                    key={idx}
                    style={{
                      display: 'inline-block',
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: idx === currentTestimonial ? 'var(--primary-color)' : '#444',
                      margin: '0 2px'
                    }}
                  />
                ))}
              </div>
              <button
                aria-label="Next testimonial"
                onClick={nextTestimonial}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--primary-color)",
                  fontSize: 24,
                  cursor: "pointer"
                }}
              >&gt;</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Start Your Journey Today!</h2>
          <p className='footerfont'>Join our community and unlock the power of sign language.</p>
          <div className="cta-buttons">
            <Link to="/features" className="primary-button">
              Try Features
            </Link>
            <Link to="/contact" className="secondary-button">
              Contact Us
            </Link>
          </div>
        </div>
        <div className="circle-shape"></div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>🤟 HandsOn</h3>
              <p>Empowering communication for everyone.</p>
              <div className="social-links">
                <a href="https://github.com/kanak227/HandsOn.git" aria-label="Github">
                  <Github />
                </a>
                <a href="#" aria-label="Twitter">
                  <Twitter />
                </a>
                <a href="#" aria-label="LinkedIn">
                  <Linkedin />
                </a>
              </div>
            </div>
            <div className="footer-section">
              <h4>Navigation</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/self-testing">Self Testing</Link></li>
                <li><Link to="/video-calling">Video Calling</Link></li>
                <li><Link to="/learn">Learn ASL</Link></li>
                
              </ul>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <Link to="/">About Us</Link>
                </li>
                <li><Link to="/explore">Explore Model</Link></li>
                <li>
                  <Link to="/">Contact</Link>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact Us</h4>
              <ul>
                <li>+91 3953934839</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} HandsOn. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
