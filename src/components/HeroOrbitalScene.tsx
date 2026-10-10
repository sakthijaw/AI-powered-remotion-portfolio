import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSpatialParallax } from '../hooks/useSpatialParallax';

interface HeroOrbitalSceneProps {
  isDark: boolean;
}

const DOCUMENTARY_FILMS = [
  {
    title: 'WORLD WAR II / 1939–1945',
    src: '/videos/emissions-totals-vs-lifestyles.mp4',
    poster: '/thumbnails/emissions-totals-vs-lifestyles.png',
  },
  {
    title: "ANSCOMBE'S QUARTET / 1973",
    src: '/videos/anscombe-quartet.mp4',
    poster: '/thumbnails/anscombe-quartet.png',
  },
  {
    title: 'GLOBAL HEALTH / 1990–2024',
    src: '/videos/india-in-global-health.mp4',
    poster: '/thumbnails/india-in-global-health.png',
  },
];

export const HeroOrbitalScene: React.FC<HeroOrbitalSceneProps> = ({ isDark }) => {
  const { mouseX, mouseY } = useSpatialParallax();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeFilmIdx, setActiveFilmIdx] = useState(0);

  const currentFilm = DOCUMENTARY_FILMS[activeFilmIdx];

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      const p = videoRef.current.play();
      if (p !== undefined) {
        p.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    }
  };

  // Subtle interactive parallax tilt based on mouse position
  const tiltX = (mouseY * -6).toFixed(2);
  const tiltY = (mouseX * 8).toFixed(2);

  return (
    <div className="relative w-full h-[520px] sm:h-[580px] lg:h-[620px] flex items-center justify-center select-none overflow-visible">
      {/* 3D Perspective Stage Container */}
      <div
        className="relative w-full max-w-[620px] h-full flex items-center justify-center transition-transform duration-300 ease-out"
        style={{
          perspective: 1200,
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
        }}
      >
        {/* ─── Ground Plane with 3 Concentric Elliptical Orbit Rings (Tilted 3D) ─── */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            transform: 'rotateX(62deg) rotateZ(-14deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Outer Orbit Ellipse (Gold) */}
          <div
            className="absolute rounded-full border transition-all duration-500"
            style={{
              width: '560px',
              height: '560px',
              borderColor: isDark ? 'rgba(197, 165, 102, 0.45)' : 'rgba(140, 106, 48, 0.4)',
              borderWidth: '1.2px',
              boxShadow: isDark ? '0 0 35px rgba(197, 165, 102, 0.18)' : '0 0 20px rgba(140, 106, 48, 0.12)',
            }}
          />

          {/* Middle Orbit Ellipse */}
          <div
            className="absolute rounded-full border transition-all duration-500"
            style={{
              width: '420px',
              height: '420px',
              borderColor: isDark ? 'rgba(215, 226, 234, 0.18)' : 'rgba(0, 0, 0, 0.15)',
              borderWidth: '1px',
              borderStyle: 'dashed',
            }}
          />

          {/* Inner Orbit Ellipse */}
          <div
            className="absolute rounded-full border transition-all duration-500"
            style={{
              width: '270px',
              height: '270px',
              borderColor: isDark ? 'rgba(197, 165, 102, 0.28)' : 'rgba(140, 106, 48, 0.22)',
              borderWidth: '1px',
            }}
          />

          {/* Orbit Data Connection Rays */}
          <div
            className="absolute w-[500px] h-px pointer-events-none opacity-20"
            style={{
              background: isDark
                ? 'linear-gradient(90deg, transparent, #C5A566 50%, transparent)'
                : 'linear-gradient(90deg, transparent, #8C6A30 50%, transparent)',
              transform: 'rotate(28deg)',
            }}
          />
        </div>

        {/* ─── Orbit Label 1: DOCUMENT (Top-Left) ─── */}
        <div
          className="absolute z-10 font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase transition-colors"
          style={{
            top: '32%',
            left: '26%',
            color: isDark ? '#C5A566' : '#8C6A30',
          }}
        >
          <span>DOCUMENT</span>
          <div
            className="h-px w-14 mt-0.5"
            style={{ background: isDark ? 'rgba(197, 165, 102, 0.6)' : 'rgba(140, 106, 48, 0.5)' }}
          />
        </div>

        {/* ─── Orbit Label 2: REASONING (Mid-Right) ─── */}
        <div
          className="absolute z-10 font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase transition-colors"
          style={{
            top: '47%',
            right: '25%',
            color: isDark ? '#C5A566' : '#8C6A30',
          }}
        >
          <span>REASONING</span>
          <div
            className="h-px w-16 mt-0.5"
            style={{ background: isDark ? 'rgba(197, 165, 102, 0.6)' : 'rgba(140, 106, 48, 0.5)' }}
          />
        </div>

        {/* ─── Orbit Label 3: RENDER (Bottom-Left) ─── */}
        <div
          className="absolute z-10 font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase transition-colors"
          style={{
            bottom: '29%',
            left: '30%',
            color: isDark ? '#C5A566' : '#8C6A30',
          }}
        >
          <span>RENDER</span>
          <div
            className="h-px w-12 mt-0.5"
            style={{ background: isDark ? 'rgba(197, 165, 102, 0.6)' : 'rgba(140, 106, 48, 0.5)' }}
          />
        </div>

        {/* ─── CENTER CARD: Ai DIRECTOR (Matching Image 1) ─── */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="absolute z-20 flex flex-col items-center justify-center rounded-3xl border backdrop-blur-2xl shadow-2xl transition-all duration-300"
          style={{
            width: '160px',
            height: '160px',
            top: 'calc(50% - 80px)',
            left: 'calc(50% - 80px)',
            background: isDark
              ? 'linear-gradient(135deg, rgba(28, 28, 28, 0.92) 0%, rgba(14, 14, 14, 0.95) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(240, 235, 224, 0.95) 100%)',
            borderColor: isDark ? 'rgba(197, 165, 102, 0.45)' : 'rgba(140, 106, 48, 0.35)',
            boxShadow: isDark
              ? '0 20px 50px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 0 30px rgba(197, 165, 102, 0.15)'
              : '0 20px 40px rgba(0, 0, 0, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.8)',
          }}
        >
          <span
            className="font-bold tracking-tight leading-none"
            style={{
              fontSize: '3.6rem',
              color: isDark ? '#D9BD85' : '#8C6A30',
              textShadow: isDark ? '0 0 25px rgba(217, 189, 133, 0.4)' : 'none',
              fontFamily: 'serif',
            }}
          >
            Ai
          </span>
          <span
            className="text-[10px] sm:text-[11px] font-mono tracking-[0.3em] uppercase mt-2 font-semibold"
            style={{ color: isDark ? 'rgba(215, 226, 234, 0.65)' : '#444444' }}
          >
            DIRECTOR
          </span>
        </motion.div>

        {/* ─── CARD 01: HISTORICAL DOCUMENT (Top-Left, Matching Image 1) ─── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute z-20 p-4 sm:p-5 rounded-xl border backdrop-blur-xl transition-all duration-300 hover:scale-105 cursor-default"
          style={{
            top: '12%',
            left: '8%',
            width: '150px',
            transform: 'rotate(-7deg)',
            background: isDark ? 'rgba(20, 20, 20, 0.75)' : 'rgba(255, 255, 255, 0.82)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
            boxShadow: isDark ? '0 12px 30px rgba(0, 0, 0, 0.6)' : '0 10px 25px rgba(0, 0, 0, 0.08)',
          }}
        >
          <span className="font-mono text-xs font-bold block mb-1.5" style={{ color: isDark ? '#C5A566' : '#8C6A30' }}>
            01
          </span>
          <p className="font-bold text-xs uppercase leading-snug tracking-wider" style={{ color: isDark ? '#FFFFFF' : '#111111' }}>
            HISTORICAL<br />DOCUMENT
          </p>
        </motion.div>

        {/* ─── CARD 02: VISUAL EVIDENCE (Top-Right, Matching Image 1) ─── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute z-20 p-4 sm:p-5 rounded-xl border backdrop-blur-xl transition-all duration-300 hover:scale-105 cursor-default"
          style={{
            top: '18%',
            right: '7%',
            width: '155px',
            transform: 'rotate(5deg)',
            background: isDark ? 'rgba(20, 20, 20, 0.75)' : 'rgba(255, 255, 255, 0.82)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
            boxShadow: isDark ? '0 12px 30px rgba(0, 0, 0, 0.6)' : '0 10px 25px rgba(0, 0, 0, 0.08)',
          }}
        >
          <span className="font-mono text-xs font-bold block mb-1.5" style={{ color: isDark ? '#C5A566' : '#8C6A30' }}>
            02
          </span>
          <p className="font-bold text-xs uppercase leading-snug tracking-wider" style={{ color: isDark ? '#FFFFFF' : '#111111' }}>
            VISUAL<br />EVIDENCE
          </p>
        </motion.div>

        {/* ─── CARD 03: TUFTE VISUALIZATION (Bottom-Left, Matching Image 1) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute z-20 p-4 sm:p-5 rounded-xl border backdrop-blur-xl transition-all duration-300 hover:scale-105 cursor-default"
          style={{
            bottom: '12%',
            left: '14%',
            width: '160px',
            transform: 'rotate(-4deg)',
            background: isDark ? 'rgba(20, 20, 20, 0.75)' : 'rgba(255, 255, 255, 0.82)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
            boxShadow: isDark ? '0 12px 30px rgba(0, 0, 0, 0.6)' : '0 10px 25px rgba(0, 0, 0, 0.08)',
          }}
        >
          <span className="font-mono text-xs font-bold block mb-1.5" style={{ color: isDark ? '#C5A566' : '#8C6A30' }}>
            03
          </span>
          <p className="font-bold text-xs uppercase leading-snug tracking-wider" style={{ color: isDark ? '#FFFFFF' : '#111111' }}>
            TUFTE<br />VISUALIZATION
          </p>
        </motion.div>

        {/* ─── CARD 04: FINAL OUTPUT / LIVE VIDEO MONITOR (Bottom-Right, Matching Image 1) ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute z-30 rounded-2xl border backdrop-blur-2xl overflow-hidden shadow-2xl transition-all duration-300 group cursor-pointer w-[240px] sm:w-[270px]"
          style={{
            bottom: '4%',
            right: '4%',
            transform: 'rotate(2deg)',
            background: isDark ? 'rgba(16, 16, 16, 0.88)' : 'rgba(255, 255, 255, 0.92)',
            borderColor: isDark ? 'rgba(197, 165, 102, 0.4)' : 'rgba(0, 0, 0, 0.18)',
            boxShadow: isDark
              ? '0 20px 50px rgba(0, 0, 0, 0.85), 0 0 25px rgba(197, 165, 102, 0.12)'
              : '0 20px 40px rgba(0, 0, 0, 0.16)',
          }}
          onClick={togglePlay}
        >
          {/* Card Header: FINAL OUTPUT & LIVE */}
          <div className="flex items-center justify-between px-3.5 py-2 border-b border-white/10">
            <span
              className="text-[10px] font-mono uppercase tracking-wider font-semibold"
              style={{ color: isDark ? 'rgba(215, 226, 234, 0.7)' : '#333333' }}
            >
              FINAL OUTPUT
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-emerald-500">
                LIVE
              </span>
            </div>
          </div>

          {/* Video Screen */}
          <div className="relative aspect-video bg-black overflow-hidden group/screen">
            <video
              ref={videoRef}
              src={currentFilm.src}
              poster={currentFilm.poster}
              muted
              playsInline
              loop
              className="w-full h-full object-cover"
            />

            {/* Play Button Overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover/screen:bg-black/25 transition-colors">
                <div className="w-11 h-11 rounded-full bg-white/90 text-black flex items-center justify-center pl-1 shadow-lg transition-transform duration-200 group-hover/screen:scale-110">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              </div>
            )}

            {/* Film Title Overlay Banner (Matching Image 1: WORLD WAR II / 1939–1945) */}
            <div className="absolute bottom-0 inset-x-0 px-3 py-2 bg-gradient-to-t from-black/95 via-black/60 to-transparent">
              <span className="text-white font-mono font-bold text-[10px] sm:text-[11px] tracking-wider uppercase block truncate">
                {currentFilm.title}
              </span>
            </div>
          </div>

          {/* Golden Timeline Progress Bar (Matching Image 1) */}
          <div className="w-full h-[3px] bg-black/40">
            <div
              className="h-full w-2/5 transition-all duration-300"
              style={{
                background: isDark
                  ? 'linear-gradient(90deg, #C5A566, #E0D5C1)'
                  : 'linear-gradient(90deg, #8C6A30, #C5A566)',
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
