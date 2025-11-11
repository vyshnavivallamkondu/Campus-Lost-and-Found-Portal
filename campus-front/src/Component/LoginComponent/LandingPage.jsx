import React, { useEffect, useState, useRef } from "react";
import "../../Landing.css";
import { useNavigate } from "react-router-dom";
const LandingPageNew = () => {
  const navigate = useNavigate();
  const phrases = [
    "Find Your Lost Items",
    "Reunite with What's Missing",
    "Lost & Found — Made Simple",
  ];

  const quotes = [
    "“The best way to find something you’ve lost is to stop looking for it.” – Ideology",
    "“Lost items are just waiting to be found by the right person.” – Perfection",
    "“Hope is the greatest finder in the world of lost things.” – Inspirational",
  ];

  // Typing effect state
  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    let typingTimer;
    const typeSpeed = 60;
    const pauseAfterPhrase = 1800;

    const startTyping = () => {
      const current = phrases[phraseIndex];
      if (!mounted.current) return;
      if (charIndex < current.length) {
        typingTimer = setTimeout(() => {
          setTypedText((t) => t + current.charAt(charIndex));
          setCharIndex((i) => i + 1);
        }, typeSpeed);
      } else {
        // finished current phrase, pause then reset and move to next
        typingTimer = setTimeout(() => {
          setTypedText("");
          setCharIndex(0);
          setPhraseIndex((p) => (p + 1) % phrases.length);
        }, pauseAfterPhrase);
      }
    };

    startTyping();
    return () => {
      clearTimeout(typingTimer);
      mounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charIndex, phraseIndex]);

  // Typing cursor blink
  useEffect(() => {
    const cTimer = setInterval(() => setShowCursor((s) => !s), 500);
    return () => clearInterval(cTimer);
  }, []);

  // Quote rotation
  useEffect(() => {
    const qTimer = setInterval(() => {
      setQuoteIndex((q) => (q + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(qTimer);
  }, []);

  // Small entrance animations trigger (optional)
  useEffect(() => {
    // add class after mount for entrance transitions
    const root = document.querySelector(".lp-new-root");
    if (root) {
      setTimeout(() => root.classList.add("entered"), 50);
    }
  }, []);

  return (
    <div className="lp-new-root">
      {/* Animated background shapes */}
      <div className="bg-shapes" aria-hidden="true">
        <div className="shape shape-1" />
        <div className="shape shape-2" />
        <div className="shape shape-3" />
        <div className="shape shape-4" />
      </div>

      <header className="hero-section d-flex align-items-center">
        <div className="cont">
          <div className="top">
            {/* Left side text */}
            <div className="left">
              <div className="logo-and-tag">
                <div className="logo-circle" />
                <div className="brand">
                  <h6 className="brand-title">Lost & Found Portal</h6>
                  <p className="brand-tag">Reunite. Recover. Restore.</p>
                </div>
              </div>

              <h1 className="hero-title">
                Welcome to the <span className="accent">Lost & Found</span>{" "}
                Portal
              </h1>

              <p className="typed-line">
                <span className="typed-text" aria-hidden="true">
                  {typedText}
                </span>
                <span
                  className={`typed-cursor ${showCursor ? "blink" : ""}`}
                  aria-hidden="true"
                >
                  |
                </span>
              </p>

              <blockquote className="hero-quote">
                <p>{quotes[quoteIndex]}</p>
              </blockquote>

              <div className="hero-cta d-flex gap-3 mt-4">
                <button
                  className="btn btn-primary btn-lg hero-btn"
                  onClick={() => navigate("/login")}
                >
                  <i className="bi bi-box-arrow-in-right me-2" />
                  LOGIN
                </button>

                <button
                  className="btn btn-outline-primary btn-lg hero-btn-alt"
                  onClick={() => navigate("/register")}
                >
                  <i className="bi bi-person-plus me-2" />
                  REGISTER
                </button>
              </div>
            </div>

            {/* Right side preview / card */}
            <div className="right">
              <div className="preview-card">
                <div className="preview-top">
                  <div className="dot red" />
                  <div className="dot yellow" />
                  <div className="dot green" />
                </div>

                <div className="preview-body">
                  <div className="item-row">
                    <div className="item-icon">🔎</div>
                    <div className="item-text">
                      <strong>Search items</strong>
                      <div className="muted">Find lost belongings near you</div>
                    </div>
                  </div>

                  <div className="item-row">
                    <div className="item-icon">📦</div>
                    <div className="item-text">
                      <strong>Report found</strong>
                      <div className="muted">Upload photos & location</div>
                    </div>
                  </div>

                  <div className="item-row">
                    <div className="item-icon">🤝</div>
                    <div className="item-text">
                      <strong>Connect</strong>
                      <div className="muted">Message and arrange return</div>
                    </div>
                  </div>
                </div>

                <div className="preview-footer">
                  <button
                    className="btns"
                    onClick={() => navigate("/register")}
                  >
                    Explore
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="features-section py-5">
        <div className="cont">
          <h2 className="section-title mb-5">Why choose us?</h2>

          <div className="mains">
            <div className="cards">
              <article className="feature-card">
                <div className="feature-icon">🔎</div>
                <h5>Easy Search</h5>
                <p>
                  Powerful search to locate items quickly with filters & images.
                </p>
              </article>
            </div>

            <div className="cards">
              <article className="feature-card">
                <div className="feature-icon">🛡️</div>
                <h5>Secure & Trusted</h5>
                <p>Verified handovers, privacy-first messaging and controls.</p>
              </article>
            </div>

            <div className="cards">
              <article className="feature-card">
                <div className="feature-icon">🤝</div>
                <h5>Community Driven</h5>
                <p>A community focused on reuniting belongings with owners.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer text-center py-4">
        <div className="cont">
          <small>
            © {new Date().getFullYear()} Lost & Found Portal. All rights
            reserved.
          </small>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageNew;
