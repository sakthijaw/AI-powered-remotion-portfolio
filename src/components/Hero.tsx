import React from 'react';
import { DEVELOPER_PROFILE } from '../data/projectsData';
import { usePhysicalTilt } from '../hooks/usePhysicalTilt';
import { useSpatialParallax } from '../hooks/useSpatialParallax';
import { Hero3DDirector } from './Hero3DDirector';

interface HeroProps {
  onExplore: () => void;
  onOpenArchitecture: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExplore,
  onOpenArchitecture,
}) => {
  // Ambient spatial parallax
  const { mouseX, mouseY } = useSpatialParallax();

  // Metric cards 3D tilt
  const metricTilt = usePhysicalTilt({
    maxTilt: 3.5,
    perspective: 800,
    scaleOnHover: 1.02,
  });

  const textFloatStyle = {
    transform: `translate3d(${(mouseX * -7).toFixed(1)}px, ${(mouseY * -5).toFixed(1)}px, 0)`,
    transition: 'transform 0.25s ease-out',
  };

  return (
    <section className="scroll-section hero-section" id="hero">
      <div className="hero-dual-grid">
        {/* Left Column: Natural Editorial Typography & Single Clear CTA */}
        <div className="hero-left-col" style={textFloatStyle}>
          <div className="hero-pill">
            <span className="pill-glow-dot"></span>
            <span>CREATIVE TECHNOLOGIST & AI ARCHITECT</span>
          </div>

          <h1 className="hero-title">
            I engineer <span className="gradient-word">autonomous visual reasoning</span> experiences.
          </h1>

          <p className="hero-desc">
            Transforming live statistical datasets from Google Data Commons into broadcast-quality 60fps kinetic motion documentaries using 226+ digitized Edward Tufte visual reasoning skills.
          </p>

          {/* Technical Capability Badges */}
          <div className="hero-tags-strip">
            <span className="hero-tag-item">AI / MULTI-AGENT</span>
            <span className="hero-tag-item">REACT 19</span>
            <span className="hero-tag-item">REMOTION 4.0</span>
            <span className="hero-tag-item">DATA COMMONS MCP</span>
            <span className="hero-tag-item">PYTHON</span>
            <span className="hero-tag-item">TUFTE GRAPHICS</span>
          </div>

          {/* Single Clear CTA (Scrolls directly to Selected Work) */}
          <div className="hero-cta-group">
            <button className="btn-cta" onClick={onExplore} title="Explore the 5 Finished Video Documentaries">
              <span>View 5 Documentaries & Systems</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </button>

            <button className="btn-secondary" onClick={onOpenArchitecture} title="Inspect 3-Subagents Production System">
              <span>System Architecture ↓</span>
            </button>
          </div>

          {/* Verified Metrics Counter Bar */}
          <div
            ref={metricTilt.ref}
            {...metricTilt.props}
            style={metricTilt.style}
            className="hero-metrics-bar"
          >
            <div className="card-shine-layer" style={metricTilt.shineStyle} />
            {DEVELOPER_PROFILE.metrics.map((m) => (
              <div key={m.label} className="hero-metric-item">
                <span className="hero-metric-val">{m.value}</span>
                <span className="hero-metric-lbl">{m.label}</span>
                <div className="metric-progress-track">
                  <div className="metric-progress-fill"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive 3D Autonomous AI Director Object (Lens, Gimbal, Data Particles) */}
        <div className="hero-right-col">
          <Hero3DDirector onExplore={onExplore} />
        </div>
      </div>

      <div className="scroll-indicator-wrap" onClick={onExplore} style={{ cursor: 'pointer' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="7" />
          <line x1="12" y1="6" x2="12" y2="10" />
        </svg>
        <span>Scroll to Explore 5 Documentaries</span>
      </div>
    </section>
  );
};
