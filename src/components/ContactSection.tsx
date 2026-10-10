import React from 'react';
import { FadeIn, ContactButton } from './shared/AnimationPrimitives';

export const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="contact-section px-5 sm:px-8 md:px-12 py-24 sm:py-32 md:py-40 flex flex-col items-center text-center relative z-20 transition-colors duration-500"
      style={{
        background: 'var(--bg-contact, #0A0A0A)',
        color: 'var(--text-contact, #D7E2EA)',
      }}
    >
      <FadeIn delay={0} y={20}>
        <div className="flex justify-center mb-4">
          <span className="px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest border border-[#C5A566]/30 text-[#C5A566] bg-[#C5A566]/10 font-mono">
            Direct Transmission
          </span>
        </div>
      </FadeIn>

      <FadeIn delay={0.1} y={30}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight mb-8 sm:mb-10"
          style={{ fontSize: 'clamp(2.8rem, 10vw, 140px)' }}
        >
          Let's Work
        </h2>
      </FadeIn>

      <FadeIn delay={0.2} y={20}>
        <p
          className="font-light leading-relaxed max-w-xl mb-10 sm:mb-14 text-base sm:text-lg"
          style={{ opacity: 0.8 }}
        >
          Ready to deploy a zero-hallucination data documentary pipeline? Reach out with your dataset, the story it carries, and the audience you want to reach.
        </p>
      </FadeIn>

      <FadeIn delay={0.3} y={20}>
        <ContactButton href="mailto:sakthijaw@gmail.com" label="Transmit Brief" />
      </FadeIn>

      {/* Metrics strip */}
      <FadeIn delay={0.4} y={20}>
        <div
          className="mt-20 sm:mt-24 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-16 border-t pt-12 max-w-4xl w-full"
          style={{ borderColor: 'var(--border-subtle, rgba(255,255,255,0.1))' }}
        >
          {[
            { val: '0.0%', label: 'Hallucination Rate' },
            { val: '226+', label: 'Tufte Principles' },
            { val: '60 FPS', label: 'Frame Synthesis' },
            { val: '5', label: 'Finished Films' },
          ].map((m) => (
            <div key={m.label} className="flex flex-col items-center gap-1.5">
              <span
                className="hero-heading font-black leading-none font-mono"
                style={{ fontSize: 'clamp(1.8rem, 3.8vw, 3rem)' }}
              >
                {m.val}
              </span>
              <span className="text-[#C5A566] uppercase tracking-wider text-[11px] sm:text-xs font-mono font-medium">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Footer */}
      <FadeIn delay={0.5} y={10}>
        <footer
          className="mt-16 sm:mt-20 text-xs uppercase tracking-widest font-mono flex flex-wrap items-center justify-center gap-3 opacity-40"
        >
          <span className="font-semibold text-[#C5A566]">AUTONOMOUS AI DIRECTOR</span>
          <span>·</span>
          <span>Edward Tufte Visual Reasoning</span>
          <span>·</span>
          <span>60 FPS Remotion 4.0</span>
          <span>·</span>
          <span>© {new Date().getFullYear()} Sakthi</span>
        </footer>
      </FadeIn>
    </section>
  );
};
