import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './shared/AnimationPrimitives';

interface ProjectCardData {
  num: string;
  category: string;
  name: string;
  thumbnail: string;
  videoSrc: string;
  duration: string;
  tags: string[];
}

const PROJECTS: ProjectCardData[] = [
  {
    num: '01',
    category: 'Climate & Environment',
    name: 'Global Greenhouse Gas Emissions: Totals vs. Per-Capita Responsibility',
    thumbnail: '/thumbnails/emissions-totals-vs-lifestyles.png',
    videoSrc: '/videos/emissions-totals-vs-lifestyles.mp4',
    duration: '91 Sec',
    tags: ['EDGAR', 'UN Data', '60 FPS'],
  },
  {
    num: '02',
    category: 'Data Science & Theory',
    name: "Anscombe's Quartet: Mathematical Proof for Data Graphics",
    thumbnail: '/thumbnails/anscombe-quartet.png',
    videoSrc: '/videos/anscombe-quartet.mp4',
    duration: '60 Sec',
    tags: ['Tufte', 'Statistics', 'Remotion'],
  },
  {
    num: '03',
    category: 'Global Health & Development',
    name: 'India in Global Health: A Statistical Portrait',
    thumbnail: '/thumbnails/india-in-global-health.png',
    videoSrc: '/videos/india-in-global-health.mp4',
    duration: '75 Sec',
    tags: ['WHO', 'Data Commons', 'AI'],
  },
  {
    num: '04',
    category: 'Population & Society',
    name: 'World Demographics: A Century of Population Shifts',
    thumbnail: '/thumbnails/world-demographics.png',
    videoSrc: '/videos/world-demographics.mp4',
    duration: '88 Sec',
    tags: ['UN Data', 'Demographics', '4K'],
  },
  {
    num: '05',
    category: 'Infrastructure & Society',
    name: 'ABS Census Infrastructure: Australia in Numbers',
    thumbnail: '/thumbnails/abs-census-infrastructure.png',
    videoSrc: '/videos/abs-census-infrastructure.mp4',
    duration: '95 Sec',
    tags: ['ABS', 'Census', 'Motion'],
  },
];

const TOTAL_CARDS = PROJECTS.length;

interface StickyProjectCardProps {
  project: ProjectCardData;
  index: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}

const StickyProjectCard: React.FC<StickyProjectCardProps> = ({ project, index, progress }) => {
  const targetScale = 1 - (TOTAL_CARDS - 1 - index) * 0.025;
  const scale = useTransform(
    progress,
    [index / TOTAL_CARDS, 1],
    [1, targetScale]
  );

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const playVideo = () => {
    if (!videoRef.current) return;
    const promise = videoRef.current.play();
    if (promise !== undefined) {
      promise
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Play was interrupted or denied, handle gracefully
          setIsPlaying(false);
        });
    }
  };

  const pauseVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseVideo();
    } else {
      playVideo();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const borderRadius = 'clamp(18px, 3vw, 40px)';

  return (
    <div
      className="min-h-[75vh] md:min-h-[82vh] flex items-start justify-center mb-8 sm:mb-12"
      style={{ top: `${index * 26 + 10}px`, position: 'sticky' }}
    >
      <motion.div
        className="w-full border border-white/10 p-5 sm:p-7 md:p-9 overflow-hidden shadow-2xl backdrop-blur-md"
        style={{
          scale,
          originY: 0,
          borderRadius,
          background: 'var(--bg-card-film, #0F0F0F)',
        }}
        onMouseEnter={playVideo}
        onMouseLeave={pauseVideo}
      >
        {/* ─── Card top row ─── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 md:mb-6">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Number */}
            <span
              className="hero-heading font-black leading-none flex-shrink-0 font-mono"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 84px)' }}
            >
              {project.num}
            </span>

            {/* Details */}
            <div className="flex flex-col gap-1">
              <span className="text-[#C5A566] uppercase tracking-widest text-xs font-semibold">
                {project.category}
              </span>
              <h3
                className="text-white font-bold leading-tight"
                style={{ fontSize: 'clamp(1rem, 1.8vw, 1.4rem)' }}
              >
                {project.name}
              </h3>
              <div className="flex gap-2 mt-1 flex-wrap">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold border border-[#C5A566]/30 text-[#C5A566] bg-[#C5A566]/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center">
            <span className="text-white/40 text-xs font-mono uppercase tracking-wider">
              {project.duration}
            </span>
            <button
              type="button"
              onClick={togglePlay}
              className="px-4 py-1.5 rounded-full text-xs font-mono uppercase font-semibold border border-white/20 text-white/80 hover:bg-white/10 transition-colors"
            >
              {isPlaying ? '⏸ PAUSE' : '▶ PLAY'}
            </button>
          </div>
        </div>

        {/* ─── Layout: thumbnail left + video right ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
          {/* Left — static documentary frame */}
          <div
            className="relative overflow-hidden aspect-video bg-black/60 border border-white/10 group cursor-pointer"
            style={{ borderRadius }}
            onClick={togglePlay}
          >
            <img
              src={project.thumbnail}
              alt={project.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-4">
              <span className="text-white/80 text-xs font-mono uppercase tracking-widest bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                Statistical Proof Frame
              </span>
              <span className="text-[10px] font-mono text-[#C5A566] uppercase">
                Tufte Grid
              </span>
            </div>
          </div>

          {/* Right — video playback container */}
          <div
            className="relative overflow-hidden aspect-video bg-black border border-white/10 group cursor-pointer"
            style={{ borderRadius }}
            onClick={togglePlay}
          >
            {/* Poster fallback image underneath */}
            <img
              src={project.thumbnail}
              alt={project.name}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                isPlaying ? 'opacity-0' : 'opacity-100'
              }`}
            />

            {/* Video element */}
            <video
              ref={videoRef}
              src={project.videoSrc}
              muted={isMuted}
              playsInline
              loop
              preload="metadata"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                isPlaying ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ borderRadius }}
            />

            {/* Play overlay button when paused */}
            {!isPlaying && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 group-hover:bg-black/20 transition-all">
                <div className="w-14 h-14 rounded-full bg-[#C5A566] text-black flex items-center justify-center pl-1 shadow-2xl transition-transform duration-200 group-hover:scale-110">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <span className="text-white text-[11px] font-mono uppercase tracking-widest mt-2 bg-black/60 px-2.5 py-0.5 rounded-full border border-white/15">
                  Hover or Click to Play
                </span>
              </div>
            )}

            {/* Controls when playing */}
            {isPlaying && (
              <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="px-2 py-1 rounded text-[10px] font-mono bg-black/70 text-white border border-white/20 hover:bg-black/90 transition-colors"
                >
                  {isMuted ? '🔇 Muted' : '🔊 Audio'}
                </button>
              </div>
            )}

            {/* 60 FPS badge */}
            <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm border border-[#C5A566]/30 rounded-full px-3 py-1 text-[#C5A566] text-[10px] uppercase tracking-widest font-mono font-medium pointer-events-none">
              60 FPS · REMOTION 4.0
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="documentaries"
      className="bg-[#0A0A0A] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-20 relative px-4 sm:px-6 md:px-10 pt-20 sm:pt-28 pb-36"
    >
      {/* Top category label */}
      <FadeIn delay={0} y={20}>
        <div className="flex justify-center mb-4">
          <span className="px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest border border-[#C5A566]/30 text-[#C5A566] bg-[#C5A566]/10">
            Finished Films
          </span>
        </div>
      </FadeIn>

      {/* Section heading */}
      <FadeIn delay={0.1} y={30}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-4"
          style={{ fontSize: 'clamp(2.8rem, 10vw, 140px)' }}
        >
          Documentaries
        </h2>
      </FadeIn>
      <FadeIn delay={0.2} y={20}>
        <p className="text-center text-white/50 uppercase tracking-widest text-xs sm:text-sm mb-16 sm:mb-20 font-mono">
          5 Autonomous Films · Hover or Tap To Screen
        </p>
      </FadeIn>

      {/* Sticky stacking cards */}
      <div ref={containerRef} className="max-w-6xl mx-auto">
        {PROJECTS.map((proj, i) => (
          <StickyProjectCard
            key={proj.num}
            project={proj}
            index={i}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
};
