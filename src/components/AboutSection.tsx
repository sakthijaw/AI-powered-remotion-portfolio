import React from 'react';
import { DEVELOPER_PROFILE } from '../data/projectsData';
import { usePhysicalTilt } from '../hooks/usePhysicalTilt';

export const AboutSection: React.FC = () => {
  const bioTilt = usePhysicalTilt({
    maxTilt: 4,
    perspective: 900,
    scaleOnHover: 1.015,
  });

  const expTilt = usePhysicalTilt({
    maxTilt: 4,
    perspective: 900,
    scaleOnHover: 1.015,
  });

  return (
    <section className="scroll-section about-section" id="about">
      <div className="about-container">
        <div className="section-eyebrow">04 / ABOUT THE ARCHITECT</div>
        <h2 className="section-heading">
          Engineering At The Intersection Of <span className="gradient-word">AI, 3D & Data</span>
        </h2>

        <div className="about-grid">
          {/* Physical Bio Card */}
          <div
            ref={bioTilt.ref}
            {...bioTilt.props}
            style={bioTilt.style}
            className="about-bio-card"
          >
            <div className="card-shine-layer" style={bioTilt.shineStyle} />
            <h3 className="about-bio-name">{DEVELOPER_PROFILE.name}</h3>
            <span className="about-bio-title">{DEVELOPER_PROFILE.title}</span>
            <p className="about-bio-text">{DEVELOPER_PROFILE.bio}</p>
            <p className="about-bio-philosophy">
              <strong>Core Philosophy:</strong> {DEVELOPER_PROFILE.philosophy}
            </p>

            <div className="about-meta-row">
              <div className="meta-badge">
                <span className="pulse-dot-green"></span>
                <span>{DEVELOPER_PROFILE.status}</span>
              </div>
              <div className="meta-badge">
                <span>📍 {DEVELOPER_PROFILE.location}</span>
              </div>
            </div>
          </div>

          {/* Physical Experience Highlights Card */}
          <div
            ref={expTilt.ref}
            {...expTilt.props}
            style={expTilt.style}
            className="about-experience-card"
          >
            <div className="card-shine-layer" style={expTilt.shineStyle} />
            <h3 className="about-exp-heading">What Sets This Work Apart</h3>
            <ul className="about-exp-list">
              <li>
                <strong>1. End-to-End Autonomous Systems:</strong> From prompt parsing to multi-agent API execution, zero manual keyframes or stock templates.
              </li>
              <li>
                <strong>2. Verified Grounded Provenance:</strong> Direct integration with authoritative datasets (Data Commons, UN, EDGAR, ABS) via Model Context Protocol.
              </li>
              <li>
                <strong>3. 60 FPS Chromium QA Verification:</strong> Automated frame-by-frame jitter, contrast ratio, and WCAG AAA compliance testing.
              </li>
              <li>
                <strong>4. High-End Monochromatic UI/3D Design:</strong> Restrained, editorial visual language created for luxury digital products and elite research environments.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
