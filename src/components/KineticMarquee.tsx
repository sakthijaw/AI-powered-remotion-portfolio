import React from 'react';

interface KineticMarqueeProps {
  reverse?: boolean;
  speed?: 'normal' | 'fast';
  theme?: 'dark' | 'glass';
}

export const KineticMarquee: React.FC<KineticMarqueeProps> = ({
  reverse = false,
  speed = 'normal',
  theme = 'glass',
}) => {
  const items = [
    'AUTONOMOUS AI DIRECTOR',
    'GOOGLE DATA COMMONS MCP',
    '226+ EDWARD TUFTE SKILLS',
    'ZERO HALLUCINATION',
    '60 FPS DETERMINISTIC',
    'REMOTION 4.0 REACT ENGINE',
    '8-BEAT CAUSAL ARC',
    'LIVING HISTOGRAMS',
    'WCAG AAA CONTRAST',
    'HEADLESS CHROMIUM QA',
  ];

  return (
    <div className={`kinetic-marquee-wrapper ${theme} ${reverse ? 'reverse' : ''} ${speed}`}>
      <div className="marquee-track">
        {/* Track 1 */}
        <div className="marquee-content">
          {items.map((item, idx) => (
            <span key={`m1-${idx}`} className="marquee-item">
              <span className="marquee-symbol">✦</span>
              <span className="marquee-text">{item}</span>
            </span>
          ))}
        </div>

        {/* Duplicate Track 2 for seamless infinite looping */}
        <div className="marquee-content" aria-hidden="true">
          {items.map((item, idx) => (
            <span key={`m2-${idx}`} className="marquee-item">
              <span className="marquee-symbol">✦</span>
              <span className="marquee-text">{item}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
