import React, { useState } from 'react';
import { DEVELOPER_PROFILE } from '../data/projectsData';
import { usePhysicalTilt } from '../hooks/usePhysicalTilt';

const PhysicalSkillGroup: React.FC<{
  group: { category: string; items: string[] };
}> = ({ group }) => {
  const tilt = usePhysicalTilt({
    maxTilt: 4,
    perspective: 900,
    scaleOnHover: 1.018,
  });

  return (
    <div
      ref={tilt.ref}
      {...tilt.props}
      style={tilt.style}
      className="tech-group-card in-view"
    >
      <div className="card-shine-layer" style={tilt.shineStyle} />
      <h3 className="tech-group-title">{group.category}</h3>
      <div className="tech-tags-wrapper">
        {group.items.map((item) => (
          <div key={item} className="tech-item-pill">
            <span className="tech-item-dot"></span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const PhysicalPrincipleCard: React.FC<{
  num: string;
  title: string;
  desc: string;
}> = ({ num, title, desc }) => {
  const tilt = usePhysicalTilt({
    maxTilt: 3.5,
    perspective: 800,
    scaleOnHover: 1.015,
  });

  return (
    <div
      ref={tilt.ref}
      {...tilt.props}
      style={tilt.style}
      className="principle-card"
    >
      <div className="card-shine-layer" style={tilt.shineStyle} />
      <span className="principle-num">{num}</span>
      <h4 className="principle-title">{title}</h4>
      <p className="principle-desc">{desc}</p>
    </div>
  );
};

export const TechStackSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...DEVELOPER_PROFILE.skills.map((s) => s.category)];

  const filteredSkills =
    selectedCategory === 'All'
      ? DEVELOPER_PROFILE.skills
      : DEVELOPER_PROFILE.skills.filter((s) => s.category === selectedCategory);

  return (
    <section className="scroll-section tech-stack-section" id="stack">
      <div className="tech-stack-container">
        <div className="section-eyebrow">02 / CAPABILITIES & SYSTEM ARCHITECTURE</div>
        <h2 className="section-heading">
          Engineering Philosophy <span className="gradient-word">& Stack</span>
        </h2>
        <p className="section-body">
          I design and engineer deterministic digital products. By combining multi-agent AI systems, WebGL spatial interfaces, and frame-accurate video rendering, I turn raw data into high-fidelity user experiences.
        </p>

        {/* Tactile Filter Bar */}
        <div className="tech-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`tech-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Physical Skills Grid */}
        <div className={`tech-skills-grid ${filteredSkills.length === 1 ? 'single-item-grid' : ''}`}>
          {filteredSkills.map((group) => (
            <PhysicalSkillGroup key={group.category} group={group} />
          ))}
        </div>

        {/* Physical Developer Principles */}
        <div className="principles-grid">
          <PhysicalPrincipleCard
            num="01"
            title="Data First, Styling Second"
            desc="Data retrieval strictly precedes visual formatting. Ground truth is validated through Google Data Commons MCP before a single graphic element is positioned."
          />
          <PhysicalPrincipleCard
            num="02"
            title="226+ Codified Tufte Skills"
            desc="Graphics maximize data-ink ratio. Living unit-histograms and direct comparative baselines replace decorative chartjunk."
          />
          <PhysicalPrincipleCard
            num="03"
            title="60 FPS Deterministic Execution"
            desc="All UI components and Remotion React renderers execute at 60 FPS, verified frame-by-frame through headless Chromium QA audits."
          />
        </div>
      </div>
    </section>
  );
};
