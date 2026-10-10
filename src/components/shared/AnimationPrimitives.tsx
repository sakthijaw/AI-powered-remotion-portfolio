import React, { useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, MotionProps } from 'framer-motion';

/* ============================================================
   FadeIn  ——  Jack-style scroll-triggered fade/slide entrance
   ============================================================ */
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
  as = 'div',
}) => {
  const Tag = as as React.ElementType;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* ============================================================
   Magnet  ——  Mouse-following magnetic hover effect
   ============================================================ */
interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const activationRadius = Math.max(rect.width, rect.height) / 2 + padding;

      if (dist < activationRadius) {
        el.style.transition = activeTransition;
        el.style.transform = `translate3d(${dx / strength}px, ${dy / strength}px, 0)`;
      } else {
        el.style.transition = inactiveTransition;
        el.style.transform = 'translate3d(0, 0, 0)';
      }
    };

    const handleMouseLeave = () => {
      el.style.transition = inactiveTransition;
      el.style.transform = 'translate3d(0, 0, 0)';
    };

    window.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [padding, strength, activeTransition, inactiveTransition]);

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  );
};

/* ============================================================
   AnimatedText  ——  Character-by-character scroll reveal
   ============================================================ */
interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className }) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.15'],
  });

  const chars = text.split('');

  return (
    <span ref={containerRef} className={className} style={{ position: 'relative' }}>
      {chars.map((char, i) => {
        const start = i / chars.length;
        const end = (i + 1) / chars.length;
        return (
          <AnimatedChar
            key={i}
            char={char}
            scrollYProgress={scrollYProgress}
            start={start}
            end={end}
          />
        );
      })}
    </span>
  );
};

interface AnimatedCharProps {
  char: string;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  start: number;
  end: number;
}

const AnimatedChar: React.FC<AnimatedCharProps> = ({ char, scrollYProgress, start, end }) => {
  const opacity = useTransform(scrollYProgress, [start, end], [0.18, 1]);
  return (
    <span style={{ position: 'relative', display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
      {/* invisible placeholder to preserve layout */}
      <span style={{ visibility: 'hidden' }}>{char}</span>
      <motion.span style={{ position: 'absolute', inset: 0, opacity }}>
        {char}
      </motion.span>
    </span>
  );
};

/* ============================================================
   ContactButton  ——  Jack gradient pill CTA
   ============================================================ */
interface ContactButtonProps {
  onClick?: () => void;
  label?: string;
  href?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  onClick,
  label = 'Contact Me',
  href,
}) => {
  const sharedStyle: React.CSSProperties = {
    background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
    boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
    outline: '2px solid white',
    outlineOffset: '-3px',
  };

  const cls =
    'rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base transition-all duration-200 hover:scale-105 cursor-pointer inline-block';

  if (href) {
    return (
      <a href={href} className={cls} style={sharedStyle}>
        {label}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cls} style={sharedStyle}>
      {label}
    </button>
  );
};

/* ============================================================
   LiveProjectButton  ——  Ghost outline pill
   ============================================================ */
interface LiveProjectButtonProps {
  onClick?: () => void;
  label?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  onClick,
  label = 'View Exhibit',
}) => (
  <button
    type="button"
    onClick={onClick}
    className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-all duration-200 cursor-pointer"
  >
    {label}
  </button>
);
