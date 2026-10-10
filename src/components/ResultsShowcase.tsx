import React, { useState, useRef } from 'react';
import { PROJECTS_DATA, ProjectCaseStudy, DEVELOPER_PROFILE } from '../data/projectsData';

interface ExhibitCardProps {
  project: ProjectCaseStudy;
  index: number;
}

const ExhibitCard: React.FC<ExhibitCardProps> = ({ project, index }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isSpecsOpen, setIsSpecsOpen] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn('Playback error:', err));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if ((videoRef.current as any).webkitRequestFullscreen) {
      (videoRef.current as any).webkitRequestFullscreen();
    }
  };

  return (
    <article className="exhibit-card" id={project.id}>
      <div className="exhibit-layout-grid">
        {/* ===================================================================
            LEFT COLUMN: VIDEO PLAYER (Responsive, Autoplay-Ready, Contained)
            =================================================================== */}
        <div className="exhibit-video-column">
          <div className="exhibit-video-wrapper">
            <video
              ref={videoRef}
              src={project.videoSrc}
              poster={project.poster}
              muted
              playsInline
              loop
              preload="metadata"
              className="exhibit-video-elem"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Video Overlay Top Badge */}
            <div className="exhibit-video-top">
              <span className="exhibit-badge-num">{project.number}</span>
              <span className="exhibit-badge-category">{project.category}</span>
              <span className="exhibit-badge-duration">{project.duration}</span>
            </div>

            {/* In-Frame Media Controls */}
            <div className="exhibit-controls-bar">
              <button
                type="button"
                className="exhibit-ctrl-btn"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="6 3 20 12 6 21 6 3" />
                  </svg>
                )}
              </button>

              <button
                type="button"
                className="exhibit-ctrl-btn"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                )}
              </button>

              <div className="exhibit-status-pill">
                <span className="live-dot-green" />
                <span>60 FPS</span>
              </div>

              <button
                type="button"
                className="exhibit-ctrl-btn fs-btn"
                onClick={handleFullscreen}
                aria-label="Fullscreen"
                title="Fullscreen"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar below video */}
          <div className="exhibit-mini-metrics">
            <div className="mini-metric">
              <span className="lbl">FRAME RATE</span>
              <span className="val">{project.metrics.fps} FPS</span>
            </div>
            <div className="mini-metric">
              <span className="lbl">HALLUCINATION</span>
              <span className="val">{project.metrics.hallucinationRate}</span>
            </div>
            <div className="mini-metric">
              <span className="lbl">WCAG RATIO</span>
              <span className="val">{project.metrics.wcagRating}</span>
            </div>
            <div className="mini-metric">
              <span className="lbl">DATASET</span>
              <span className="val">{project.metrics.dataPoints}</span>
            </div>
          </div>
        </div>

        {/* ===================================================================
            RIGHT COLUMN: EDITORIAL CONTENT & TECHNICAL PROVENANCE
            =================================================================== */}
        <div className="exhibit-content-column">
          <div className="exhibit-header">
            <span className="exhibit-number">EXHIBIT {project.number}</span>
            <h3 className="exhibit-title">{project.title}</h3>
            <p className="exhibit-subtitle">{project.subtitle}</p>
          </div>

          {/* What / Why / How Structured Breakdown */}
          <div className="exhibit-breakdown-list">
            <div className="breakdown-item">
              <span className="item-tag">WHAT</span>
              <p className="item-text">{project.what}</p>
            </div>
            <div className="breakdown-item">
              <span className="item-tag">WHY</span>
              <p className="item-text">{project.why}</p>
            </div>
            <div className="breakdown-item">
              <span className="item-tag">HOW</span>
              <p className="item-text">{project.how}</p>
            </div>
            <div className="breakdown-item">
              <span className="item-tag">RESULT</span>
              <p className="item-text">{project.result}</p>
            </div>
          </div>

          {/* Tufte Principles Applied */}
          <div className="exhibit-tufte-box">
            <span className="tufte-box-label">TUFTE REASONING PRINCIPLES:</span>
            <p className="tufte-box-summary">{project.tufteSummary}</p>
            <div className="tufte-principles-list">
              {project.tufteSkills.map((ts) => (
                <div key={ts.skillId} className="tufte-skill-item">
                  <span className="skill-dot" />
                  <strong>{ts.name}:</strong> {ts.principle}
                </div>
              ))}
            </div>
          </div>

          {/* Technology Badges */}
          <div className="exhibit-tech-tags">
            {project.technology.map((t) => (
              <span key={t} className="tech-badge">
                {t}
              </span>
            ))}
          </div>

          {/* Expandable Technical Specs Toggle */}
          <div className="exhibit-toggle-row">
            <button
              type="button"
              className={`btn-specs-toggle ${isSpecsOpen ? 'open' : ''}`}
              onClick={() => setIsSpecsOpen(!isSpecsOpen)}
            >
              <span>{isSpecsOpen ? 'Hide 8-Beat Scene Arc & Claims ↑' : 'Inspect 8-Beat Scene Arc & Provenance ↓'}</span>
            </button>
          </div>

          {/* Expanded Drawer: 8-Beat Arc + Provenance Claims */}
          {isSpecsOpen && (
            <div className="exhibit-specs-drawer">
              {/* 8-Beat Narrative Arc */}
              <div className="drawer-group">
                <div className="drawer-title">8-BEAT NARRATIVE ARC ({project.scenes.length} SCENES)</div>
                <div className="drawer-scenes-list">
                  {project.scenes.map((scene, sIdx) => (
                    <div key={scene.id} className="scene-row">
                      <span className="scene-num">0{sIdx + 1}</span>
                      <div className="scene-details">
                        <div className="scene-top-line">
                          <span className="scene-goal">{scene.sceneGoal}</span>
                          <span className="scene-sec">{scene.durationSeconds}s</span>
                        </div>
                        <div className="scene-metaphor">
                          <span className="meta-lbl">Visual Metaphor:</span> {scene.visualMetaphor}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Claims */}
              <div className="drawer-group">
                <div className="drawer-title">VERIFIED DATA COMMONS CLAIMS ({project.claims.length})</div>
                <div className="drawer-claims-list">
                  {project.claims.map((claim, cIdx) => (
                    <div key={cIdx} className="claim-row">
                      <span className="claim-icon">✓</span>
                      <span className="claim-text">{claim.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export const ResultsShowcase: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '', topic: 'Engineering' });

  const categories = ['All', 'Climate & Environment', 'Data Science & Theory', 'Global Health', 'Demographics', 'Demographics & Public Data'];

  const filteredProjects = selectedFilter === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === selectedFilter);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email) {
      setContactSubmitted(true);
    }
  };

  return (
    <div className="view-page page-results-showcase">
      {/* =====================================================================
          PAGE HEADER
          ===================================================================== */}
      <section className="page-header-block">
        <div className="header-kicker">03 / RESULTS & PRODUCTION EXHIBITS</div>
        <h1 className="page-title">5 Production Video Documentaries</h1>
        <p className="page-lead">
          Every film is an end-to-end autonomous multi-agent production synthesized at 60 FPS in Remotion, with 100% verified empirical data from Google Data Commons, World Bank, and national census registries.
        </p>

        {/* Filter Pills */}
        <div className="category-filter-strip">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-pill ${selectedFilter === cat ? 'active' : ''}`}
              onClick={() => setSelectedFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* =====================================================================
          PROJECT EXHIBITS LIST
          ===================================================================== */}
      <section className="exhibits-list-section">
        {filteredProjects.map((project, idx) => (
          <ExhibitCard key={project.id} project={project} index={idx} />
        ))}
      </section>

      {/* =====================================================================
          ENGINEERING CHALLENGES & LESSONS LEARNED
          ===================================================================== */}
      <section className="engineering-learnings-section">
        <div className="section-eyebrow-line">
          <span className="eyebrow-text">ENGINEERING DECISIONS & LESSONS</span>
        </div>

        <div className="learnings-grid">
          <div className="learning-card">
            <h4 className="learning-title">1. Why Determinism Beats Diffusion</h4>
            <p className="learning-text">
              Diffusion video generation cannot do arithmetic. For science, public policy, and corporate strategy, a single incorrect decimal destroys credibility. Deterministic React Remotion code guarantees exact numeric truth.
            </p>
          </div>
          <div className="learning-card">
            <h4 className="learning-title">2. Codifying 226+ Tufte Skills</h4>
            <p className="learning-text">
              Translating visual theory into code required programmatic data-ink checks: removing redundant tick lines, anchoring comparative baselines, and replacing generic bars with countable human unit-glyphs.
            </p>
          </div>
          <div className="learning-card">
            <h4 className="learning-title">3. Headless Chromium QA Pipeline</h4>
            <p className="learning-text">
              Automated headless browser rendering catches rendering bottlenecks before broadcast. Any composition dropping below 60.0 FPS or failing WCAG AAA contrast fails the pipeline automatically.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          DEVELOPER PROFILE & CONTACT TRANSMISSION (Concise)
          ===================================================================== */}
      <section className="creator-contact-section" id="contact">
        <div className="creator-card">
          <div className="creator-info-left">
            <span className="creator-kicker">ABOUT THE ARCHITECT</span>
            <h3 className="creator-name-title">{DEVELOPER_PROFILE.name}</h3>
            <p className="creator-role">{DEVELOPER_PROFILE.title}</p>
            <p className="creator-bio-text">{DEVELOPER_PROFILE.bio}</p>
            <div className="creator-meta-chips">
              <span className="chip">📍 {DEVELOPER_PROFILE.location}</span>
              <span className="chip">● {DEVELOPER_PROFILE.status}</span>
            </div>
            <div className="creator-social-row">
              <a
                href="https://github.com/sakthijaw/AI-powered-remotion-portfolio"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
              >
                GitHub Repository ↗
              </a>
              <a
                href="mailto:sakthi@engineering.dev"
                className="social-btn"
              >
                sakthi@engineering.dev
              </a>
            </div>
          </div>

          <div className="contact-form-right">
            <div className="form-heading">Initiate Transmission</div>
            <p className="form-subheading">Available for AI motion systems, creative engineering & product collaborations.</p>

            {contactSubmitted ? (
              <div className="transmission-success">
                <span className="success-check">✓</span>
                <h4>Transmission Received</h4>
                <p>Thank you for reaching out. I will respond to your message shortly.</p>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setContactSubmitted(false)}
                >
                  Send Another Transmission
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="minimal-contact-form">
                <div className="form-row">
                  <div className="field-group">
                    <label className="field-label">NAME</label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      className="text-input"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    />
                  </div>
                  <div className="field-group">
                    <label className="field-label">EMAIL</label>
                    <input
                      type="email"
                      required
                      placeholder="you@domain.com"
                      className="text-input"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="field-group">
                  <label className="field-label">MESSAGE</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Project details or collaboration inquiry..."
                    className="text-input textarea-input"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-primary form-submit-btn">
                  <span>Send Transmission</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
