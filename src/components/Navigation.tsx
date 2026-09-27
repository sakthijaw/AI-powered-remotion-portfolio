import React, { useEffect, useState } from 'react';

interface NavigationProps {
  onGoHome?: () => void;
}

export const Navigation: React.FC<NavigationProps> = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['hero', 'intro', 'exhibits', 'architecture', 'stack', 'about', 'contact'];
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 200) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGoTop = () => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`nav-fixed ${scrolled ? 'compact' : ''}`}>
      <div className="nav-inner">
        {/* Brand Name */}
        <button
          onClick={handleGoTop}
          className="nav-brand"
          style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
          title="Return to Top"
        >
          <div className="brand-glyph">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
          </div>
          <div className="brand-title-wrap">
            <span className="brand-title-main">AUTONOMOUS AI DIRECTOR</span>
            <span className="brand-title-sub">ENGINEERED BY SAKTHI</span>
          </div>
        </button>

        {/* Desktop Menu Links (Smooth Anchors) */}
        <nav className="desktop-nav">
          <ul className="nav-menu">
            <li>
              <button
                className={`nav-link-btn ${activeSection === 'hero' ? 'active' : ''}`}
                onClick={handleGoTop}
              >
                01 / OVERVIEW
              </button>
            </li>
            <li>
              <button
                className={`nav-link-btn ${activeSection === 'exhibits' ? 'active' : ''}`}
                onClick={() => scrollToSection('exhibits')}
              >
                02 / WORK
              </button>
            </li>
            <li>
              <button
                className={`nav-link-btn ${activeSection === 'architecture' ? 'active' : ''}`}
                onClick={() => scrollToSection('architecture')}
              >
                03 / ARCHITECTURE
              </button>
            </li>
            <li>
              <button
                className={`nav-link-btn ${activeSection === 'stack' ? 'active' : ''}`}
                onClick={() => scrollToSection('stack')}
              >
                04 / STACK
              </button>
            </li>
            <li>
              <button
                className={`nav-link-btn ${activeSection === 'about' ? 'active' : ''}`}
                onClick={() => scrollToSection('about')}
              >
                05 / ABOUT
              </button>
            </li>
            <li>
              <button
                className={`nav-link-btn ${activeSection === 'contact' ? 'active' : ''}`}
                onClick={() => scrollToSection('contact')}
              >
                06 / CONTACT
              </button>
            </li>
          </ul>
        </nav>

        {/* Clean Header Actions (Zero Duplicates) */}
        <div className="nav-actions">
          <div className="nav-audit-pill">
            <span className="pulse-green-dot"></span>
            <span>60 FPS AUDITED</span>
          </div>

          <button
            className="btn-cta nav-contact-cta"
            onClick={() => scrollToSection('contact')}
            title="Scroll to Contact Information"
          >
            <span>Get in Touch ↓</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <ul className="mobile-menu-list">
            <li>
              <button onClick={handleGoTop}>01 / Overview</button>
            </li>
            <li>
              <button onClick={() => scrollToSection('exhibits')}>02 / Selected Work (5 Documentaries)</button>
            </li>
            <li>
              <button onClick={() => scrollToSection('architecture')}>03 / System Architecture</button>
            </li>
            <li>
              <button onClick={() => scrollToSection('stack')}>04 / Capabilities & Stack</button>
            </li>
            <li>
              <button onClick={() => scrollToSection('about')}>05 / About Sakthi</button>
            </li>
            <li>
              <button onClick={() => scrollToSection('contact')}>06 / Contact & Connect</button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
