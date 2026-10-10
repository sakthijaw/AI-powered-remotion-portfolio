import React, { useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';

export const App: React.FC = () => {
  useEffect(() => {
    document.documentElement.classList.add('theme-dark');
  }, []);

  return (
    <div style={{ overflowX: 'clip' }}>
      {/* 1. Hero — 3D Perspective Orbital Scene, stats, light/dark toggle */}
      <HeroSection />

      {/* 2. Marquee — 5-film production catalog + tech stack */}
      <MarqueeSection />

      {/* 3. About — director bio, 3 pillars, AnimatedText */}
      <AboutSection />

      {/* 4. Architecture — multi-layer system architecture */}
      <ServicesSection />

      {/* 5. Projects (Documentaries) — sticky stacking documentary cards with 5 films */}
      <ProjectsSection />

      {/* Minimal clean footer */}
      <footer className="py-12 px-6 border-t text-center text-xs font-mono uppercase tracking-widest opacity-40 transition-colors"
        style={{ borderColor: 'var(--border-subtle, rgba(255,255,255,0.08))' }}
      >
        <span className="font-semibold text-[#C5A566]">AUTONOMOUS AI DIRECTOR</span>
        <span> · </span>
        <span>Edward Tufte Visual Reasoning</span>
        <span> · </span>
        <span>60 FPS Remotion 4.0</span>
        <span> · </span>
        <span>© {new Date().getFullYear()} Sakthi</span>
      </footer>
    </div>
  );
};

export default App;
