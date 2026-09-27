import React, { useState, useEffect } from 'react';
import { ProjectCaseStudy } from '../data/projectsData';

interface CaseStudyModalProps {
  isOpen: boolean;
  project: ProjectCaseStudy | null;
  onClose: () => void;
  onSelectProject?: (project: ProjectCaseStudy) => void;
  allProjects?: ProjectCaseStudy[];
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  isOpen,
  project,
  onClose,
  onSelectProject,
  allProjects = [],
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'scenes' | 'claims' | 'tufte'>('overview');

  useEffect(() => {
    setActiveTab('overview');
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div className="case-study-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="case-study-modal" onClick={(e) => e.stopPropagation()}>
        {/* Top Header */}
        <div className="cs-modal-header">
          <div className="cs-modal-title-group">
            <span className="cs-badge">
              {project.number} / CASE STUDY · {project.category}
            </span>
            <h2 className="cs-title">{project.title}</h2>
            <span className="cs-subtitle">{project.subtitle}</span>
          </div>
          <button onClick={onClose} className="cs-close-btn" aria-label="Close modal">
            ✕
          </button>
        </div>

        {/* Tab Strip */}
        <div className="cs-tabs-bar">
          <button
            className={`cs-tab-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            01 / System Overview & Media
          </button>
          <button
            className={`cs-tab-item ${activeTab === 'scenes' ? 'active' : ''}`}
            onClick={() => setActiveTab('scenes')}
          >
            02 / 8-Beat Narrative Arc ({project.scenes.length} Scenes)
          </button>
          <button
            className={`cs-tab-item ${activeTab === 'claims' ? 'active' : ''}`}
            onClick={() => setActiveTab('claims')}
          >
            03 / Empirical Claims ({project.claims.length})
          </button>
          <button
            className={`cs-tab-item ${activeTab === 'tufte' ? 'active' : ''}`}
            onClick={() => setActiveTab('tufte')}
          >
            04 / Digitized Tufte Skills
          </button>
        </div>

        {/* Modal Body */}
        <div className="cs-modal-body">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="cs-overview-grid">
              {/* Left Column: Video & Metrics */}
              <div className="cs-video-col">
                <div className="cs-video-wrapper">
                  <video
                    key={project.videoSrc}
                    src={project.videoSrc}
                    poster={project.poster}
                    controls
                    playsInline
                    autoPlay
                    onCanPlay={(e) => {
                      const playPromise = e.currentTarget.play();
                      if (playPromise !== undefined) {
                        playPromise.catch((err) => {
                          console.warn('Case study modal video play catch:', err);
                        });
                      }
                    }}
                  />
                </div>

                <div className="cs-metrics-grid">
                  <div className="cs-metric-card">
                    <span className="cs-metric-val">{project.metrics.fps} FPS</span>
                    <span className="cs-metric-lbl">Frame Rate</span>
                  </div>
                  <div className="cs-metric-card">
                    <span className="cs-metric-val">{project.metrics.hallucinationRate}</span>
                    <span className="cs-metric-lbl">Hallucination Rate</span>
                  </div>
                  <div className="cs-metric-card">
                    <span className="cs-metric-val">{project.metrics.wcagRating}</span>
                    <span className="cs-metric-lbl">WCAG Contrast</span>
                  </div>
                  <div className="cs-metric-card">
                    <span className="cs-metric-val">{project.duration}</span>
                    <span className="cs-metric-lbl">Duration</span>
                  </div>
                </div>

                <div style={{ marginTop: '1.25rem' }}>
                  <div className="cs-field-label">TECHNOLOGY STACK & SYSTEMS</div>
                  <div className="cs-tags-flex">
                    {project.tags.map((tag) => (
                      <span key={tag} className="cs-tag-badge">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Detailed Storytelling (WHAT / WHY / HOW / CONTRIBUTION / ENGINEERING / RESULT) */}
              <div className="cs-story-col">
                <div className="cs-story-block">
                  <span className="cs-story-tag">WHAT IT IS</span>
                  <p className="cs-story-text">{project.what}</p>
                </div>

                <div className="cs-story-block">
                  <span className="cs-story-tag">WHY IT MATTERS (THE PROBLEM)</span>
                  <p className="cs-story-text">{project.why}</p>
                </div>

                <div className="cs-story-block">
                  <span className="cs-story-tag">HOW IT WAS ENGINEERED</span>
                  <p className="cs-story-text">{project.how}</p>
                </div>

                <div className="cs-story-block">
                  <span className="cs-story-tag">DEVELOPER CONTRIBUTION</span>
                  <p className="cs-story-text">{project.contribution}</p>
                </div>

                <div className="cs-story-block">
                  <span className="cs-story-tag">ENGINEERING CHALLENGES SOLVED</span>
                  <p className="cs-story-text">{project.engineering}</p>
                </div>

                <div className="cs-story-block highlight">
                  <span className="cs-story-tag">VERIFIED RESULT</span>
                  <p className="cs-story-text">{project.result}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 8-BEAT NARRATIVE ARC */}
          {activeTab === 'scenes' && (
            <div className="cs-scenes-timeline">
              <p className="cs-tab-intro">
                Every documentary adheres to a strict 8-beat film arc engineered to transition from empirical question to concrete quantitative takeaway:
              </p>
              <div className="cs-scenes-list">
                {project.scenes.map((scene, idx) => (
                  <div key={scene.id} className="cs-scene-card">
                    <div className="cs-scene-header">
                      <span className="cs-scene-num">BEAT 0{idx + 1} · {scene.id.toUpperCase()}</span>
                      <span className="cs-scene-dur">{scene.durationSeconds}s duration</span>
                    </div>
                    <h4 className="cs-scene-insight">"{scene.mainInsight}"</h4>
                    <div className="cs-scene-meta">
                      <div>
                        <strong>Scene Goal:</strong> {scene.sceneGoal}
                      </div>
                      <div>
                        <strong>Visual Metaphor:</strong> {scene.visualMetaphor}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: EMPIRICAL CLAIMS */}
          {activeTab === 'claims' && (
            <div className="cs-claims-container">
              <p className="cs-tab-intro">
                Verified empirical facts proven by the multi-agent system using Google Data Commons MCP datasets:
              </p>
              <div className="cs-claims-grid">
                {project.claims.map((claim, idx) => (
                  <div key={idx} className="cs-claim-card">
                    <span className="cs-claim-num">CLAIM #{idx + 1}</span>
                    <p className="cs-claim-text">{claim.text}</p>
                    <span className="cs-claim-source">
                      ✓ Provenance Verified via Data Commons MCP
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: DIGITIZED TUFTE SKILLS */}
          {activeTab === 'tufte' && (
            <div className="cs-tufte-container">
              <p className="cs-tab-intro">
                Codified Edward Tufte visual reasoning skills applied during rendering:
              </p>
              <div className="cs-tufte-list">
                {project.tufteSkills.map((skill) => (
                  <div key={skill.skillId} className="cs-tufte-card">
                    <div className="cs-tufte-id">{skill.skillId}</div>
                    <h4 className="cs-tufte-name">{skill.name}</h4>
                    <p className="cs-tufte-principle">{skill.principle}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Project Selector */}
        {allProjects.length > 0 && (
          <div className="cs-modal-footer">
            <span className="cs-footer-label">EXPLORE OTHER CASE STUDIES:</span>
            <div className="cs-footer-projects">
              {allProjects.map((p) => (
                <button
                  key={p.slug}
                  className={`cs-footer-btn ${p.slug === project.slug ? 'active' : ''}`}
                  onClick={() => onSelectProject && onSelectProject(p)}
                >
                  {p.number} / {p.category}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
