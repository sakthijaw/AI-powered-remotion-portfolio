import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FILMS = [
  { title: 'Emissions vs. Lifestyles', cat: 'Climate', fps: '60 FPS', dur: '91s', tag: 'EDGAR · UN Data' },
  { title: "Anscombe's Quartet", cat: 'Data Science', fps: '60 FPS', dur: '60s', tag: 'Tufte Principles' },
  { title: 'India in Global Health', cat: 'Global Health', fps: '60 FPS', dur: '75s', tag: 'WHO · Data Commons' },
  { title: 'World Demographics', cat: 'Demographics', fps: '60 FPS', dur: '88s', tag: 'UN Population' },
  { title: 'ABS Census Infrastructure', cat: 'Infrastructure', fps: '60 FPS', dur: '95s', tag: 'ABS · Australia' },
];

const TECH_STACK = [
  { name: 'Remotion 4.0', desc: 'React 19 video synthesis engine' },
  { name: 'Edward Tufte', desc: '226+ codified visual principles' },
  { name: 'Multi-Agent AI', desc: 'Sequential research & QA' },
  { name: 'TypeScript', desc: 'Strict deterministic types' },
  { name: '60 FPS', desc: 'Zero dropped frame delivery' },
  { name: 'Zero Hallucination', desc: 'Mathematically provenanced' },
];

const MARQUEE_ITEMS = [...FILMS, ...FILMS, ...FILMS];

export const MarqueeSection: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="marquee-section pt-16 pb-0 overflow-hidden relative transition-colors duration-500">

      {/* ─── Heading ─── */}
      <div className="px-6 md:px-12 mb-8 max-w-7xl mx-auto">
        <p className="text-[#C5A566] uppercase tracking-[0.25em] text-xs font-semibold mb-2 font-mono">
          Production Catalog
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <h2
            className="font-black uppercase leading-none opacity-20 tracking-tight"
            style={{ fontSize: 'clamp(3rem, 10vw, 130px)' }}
          >
            5 Film Catalog
          </h2>
          <span className="text-xs font-mono opacity-50 uppercase tracking-widest pb-2">
            60 FPS · Master Exports
          </span>
        </div>
      </div>

      {/* ─── Animated marquee strip — film cards ─── */}
      <div
        className="relative py-2"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradient fade edge masks */}
        <div className="marquee-mask-left absolute left-0 top-0 bottom-0 w-24 sm:w-36 z-10 pointer-events-none" />
        <div className="marquee-mask-right absolute right-0 top-0 bottom-0 w-24 sm:w-36 z-10 pointer-events-none" />

        <motion.div
          className="flex gap-4 mb-2"
          animate={isPaused ? {} : { x: ['0%', '-33.333%'] }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          style={{ width: 'max-content' }}
        >
          {MARQUEE_ITEMS.map((film, i) => (
            <a
              key={i}
              href="#documentaries"
              className="flex-shrink-0 w-72 sm:w-80 p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.03] block cursor-pointer group marquee-card"
              style={{
                background: 'var(--bg-card-marquee, rgba(255, 255, 255, 0.03))',
                borderColor: 'var(--border-card-marquee, rgba(255, 255, 255, 0.08))',
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-[11px] uppercase tracking-widest text-[#C5A566] font-mono font-semibold">
                  {film.cat}
                </span>
                <span className="text-[10px] font-mono opacity-50">{film.dur}</span>
              </div>
              <p className="font-bold text-sm leading-snug mb-3 group-hover:text-[#C5A566] transition-colors">
                {film.title}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="text-[10px] opacity-40 font-mono">{film.tag}</span>
                <span className="text-[9px] px-2 py-0.5 rounded-full border border-[#C5A566]/40 text-[#C5A566] bg-[#C5A566]/10 font-mono font-semibold">
                  {film.fps}
                </span>
              </div>
            </a>
          ))}
        </motion.div>
      </div>

      {/* ─── Tech stack grid ─── */}
      <div className="px-6 md:px-12 py-14 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
          {TECH_STACK.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="flex flex-col items-center text-center p-4 rounded-xl border transition-all duration-300 hover:border-[#C5A566]/40 cursor-default"
              style={{
                background: 'var(--bg-card-tech, rgba(255, 255, 255, 0.02))',
                borderColor: 'var(--border-card-tech, rgba(255, 255, 255, 0.06))',
              }}
            >
              <span className="font-bold text-sm mb-1 leading-tight">{tech.name}</span>
              <span className="text-[10px] opacity-50 leading-tight">{tech.desc}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── Horizontal divider rule ─── */}
      <div className="h-px mx-6 md:mx-12 opacity-10 bg-current max-w-7xl lg:mx-auto" />
    </section>
  );
};
