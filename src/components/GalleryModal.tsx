import React, { useState, useEffect } from 'react';
import { PROJECTS_DATA, ProjectCaseStudy } from '../data/projectsData';

interface GalleryModalProps {
  isOpen: boolean;
  initialIndex?: number;
  onClose: () => void;
  onOpenCaseStudy?: (index: number) => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  initialIndex = 0,
  onClose,
  onOpenCaseStudy,
}) => {
  const [activeDoc, setActiveDoc] = useState<ProjectCaseStudy>(PROJECTS_DATA[initialIndex] || PROJECTS_DATA[0]);

  useEffect(() => {
    if (typeof initialIndex === 'number' && PROJECTS_DATA[initialIndex]) {
      setActiveDoc(PROJECTS_DATA[initialIndex]);
    }
  }, [initialIndex, isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header-strip">
          <div>
            <span className="modal-badge-title">
              PRODUCTION REPERTORY · {PROJECTS_DATA.length} VERIFIED DOCUMENTARIES
            </span>
            <h2 className="modal-heading-title">
              Autonomous 3D Motion Documentary Repertory
            </h2>
          </div>
          <button onClick={onClose} aria-label="Close modal" className="modal-close-btn">
            ✕
          </button>
        </div>

        {/* Body Grid */}
        <div className="modal-body-grid">
          {/* Active Video Player Column */}
          <div className="modal-player-col">
            <div className="modal-video-frame">
              <video
                key={activeDoc.videoSrc}
                src={activeDoc.videoSrc}
                poster={activeDoc.poster}
                controls
                playsInline
                autoPlay
                onCanPlay={(e) => {
                  const playPromise = e.currentTarget.play();
                  if (playPromise !== undefined) {
                    playPromise.catch((err) => {
                      console.warn('Gallery modal video play catch:', err);
                    });
                  }
                }}
              />
            </div>

            <h3 className="modal-active-title">{activeDoc.title}</h3>
            <p className="modal-active-subtitle">{activeDoc.subtitle}</p>

            <div className="modal-meta-row">
              <span className="modal-tag-cat">{activeDoc.category}</span>
              <span className="modal-tag-dur">{activeDoc.duration}</span>
              <span className="modal-tag-spec">{activeDoc.specVersion}</span>
            </div>

            <div className="modal-tufte-box">
              <div className="tufte-label">TUFTE DESIGN PRINCIPLES:</div>
              <div className="tufte-content">{activeDoc.tufteSummary}</div>
            </div>

            {/* Case Study Jump */}
            {onOpenCaseStudy && (
              <div style={{ marginTop: '1rem' }}>
                <button
                  className="btn-cta"
                  onClick={() => {
                    const idx = PROJECTS_DATA.findIndex((p) => p.slug === activeDoc.slug);
                    onClose();
                    onOpenCaseStudy(idx >= 0 ? idx : 0);
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <span>EXPLORE FULL CASE STUDY OF THIS FILM</span>
                </button>
              </div>
            )}
          </div>

          {/* Documentary Playlist Sidebar */}
          <div className="modal-playlist-col">
            <span className="playlist-heading">SELECT DOCUMENTARY FILM</span>

            {PROJECTS_DATA.map((doc, i) => {
              const isSelected = doc.slug === activeDoc.slug;
              return (
                <div
                  key={doc.slug}
                  onClick={() => setActiveDoc(doc)}
                  className={`playlist-item ${isSelected ? 'selected' : ''}`}
                >
                  <div className="playlist-item-meta">
                    <span className="playlist-num">{doc.number} · {doc.category}</span>
                    <span className="playlist-dur">{doc.duration}</span>
                  </div>
                  <div className="playlist-title">{doc.title}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
