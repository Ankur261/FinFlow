import React from 'react';
import './MainPage.css'; 
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="main-page">
      {/* Hero Section */}
      <header className="hero-section">
        <nav className="main-nav">
          <div className="logo">
            <span className="logo-icon">💰</span>
            <h1>FinFlow</h1>
          </div>
          <div className="nav-links">
            <button onClick={() => navigate('/login')} className="login-btn">Login</button>
            <button onClick={() => navigate('/register')} className="register-btn">Get Started</button>
          </div>
        </nav>

        <div className="hero-content">
          <h1>Your Financial Ecosystem, Simplified</h1>
          <p>Manage payments, investments, and expenses in one seamless platform.</p>
          <button onClick={() => navigate('/register')} className="cta-btn">Join FinFlow Today</button>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose FinFlow?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Smart Analytics</h3>
            <p>Track spending patterns and optimize your finances with AI-driven insights.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💸</div>
            <h3>Instant Payments</h3>
            <p>Send and receive money with zero delays using blockchain-backed transactions.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Bank-Level Security</h3>
            <p>Your data is encrypted with military-grade security protocols.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h2>Trusted by Thousands</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"FinFlow transformed how I manage my business finances. Highly recommended!"</p>
            <div className="user">
              <span className="user-icon">👨‍💼</span>
              <span className="user-name">Alex, CEO of TechCorp</span>
            </div>
          </div>
          <div className="testimonial-card">
            <p>"Finally, a financial app that doesn’t confuse me. Simple and powerful."</p>
            <div className="user">
              <span className="user-icon">👩‍💻</span>
              <span className="user-name">Sarah, Freelancer</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action
      <section className="cta-section">
        <h2>Ready to Transform Your Finances?</h2>
        <button onClick={() => navigate('/register')} className="cta-btn">Start Free Trial</button>
      </section> */}

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Us</a>
        </div>
        <p>© 2024 FinFlow. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainPage;