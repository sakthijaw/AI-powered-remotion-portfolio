import React from 'react';
import { PROJECTS_DATA, ProjectCaseStudy } from '../data/projectsData';
import { ProjectExhibitBlock } from './ProjectExhibitBlock';
import { VisualReasoningLab } from './VisualReasoningLab';
import { KineticMarquee } from './KineticMarquee';
import { usePhysicalTilt } from '../hooks/usePhysicalTilt';

interface FeatureSectionProps {
  onOpenArchitecture?: () => void;
}

const StatCard: React.FC<{ value: string; label: string }> = ({ value, label }) => {
  const tilt = usePhysicalTilt({
    maxTilt: 4,
    perspective: 800,
    scaleOnHover: 1.025,
  });

  return (
    <div
      ref={tilt.ref}
      {...tilt.props}
      style={tilt.style}
      className="stat-item"
    >
      <div className="card-shine-layer" style={tilt.shineStyle} />
      <span className="stat-val">{value}</span>
      <span className="stat-tag">{label}</span>
    </div>
  );
};

export const FeatureSection: React.FC<FeatureSectionProps> = () => {
  return (
    <>
      {/* Horizontal Kinetic Animated Text Ribbon 1 (Left-to-Right Marquee) */}
      <KineticMarquee theme="glass" speed="normal" />

      {/* Section 01: Overview / Philosophy (Dual-Column Full Layout) */}
      <section className="scroll-section philosophy-dual-section" id="intro">
        <div className="philosophy-dual-grid">
          {/* Left Column: Vision & Provenance */}
          <div className="philosophy-left-col">
            <div className="section-eyebrow">01 / PHILOSOPHY & EMPIRICAL GROUNDING</div>
            <h2 className="section-heading">
              Zero Hallucination. <span className="gradient-word">Absolute Integrity.</span>
            </h2>
            <p className="section-body">
              While generative video models produce unverified visual noise, our multi-agent architecture executes deterministic visual reasoning. Empirical data is retrieved live via Model Context Protocol (MCP) from Google Data Commons, structured through 226+ Edward Tufte principles, and rendered frame-by-frame at 60 FPS in Remotion.
            </p>

            <div className="stats-grid">
              <StatCard value="226+" label="Tufte Design Skills Codified" />
              <StatCard value="0.0%" label="Hallucinated Ground Truth" />
              <StatCard value="60 FPS" label="Chromium Frame-Rate Verified" />
            </div>
          </div>

          {/* Right Column: Visual Reasoning & Living Unit-Cell Lab (Fills Right Side Completely) */}
          <div className="philosophy-right-col">
            <VisualReasoningLab />
          </div>
        </div>
      </section>

      {/* Horizontal Kinetic Animated Text Ribbon 2 (Reverse Marquee) */}
      <KineticMarquee theme="dark" reverse={true} speed="fast" />

      {/* Section 02: Selected Works / 5 Documentary Exhibits */}
      <div id="exhibits" style={{ position: 'relative', zIndex: 10 }}>
        <div className="section-header-exhibits">
          <div className="section-eyebrow">02 / SELECTED WORK</div>
          <h2 className="section-heading" style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
            5 Production <span className="gradient-word">Documentaries & Systems</span>
          </h2>
          <p className="section-body" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem' }}>
            Each film is an end-to-end autonomous production rendered at 60 FPS in Remotion, with 100% verified empirical data from Google Data Commons.
          </p>
        </div>

        {PROJECTS_DATA.map((project: ProjectCaseStudy, idx: number) => (
          <ProjectExhibitBlock
            key={project.slug}
            project={project}
            index={idx}
          />
        ))}
      </div>
    </>
  );
};
