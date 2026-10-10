import React, { useRef, useState, useEffect } from 'react';
import { PROJECTS_DATA, ProjectCaseStudy } from '../data/projectsData';

interface ProjectOverviewProps {
  onGoToProcess: () => void;
  onGoToResults: () => void;
}

export const ProjectOverview: React.FC<ProjectOverviewProps> = ({
  onGoToProcess,
  onGoToResults,
}) => {
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy>(PROJECTS_DATA[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [hasAutoplayFailed, setHasAutoplayFailed] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // When selected project changes, attempt playback with polite catch
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setHasAutoplayFailed(false);
          })
          .catch((error) => {
            console.warn('Autoplay prevented by browser policy:', error);
            setIsPlaying(false);
            setHasAutoplayFailed(true);
          });
      }
    }
  }, [selectedProject]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasAutoplayFailed(false);
        })
        .catch((err) => {
          console.warn('Play error:', err);
        });
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
    <div className="view-page page-project-overview">
      {/* =====================================================================
          HERO HEADING & ONE-LINE VALUE PROP
          ===================================================================== */}
      <section className="hero-editorial-header">
        <div className="hero-kicker-pill">
          <span className="pill-dot" />
          <span>AUTONOMOUS AI DOCUMENTARY DIRECTOR</span>
        </div>

        <h1 className="hero-main-heading">
          Autonomous visual reasoning from live statistical data.
        </h1>

        <p className="hero-one-liner">
          Converting Google Data Commons datasets into broadcast-grade 60&nbsp;FPS motion documentaries using 226+ digitized Edward Tufte principles. Zero hallucination. Mathematically verified.
        </p>

        {/* Primary Action Buttons */}
        <div className="hero-action-buttons">
          <button
            type="button"
            className="btn-primary"
            onClick={onGoToResults}
          >
            <span>Explore 5 Documentaries</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={onGoToProcess}
          >
            <span>How the Pipeline Works ↓</span>
          </button>
        </div>

        {/* Verified Performance Metrics Strip */}
        <div className="hero-metrics-grid">
          <div className="metric-box">
            <span className="metric-number">0.0%</span>
            <span className="metric-title">HALLUCINATION RATE</span>
            <span className="metric-caption">Strict Data Commons Provenance</span>
          </div>
          <div className="metric-box">
            <span className="metric-number">226+</span>
            <span className="metric-title">TUFTE SKILLS CODIFIED</span>
            <span className="metric-caption">Data-Ink Maximization</span>
          </div>
          <div className="metric-box">
            <span className="metric-number">60 FPS</span>
            <span className="metric-title">FRAME SYNTHESIS</span>
            <span className="metric-caption">Chromium Frame QA Audited</span>
          </div>
          <div className="metric-box">
            <span className="metric-number">5</span>
            <span className="metric-title">FINISHED FILMS</span>
            <span className="metric-caption">End-to-End Autonomous Renders</span>
          </div>
        </div>
      </section>

      {/* =====================================================================
          FEATURED PRODUCT DEMONSTRATION VIDEO
          Autoplay, muted, playsInline, loop with sleek controls & switcher
          ===================================================================== */}
      <section className="featured-video-showcase" aria-label="Featured Documentary Player">
        <div className="video-player-container">
          <div className="video-viewport">
            <video
              ref={videoRef}
              src={selectedProject.videoSrc}
              poster={selectedProject.poster}
              autoPlay
              muted
              playsInline
              loop
              preload="metadata"
              className="featured-video-element"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Polite Fallback Play Overlay if mobile browser blocked initial autoplay */}
            {hasAutoplayFailed && !isPlaying && (
              <div
                className="video-autoplay-fallback"
                onClick={togglePlay}
                role="button"
                tabIndex={0}
                aria-label="Play Video"
              >
                <div className="fallback-play-btn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="6 3 20 12 6 21 6 3" />
                  </svg>
                </div>
                <span className="fallback-play-text">Tap to Play Video</span>
              </div>
            )}

            {/* Sleek Overlay Top Bar */}
            <div className="video-overlay-top">
              <div className="video-live-tag">
                <span className="live-pulse" />
                <span>60 FPS REMOTION SYNTHESIS</span>
              </div>
              <div className="video-spec-tag">
                {selectedProject.specVersion} · {selectedProject.duration}
              </div>
            </div>

            {/* Custom Bottom Media Controller */}
            <div className="video-controls-bar">
              <div className="controls-left">
                <button
                  type="button"
                  className="control-btn"
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="6 3 20 12 6 21 6 3" />
                    </svg>
                  )}
                </button>

                <button
                  type="button"
                  className="control-btn"
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  )}
                </button>

                <div className="active-video-metadata">
                  <span className="metadata-title">{selectedProject.title}</span>
                  <span className="metadata-cat">{selectedProject.category}</span>
                </div>
              </div>

              <div className="controls-right">
                <button
                  type="button"
                  className="control-btn"
                  onClick={handleFullscreen}
                  aria-label="Fullscreen"
                  title="Fullscreen"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 3 21 3 21 9" />
                    <polyline points="9 21 3 21 3 15" />
                    <line x1="21" y1="3" x2="14" y2="10" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Documentary Switcher Strip: 5 production films clickable */}
          <div className="video-switcher-container">
            <div className="switcher-label">SELECT DOCUMENTARY EXHIBIT:</div>
            <div className="switcher-pills-row">
              {PROJECTS_DATA.map((proj) => {
                const isActive = proj.id === selectedProject.id;
                return (
                  <button
                    key={proj.id}
                    type="button"
                    className={`switcher-pill ${isActive ? 'active' : ''}`}
                    onClick={() => setSelectedProject(proj)}
                  >
                    <span className="pill-index">{proj.number}</span>
                    <span className="pill-name">{proj.title}</span>
                    <span className="pill-duration">{proj.duration}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          CORE VALUE PROPOSITIONS (Purposeful 3-Column Grid)
          ===================================================================== */}
      <section className="core-value-section">
        <div className="section-eyebrow-line">
          <span className="eyebrow-text">FOUNDATIONAL PRINCIPLES</span>
        </div>

        <div className="value-pillars-grid">
          <div className="value-card">
            <div className="card-glyph">01</div>
            <h3 className="card-headline">Zero Hallucination Grounding</h3>
            <p className="card-description">
              Unlike generative AI models that fabricate statistics, every visual unit originates from verified international registries (Google Data Commons, UN, EDGAR, ABS) via Model Context Protocol.
            </p>
          </div>

          <div className="value-card">
            <div className="card-glyph">02</div>
            <h3 className="card-headline">226+ Codified Tufte Skills</h3>
            <p className="card-description">
              Edward Tufte's visual reasoning principles are digitized into strict rendering constraints: living histograms, data-ink maximization, direct comparative baselines, and complete elimination of chartjunk.
            </p>
          </div>

          <div className="value-card">
            <div className="card-glyph">03</div>
            <h3 className="card-headline">60 FPS Remotion Synthesis</h3>
            <p className="card-description">
              Scripts compile directly into React components rendered in Remotion 4.0. Headless Chromium executes automated frame QA audits ensuring exact 60.0 FPS timing and sub-frame audio sync.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          COMPACT TECHNOLOGY STACK SECTION
          ===================================================================== */}
      <section className="compact-tech-section">
        <div className="tech-section-top">
          <span className="tech-label">CORE TECHNOLOGY STACK</span>
          <span className="tech-subtitle">Production Multi-Agent Toolchain</span>
        </div>

        <div className="tech-chips-strip">
          <span className="tech-chip">Remotion 4.0</span>
          <span className="tech-chip">React 19</span>
          <span className="tech-chip">TypeScript</span>
          <span className="tech-chip">Google Data Commons MCP</span>
          <span className="tech-chip">Three.js / WebGL</span>
          <span className="tech-chip">Python Data Science</span>
          <span className="tech-chip">Headless Chromium QA</span>
          <span className="tech-chip">D3 Mathematical Scales</span>
        </div>
      </section>
    </div>
  );
};
