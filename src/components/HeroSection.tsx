import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './shared/AnimationPrimitives';
import { HeroOrbitalScene } from './HeroOrbitalScene';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Documentaries', href: '#documentaries' },
];

const HERO_STATS = [
  { val: '60', unit: 'FPS', label: 'Frame Synthesis' },
  { val: '4K', unit: 'UHD', label: 'Master Output' },
  { val: '0.0%', unit: '', label: 'Hallucination' },
  { val: '5', unit: 'Films', label: 'Active Catalog' },
];

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => (
  <div className="flex items-center gap-1 p-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-md">
    <button
      type="button"
      onClick={onToggle}
      className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer ${theme === 'light'
        ? 'bg-white text-black shadow-md'
        : 'text-white/60 hover:text-white'
        }`}
    >
      Light
    </button>
    <button
      type="button"
      onClick={onToggle}
      className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer ${theme === 'dark'
        ? 'bg-[#C5A566] text-black shadow-md font-bold'
        : 'text-white/60 hover:text-white'
        }`}
    >
      Dark
    </button>
  </div>
);

export const HeroSection: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('theme-light');
      document.documentElement.classList.remove('theme-dark');
    } else {
      document.documentElement.classList.add('theme-dark');
      document.documentElement.classList.remove('theme-light');
    }
  }, [theme]);

  const isDark = theme === 'dark';

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between overflow-x-clip transition-colors duration-500 pb-10"
      style={{
        background: isDark
          ? '#0A0A0A'
          : 'linear-gradient(135deg, #F5F0E8 0%, #EDE8DC 50%, #E8E0D0 100%)',
      }}
    >
      {/* ─── Ambient glow background (Dark mode only) ─── */}
      {isDark && (
        <>
          <div
            className="pointer-events-none absolute top-[-80px] right-[10%] w-[550px] h-[550px] rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, #C5A566 0%, transparent 70%)',
              filter: 'blur(120px)',
            }}
          />
          <div
            className="pointer-events-none absolute bottom-12 left-[-80px] w-[500px] h-[500px] rounded-full opacity-15"
            style={{
              background: 'radial-gradient(circle, #7621B0 0%, transparent 70%)',
              filter: 'blur(130px)',
            }}
          />
        </>
      )}

      {/* ─── Top Navbar ─── */}
      <FadeIn delay={0} y={-20}>
        <header className="flex justify-between items-center px-6 md:px-12 pt-6 md:pt-8 relative z-30 max-w-7xl mx-auto w-full">
          {/* Brand Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm tracking-wider shadow-lg transition-transform duration-200 group-hover:scale-105"
              style={{
                background: isDark
                  ? 'linear-gradient(135deg, #C5A566 0%, #8c674a 100%)'
                  : 'linear-gradient(135deg, #1f1f1f 0%, #111111 100%)',
                color: '#FFFFFF',
              }}
            >
              SJ
            </div>
            <div className="flex flex-col">
              <span
                className="font-bold text-sm tracking-wide leading-none"
                style={{ color: isDark ? '#FFFFFF' : '#111111' }}
              >
                SAKTHI
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A566] mt-0.5 font-semibold">
                AI Director
              </span>
            </div>
          </a>

          {/* Nav links — desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center gap-1.5 font-medium uppercase tracking-wider text-xs lg:text-sm transition-all duration-200 hover:opacity-70"
                style={{ color: isDark ? '#D7E2EA' : '#1A1A1A' }}
              >
                <span className="text-[10px] font-mono text-[#C5A566] opacity-75">
                  0{i + 1}
                </span>
                {link.label}
              </a>
            ))}
          </nav>

          {/* Theme switcher */}
          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} onToggle={() => setTheme(isDark ? 'light' : 'dark')} />
          </div>
        </header>
      </FadeIn>

      {/* ─── Main Hero Content (2 Columns) ─── */}
      <main className="flex-1 flex flex-col justify-center px-6 md:px-12 py-6 md:py-10 relative z-20 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* Left Column (6 cols): Typography, Provenance, CTAs, Metrics */}
          <div className="lg:col-span-6 flex flex-col items-start gap-5">

            {/* Top pill badge */}
            <FadeIn delay={0.1} y={20}>
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border"
                style={{
                  background: isDark ? 'rgba(197,165,102,0.12)' : 'rgba(0,0,0,0.06)',
                  borderColor: isDark ? 'rgba(197,165,102,0.45)' : 'rgba(0,0,0,0.18)',
                  color: isDark ? '#C5A566' : '#7c5a28',
                }}
              >
                <span className="w-2 h-2 rounded-full bg-[#C5A566] animate-ping" />
                Autonomous Remotion Pipeline
              </div>
            </FadeIn>

            {/* Main title — Uses .hero-main-title to ELIMINATE the hidden font / black box bug */}
            <FadeIn delay={0.2} y={30}>
              <h1
                className="hero-main-title"
                style={{ fontSize: 'clamp(2.6rem, 5.4vw, 5.8rem)' }}
              >
                AI Documentary Engine
              </h1>
            </FadeIn>

            {/* Subtitle */}
            <FadeIn delay={0.3} y={20}>
              <p
                className="text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold"
                style={{ color: isDark ? '#C5A566' : '#7c5a28' }}
              >
                From Statistical Documents to Cinematic 60 FPS Videos
              </p>
            </FadeIn>

            {/* Description */}
            <FadeIn delay={0.4} y={20}>
              <p
                className="text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-light"
                style={{ color: isDark ? 'rgba(215, 226, 234, 0.78)' : '#333333' }}
              >
                An autonomous system that ingests empirical data (UN, EDGAR, ABS) and compiles broadcast-grade motion-graphics documentaries. Enforcing 226+ Edward Tufte visual reasoning rules with zero hallucination.
              </p>
            </FadeIn>

            {/* CTA action buttons */}
            <FadeIn delay={0.5} y={20}>
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <a
                  href="#documentaries"
                  className="flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-xl text-white cursor-pointer"
                  style={{
                    background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                    boxShadow: '0 8px 25px rgba(182, 0, 168, 0.35)',
                    outline: '2px solid rgba(255, 255, 255, 0.8)',
                    outlineOffset: '-3px',
                  }}
                >
                  <span>▶</span> Watch Documentaries
                </a>

                <a
                  href="#architecture"
                  className="flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-full font-semibold text-xs sm:text-sm tracking-wider uppercase border transition-all duration-200 hover:scale-105 cursor-pointer"
                  style={{
                    borderColor: isDark ? 'rgba(215, 226, 234, 0.3)' : 'rgba(0, 0, 0, 0.3)',
                    color: isDark ? '#D7E2EA' : '#1A1A1A',
                    background: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)',
                  }}
                >
                  Explore Architecture →
                </a>
              </div>
            </FadeIn>

            {/* Metrics counter row */}
            <FadeIn delay={0.6} y={20}>
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-4 border-t w-full max-w-xl"
                style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.12)' }}
              >
                {HERO_STATS.map((s) => (
                  <div key={s.label} className="flex flex-col">
                    <div className="flex items-baseline gap-1">
                      <span
                        className="font-black text-2xl sm:text-3xl leading-none"
                        style={{ color: isDark ? '#FFFFFF' : '#111111' }}
                      >
                        {s.val}
                      </span>
                      {s.unit && (
                        <span className="font-mono text-xs text-[#C5A566] font-bold">
                          {s.unit}
                        </span>
                      )}
                    </div>
                    <span
                      className="text-[10px] uppercase tracking-wider font-medium mt-1"
                      style={{ color: isDark ? 'rgba(215, 226, 234, 0.5)' : '#666666' }}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right Column (6 cols): 3D Perspective Orbital Scene (Replicating Image 1) */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            <HeroOrbitalScene isDark={isDark} />
          </div>
        </div>
      </main>

      {/* ─── Bottom scroll indicator ─── */}
      <div className="flex justify-center items-center py-2 relative z-20 opacity-40">
        <a href="#about" className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-80">
          <span
            className="text-[10px] uppercase font-mono tracking-widest"
            style={{ color: isDark ? '#D7E2EA' : '#1A1A1A' }}
          >
            SCROLL TO EXPLORE
          </span>
          <motion.div
            className="w-px h-5"
            style={{ background: isDark ? '#D7E2EA' : '#1A1A1A' }}
            animate={{ scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </a>
      </div>
    </section>
  );
};
