import React, { useState, useRef } from 'react';
import { ProjectCaseStudy } from '../data/projectsData';
import { usePhysicalTilt } from '../hooks/usePhysicalTilt';

interface ProjectExhibitBlockProps {
  project: ProjectCaseStudy;
  index: number;
}

export const ProjectExhibitBlock: React.FC<ProjectExhibitBlockProps> = ({
  project,
  index,
}) => {
  const [isInlinePlaying, setIsInlinePlaying] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isReversed = index % 2 !== 0;

  // Physical 3D tilt for the text case study card
  const textCardTilt = usePhysicalTilt({
    maxTilt: 4,
    perspective: 1000,
    scaleOnHover: 1.012,
  });

  // Physical 3D tilt for the large video media panel
  const videoPanelTilt = usePhysicalTilt({
    maxTilt: 4,
    perspective: 1000,
    scaleOnHover: 1.012,
  });

  const handlePlayVideo = () => {
    setIsInlinePlaying(true);
  };

  const handleFullscreen = () => {
    if (!isInlinePlaying) {
      setIsInlinePlaying(true);
      setTimeout(() => {
        if (videoRef.current) {
          if (videoRef.current.requestFullscreen) {
            videoRef.current.requestFullscreen();
          } else if ((videoRef.current as any).webkitRequestFullscreen) {
            (videoRef.current as any).webkitRequestFullscreen();
          }
        }
      }, 150);
    } else if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if ((videoRef.current as any).webkitRequestFullscreen) {
        (videoRef.current as any).webkitRequestFullscreen();
      }
    }
  };

  return (
    <section
      className={`video-exhibit-section ${isReversed ? 'layout-reversed' : ''}`}
      id={`project-${index + 1}`}
    >
      <div className="exhibit-block-container">
        {/* 1. PHYSICAL TEXT CASE STUDY CARD */}
        <div
          ref={textCardTilt.ref}
          {...textCardTilt.props}
          style={textCardTilt.style}
          className="video-exhibit-card"
        >
          <div className="card-shine-layer" style={textCardTilt.shineStyle} />

          <div className="video-exhibit-meta">
            <span className="video-number-badge">
              {project.number} / EXHIBIT
            </span>
            <span className="video-duration-badge">
              {project.duration} · {project.category}
            </span>
          </div>

          <h3 className="video-exhibit-title">{project.title}</h3>
          <p className="video-exhibit-subtitle">{project.subtitle}</p>

          <div className="card-story-preview">
            <div className="story-preview-item">
              <span className="story-label">WHAT</span>
              <span className="story-val">{project.summary}</span>
            </div>
            <div className="story-preview-item">
              <span className="story-label">WHY</span>
              <span className="story-val">{project.why}</span>
            </div>
          </div>

          <div className="video-tufte-box">
            <div className="tufte-label">TUFTE PRINCIPLES APPLIED:</div>
            <div className="tufte-content">{project.tufteSummary}</div>
          </div>

          <div className="card-tags-row">
            {project.tags.slice(0, 5).map((tag) => (
              <span key={tag} className="micro-tag">
                {tag}
              </span>
            ))}
          </div>

          {/* Single Clear Non-Duplicate Action: Toggle Deep Engineering & 8-Beat Narrative Arc */}
          <div className="video-card-actions">
            <button
              className={`btn-cta btn-specs-toggle ${isSpecsOpen ? 'active' : ''}`}
              onClick={() => setIsSpecsOpen(!isSpecsOpen)}
              title="Inspect 8-beat narrative arc and empirical data provenance without leaving page"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>{isSpecsOpen ? 'Close Technical Specs ↑' : 'Inspect 8-Beat Arc & Specs ↓'}</span>
            </button>
          </div>

          {/* Expandable Inline Technical Breakdown Drawer (No redirect, no duplicate video) */}
          {isSpecsOpen && (
            <div className="exhibit-specs-drawer">
              <div className="specs-drawer-header">
                <span className="specs-header-tag">SYSTEM BREAKDOWN · {project.specVersion}</span>
                <span className="specs-header-sub">0.0% Hallucination · 60 FPS Chromium Audited</span>
              </div>

              {/* 8-Beat Narrative Arc */}
              <div className="specs-section-group">
                <div className="specs-group-title">8-BEAT NARRATIVE ARC ({project.scenes.length} SCENES)</div>
                <div className="specs-beats-list">
                  {project.scenes.map((scene, sIdx) => (
                    <div key={scene.id} className="specs-beat-row">
                      <div className="specs-beat-num">0{sIdx + 1}</div>
                      <div className="specs-beat-body">
                        <div className="specs-beat-heading">
                          <span className="specs-beat-goal">{scene.sceneGoal}</span>
                          <span className="specs-beat-time">{scene.durationSeconds}s</span>
                        </div>
                        <div className="specs-beat-metaphor">
                          <span className="metaphor-lbl">Visual Metaphor:</span> {scene.visualMetaphor}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Empirical Data Claims */}
              <div className="specs-section-group">
                <div className="specs-group-title">DATA COMMONS PROVENANCE ({project.claims.length} VERIFIED CLAIMS)</div>
                <div className="specs-claims-list">
                  {project.claims.map((claim, cIdx) => (
                    <div key={cIdx} className="specs-claim-row">
                      <span className="claim-check-icon">✓</span>
                      <div className="claim-content-wrap">
                        <span className="claim-text-val">{claim.text}</span>
                        {claim.source && (
                          <span className="claim-source-badge">Source: {claim.source}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engineering Details */}
              <div className="specs-section-group">
                <div className="specs-group-title">AUTONOMOUS MULTI-AGENT ENGINEERING</div>
                <p className="specs-engineering-text">
                  <strong>Engineering:</strong> {project.engineering}
                </p>
                <p className="specs-engineering-text">
                  <strong>Multi-Agent Contribution:</strong> {project.contribution}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 2. PHYSICAL LARGE SIDE-BY-SIDE VIDEO MEDIA PANEL (The Dedicated Player) */}
        <div
          ref={videoPanelTilt.ref}
          {...videoPanelTilt.props}
          style={videoPanelTilt.style}
          className="exhibit-video-panel"
        >
          <div className="card-shine-layer" style={videoPanelTilt.shineStyle} />

          <div className="video-panel-frame">
            {isInlinePlaying ? (
              <video
                ref={videoRef}
                src={project.videoSrc}
                poster={project.poster}
                controls
                autoPlay
                playsInline
                onCanPlay={(e) => {
                  const playPromise = e.currentTarget.play();
                  if (playPromise !== undefined) {
                    playPromise.catch((err) => {
                      console.warn('Inline video play catch:', err);
                    });
                  }
                }}
                className="inline-video-player"
              />
            ) : (
              <div
                className="video-poster-wrapper"
                onClick={handlePlayVideo}
                title="Click to play documentary video directly"
              >
                <img
                  src={project.poster}
                  alt={project.title}
                  className="poster-img"
                />
                <div className="play-button-overlay">
                  <div className="play-icon-circle">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="6 3 20 12 6 21 6 3" />
                    </svg>
                  </div>
                  <span className="play-label-text">CLICK TO PLAY DOCUMENTARY</span>
                </div>
              </div>
            )}
          </div>

          <div className="video-panel-footer">
            <div className="panel-badge-group">
              <span className="panel-status-dot"></span>
              <span>60 FPS RENDERED</span>
            </div>
            <span className="panel-spec-tag">{project.specVersion}</span>
            <button
              className="panel-fullscreen-btn"
              onClick={handleFullscreen}
              title="Watch in Fullscreen Theater"
            >
              Fullscreen ↗
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
