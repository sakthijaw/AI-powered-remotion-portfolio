import React, { useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { FeatureSection } from './components/FeatureSection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { TechStackSection } from './components/TechStackSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  // Hash Routing smooth jump (e.g. #architecture, #exhibits, #stack, #about, #contact)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash && hash.length > 1) {
        const id = hash.replace('#', '');
        const target = document.getElementById(id);
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth' });
          }, 80);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Intersection Observer for scroll entrance animations across all sections, grids, and cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const animatedElements = document.querySelectorAll(
      '.scroll-section, .video-exhibit-section, .stat-item, .about-bio-card, .about-experience-card, .contact-box, .hud-callout-tag'
    );
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleExplore = () => {
    const exhibitsEl = document.getElementById('exhibits');
    if (exhibitsEl) {
      exhibitsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToArchitecture = () => {
    const archEl = document.getElementById('architecture');
    if (archEl) {
      archEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="interactive-3d-app">
      {/* Ambient background glows with AI monochrome + subtle blush gradient */}
      <div className="ambient-glow glow-blush-top" aria-hidden="true" />
      <div className="ambient-glow glow-blush-center" aria-hidden="true" />
      <div className="ambient-glow glow-silver-bottom" aria-hidden="true" />

      {/* Fixed Minimal Editorial Navigation */}
      <Navigation />

      {/* Seamless Single-Page Continuous Scroll Flow */}
      <main className="scroll-container">
        <Hero
          onExplore={handleExplore}
          onOpenArchitecture={handleScrollToArchitecture}
        />
        <FeatureSection onOpenArchitecture={handleScrollToArchitecture} />
        <ArchitectureSection />
        <TechStackSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
};

export default App;
