import React from 'react';
import { FadeIn, AnimatedText, ContactButton } from './shared/AnimationPrimitives';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-24 sm:py-32 bg-[#0A0A0A] overflow-hidden"
    >
      {/* ─── Elegant ambient glows & subtle technical geometry (replaces external toy/lego icons) ─── */}
      <div
        className="pointer-events-none absolute top-1/4 left-10 w-72 h-72 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #C5A566 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-10 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #7621B0 0%, transparent 70%)' }}
      />

      {/* Decorative corner editorial marks */}
      <div className="absolute top-12 left-8 md:left-14 flex items-center gap-2 pointer-events-none select-none opacity-30">
        <span className="font-mono text-xs text-[#C5A566]">TUFTE · DIGITIZED</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A566]" />
      </div>
      <div className="absolute top-12 right-8 md:right-14 font-mono text-xs text-[#D7E2EA]/30 pointer-events-none select-none">
        PROOF OVER SPECULATION
      </div>

      {/* ─── Content ─── */}
      <div className="relative z-10 flex flex-col items-center gap-8 sm:gap-12 md:gap-14 text-center max-w-3xl mx-auto">
        {/* Category tag */}
        <FadeIn delay={0} y={20}>
          <span className="px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest border border-[#C5A566]/30 text-[#C5A566] bg-[#C5A566]/10">
            About The Director
          </span>
        </FadeIn>

        {/* Gradient heading */}
        <FadeIn delay={0.1} y={30}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 120px)' }}
          >
            About Me
          </h2>
        </FadeIn>

        {/* Bio text — 'five years experience' removed & fixed apostrophe encoding */}
        <div className="px-4">
          <p
            className="text-[#D7E2EA] font-normal leading-relaxed text-base sm:text-lg md:text-xl"
            style={{ lineHeight: '1.8' }}
          >
            <AnimatedText text="I specialise in grounded autonomous pipelines that convert raw statistical data into broadcast-grade 60 FPS video documentaries. I digitise Edward Tufte's 226+ visual reasoning principles as strict rendering constraints — eliminating all chartjunk, fabrication, and hallucination from the output. Let's build something analytically unforgettable together." />
          </p>
        </div>

        {/* Key pillars */}
        <FadeIn delay={0.3} y={20}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mt-4">
            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] text-left">
              <span className="text-[#C5A566] font-mono text-xs block mb-1">01 / DISCIPLINE</span>
              <p className="text-white font-medium text-sm">Zero Hallucination</p>
              <p className="text-white/40 text-xs mt-1">Mathematically provenanced datasets directly from UN, EDGAR & ABS.</p>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] text-left">
              <span className="text-[#C5A566] font-mono text-xs block mb-1">02 / CRAFT</span>
              <p className="text-white font-medium text-sm">Tufte Data-Ink</p>
              <p className="text-white/40 text-xs mt-1">Maximising data transmission per pixel with minimal chart decoration.</p>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] text-left">
              <span className="text-[#C5A566] font-mono text-xs block mb-1">03 / ENGINE</span>
              <p className="text-white font-medium text-sm">60 FPS Remotion 4.0</p>
              <p className="text-white/40 text-xs mt-1">Deterministic React 19 scene trees rendered frame-accurately in 4K.</p>
            </div>
          </div>
        </FadeIn>

        {/* CTA */}
        <div className="mt-4">
          <ContactButton href="#documentaries" label="View Documentaries" />
        </div>
      </div>
    </section>
  );
};
