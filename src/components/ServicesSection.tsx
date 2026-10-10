import React from 'react';
import { FadeIn } from './shared/AnimationPrimitives';

const ARCHITECTURE_LAYERS = [
  {
    num: '01',
    name: 'Autonomous Data Ingestion & Provenance',
    desc: 'Direct pipeline converting live statistical datasets (UN Data, EDGAR, ABS, Data Commons) into normalized numerical schemas. Enforcing zero hallucination and mathematical provenance across every data point.',
  },
  {
    num: '02',
    name: 'Tufte Visual Reasoning Constraint Engine',
    desc: '226+ digitised Edward Tufte principles codified as algorithmic rendering constraints — living histograms, unit-cell glyphs, data-ink maximisation, and strict elimination of chartjunk across every frame.',
  },
  {
    num: '03',
    name: 'Multi-Agent Production Orchestration',
    desc: 'Sequential research, visual scripting, and QA agents. Validates narrative timing, verifies baseline claims, and verifies frame-by-frame compliance via automated headless Chromium inspection.',
  },
  {
    num: '04',
    name: 'Remotion 4.0 Motion Synthesis',
    desc: 'React 19 scene architectures compiled to 60 FPS broadcast video with deterministic 8-beat camera choreography, sub-frame audio synchronization, and full WCAG AAA color accessibility.',
  },
  {
    num: '05',
    name: 'Empirical Motion Graphics System',
    desc: 'Designing clean, analytically rigorous visuals — sparklines, comparative baselines, unit-cell arrays, and Anscombe-proven scatterplots — communicating precisely what the data demonstrates.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="architecture"
      className="architecture-section rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-12 py-20 sm:py-28 md:py-36 transition-colors duration-500 relative z-10"
      style={{
        background: 'var(--bg-architecture, #121212)',
        color: 'var(--text-architecture, #E0E0E0)',
      }}
    >
      {/* Top category label */}
      <FadeIn delay={0} y={20}>
        <div className="flex justify-center mb-4">
          <span className="px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest border border-[#C5A566]/30 text-[#C5A566] bg-[#C5A566]/10">
            System Architecture
          </span>
        </div>
      </FadeIn>

      {/* Section heading */}
      <FadeIn delay={0.1} y={30}>
        <h2
          className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28 leading-none tracking-tight"
          style={{ fontSize: 'clamp(2.8rem, 10vw, 140px)' }}
        >
          Architecture
        </h2>
      </FadeIn>

      {/* Vertical architecture list */}
      <div className="max-w-5xl mx-auto divide-y divide-white/10" style={{ borderColor: 'var(--border-arch, rgba(255,255,255,0.1))' }}>
        {ARCHITECTURE_LAYERS.map((layer, i) => (
          <FadeIn key={layer.num} delay={i * 0.08} y={20}>
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-8 md:gap-12 py-8 sm:py-10 md:py-12 group hover:translate-x-1 transition-transform duration-300">
              {/* Number */}
              <span
                className="font-black leading-none flex-shrink-0 font-mono"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 90px)',
                  color: 'var(--num-arch, #C5A566)',
                }}
              >
                {layer.num}
              </span>

              {/* Text */}
              <div className="flex flex-col gap-2 pt-1 md:pt-2">
                <span
                  className="font-semibold uppercase leading-tight tracking-wide"
                  style={{
                    fontSize: 'clamp(1.1rem, 2vw, 1.8rem)',
                    color: 'var(--title-arch, #FFFFFF)',
                  }}
                >
                  {layer.name}
                </span>
                <p
                  className="font-light leading-relaxed max-w-3xl text-sm sm:text-base md:text-lg"
                  style={{ color: 'var(--desc-arch, rgba(220, 220, 220, 0.65))' }}
                >
                  {layer.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};
