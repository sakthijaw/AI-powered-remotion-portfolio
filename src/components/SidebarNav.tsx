import React from 'react';
import { DEVELOPER_PROFILE } from '../data/projectsData';

export type ActivePage = 'project' | 'process' | 'results';

interface SidebarNavProps {
  activePage: ActivePage;
  onPageChange: (page: ActivePage) => void;
  onOpenContact?: () => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activePage,
  onPageChange,
  onOpenContact,
}) => {
  return (
    <>
      {/* =========================================================================
          DESKTOP MINIMAL VERTICAL SIDEBAR (>= 1024px)
          ========================================================================= */}
      <aside className="sidebar-desktop" aria-label="Primary Navigation">
        <div className="sidebar-inner">
          {/* Brand & System Title */}
          <div className="sidebar-brand-block">
            <button
              type="button"
              className="sidebar-brand-btn"
              onClick={() => onPageChange('project')}
              title="Go to Project Overview"
            >
              <div className="brand-monogram">
                <span className="brand-dot" />
                <span className="brand-initials">AD</span>
              </div>
              <div className="brand-text-wrap">
                <span className="brand-title">AUTONOMOUS DIRECTOR</span>
                <span className="brand-subtitle">Remotion · Tufte Reasoning</span>
              </div>
            </button>
          </div>

          {/* Minimal Vertical Nav Items */}
          <nav className="sidebar-nav">
            <div className="sidebar-nav-label">NAVIGATION</div>
            <ul className="sidebar-nav-list">
              <li>
                <button
                  type="button"
                  className={`sidebar-nav-link ${activePage === 'project' ? 'active' : ''}`}
                  onClick={() => onPageChange('project')}
                >
                  <span className="nav-item-num">01</span>
                  <span className="nav-item-label">PROJECT</span>
                  {activePage === 'project' && <span className="nav-active-pip" />}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`sidebar-nav-link ${activePage === 'process' ? 'active' : ''}`}
                  onClick={() => onPageChange('process')}
                >
                  <span className="nav-item-num">02</span>
                  <span className="nav-item-label">PROCESS</span>
                  {activePage === 'process' && <span className="nav-active-pip" />}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`sidebar-nav-link ${activePage === 'results' ? 'active' : ''}`}
                  onClick={() => onPageChange('results')}
                >
                  <span className="nav-item-num">03</span>
                  <span className="nav-item-label">RESULTS & WORK</span>
                  {activePage === 'results' && <span className="nav-active-pip" />}
                </button>
              </li>
            </ul>
          </nav>

          {/* System Telemetry Badge */}
          <div className="sidebar-status-box">
            <div className="sidebar-status-pill">
              <span className="pulse-dot" />
              <span>60 FPS CHROMIUM AUDITED</span>
            </div>
            <div className="sidebar-status-metric">
              <span className="metric-label">HALLUCINATION RATE</span>
              <span className="metric-val">0.0% PROVENANCED</span>
            </div>
            <div className="sidebar-status-metric">
              <span className="metric-label">TUFTE RULES CODIFIED</span>
              <span className="metric-val">226+ PRINCIPLES</span>
            </div>
          </div>

          {/* Sidebar Footer & Creator Details */}
          <div className="sidebar-footer">
            <div className="sidebar-social-links">
              <a
                href="https://github.com/sakthijaw/AI-powered-remotion-portfolio"
                target="_blank"
                rel="noreferrer"
                className="sidebar-link"
                title="View GitHub Repository"
              >
                GitHub ↗
              </a>
              <a
                href="mailto:sakthi@engineering.dev"
                className="sidebar-link"
                title="Send Email"
              >
                Email
              </a>
              {onOpenContact && (
                <button
                  type="button"
                  className="sidebar-link link-btn"
                  onClick={onOpenContact}
                >
                  Contact
                </button>
              )}
            </div>

            <div className="sidebar-creator-credit">
              <span className="creator-by">Engineered by</span>
              <span className="creator-name">{DEVELOPER_PROFILE.name}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          MOBILE / TABLET COMPACT TOP NAVIGATION (< 1024px)
          Sleek segmented switcher with no bulky hamburger dropdown
          ========================================================================= */}
      <header className="mobile-nav-bar" aria-label="Mobile Navigation">
        <div className="mobile-nav-top">
          <button
            type="button"
            className="mobile-brand-btn"
            onClick={() => onPageChange('project')}
          >
            <span className="mobile-brand-dot" />
            <span className="mobile-brand-text">AUTONOMOUS DIRECTOR</span>
          </button>

          <div className="mobile-status-tag">
            <span className="pulse-dot-sm" />
            <span>60 FPS</span>
          </div>
        </div>

        {/* Segmented Touch Switcher */}
        <nav className="mobile-segmented-strip">
          <button
            type="button"
            className={`mobile-tab-btn ${activePage === 'project' ? 'active' : ''}`}
            onClick={() => onPageChange('project')}
          >
            01 PROJECT
          </button>
          <button
            type="button"
            className={`mobile-tab-btn ${activePage === 'process' ? 'active' : ''}`}
            onClick={() => onPageChange('process')}
          >
            02 PROCESS
          </button>
          <button
            type="button"
            className={`mobile-tab-btn ${activePage === 'results' ? 'active' : ''}`}
            onClick={() => onPageChange('results')}
          >
            03 RESULTS
          </button>
        </nav>
      </header>
    </>
  );
};
