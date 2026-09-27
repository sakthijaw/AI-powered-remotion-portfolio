import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer-clean">
      <div className="footer-inner">
        <div className="footer-credits">
          <span style={{ color: 'var(--text-pure)', fontWeight: 700 }}>
            AUTONOMOUS AI DIRECTOR
          </span>
          {' · '}
          <span>Grounded in Edward Tufte Principles · Engineered by Sakthi</span>
        </div>

        <ul className="footer-links">
          <li>
            <a
              href="#hero"
              className="footer-link"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Overview
            </a>
          </li>
          <li>
            <a href="#exhibits" className="footer-link">
              Work
            </a>
          </li>
          <li>
            <a href="#architecture" className="footer-link">
              Architecture
            </a>
          </li>
          <li>
            <a href="#about" className="footer-link">
              About
            </a>
          </li>
          <li>
            <a href="#contact" className="footer-link">
              Contact
            </a>
          </li>
          <li>
            <span className="footer-status-tag">● 60 FPS CHROMIUM VERIFIED</span>
          </li>
        </ul>
      </div>
    </footer>
  );
};
