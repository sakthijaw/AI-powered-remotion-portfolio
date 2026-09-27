import { useState, useEffect } from 'react';

interface SpatialCoords {
  mouseX: number; // -1 to 1
  mouseY: number; // -1 to 1
  scrollProgress: number; // 0 to 1
  scrollY: number;
}

export function useSpatialParallax(): SpatialCoords {
  const [coords, setCoords] = useState<SpatialCoords>({
    mouseX: 0,
    mouseY: 0,
    scrollProgress: 0,
    scrollY: 0,
  });

  useEffect(() => {
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      const scroll = window.scrollY || window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scroll / maxScroll : 0;

      document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(4));
      document.documentElement.style.setProperty('--scroll-y', `${scroll}px`);

      setCoords((prev) => ({
        ...prev,
        scrollY: scroll,
        scrollProgress: progress,
      }));
    };

    // Smooth spring lerp for ambient mouse coordinates
    const tick = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      document.documentElement.style.setProperty('--mouse-norm-x', currentX.toFixed(3));
      document.documentElement.style.setProperty('--mouse-norm-y', currentY.toFixed(3));

      setCoords((prev) => ({
        ...prev,
        mouseX: currentX,
        mouseY: currentY,
      }));

      animId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    animId = requestAnimationFrame(tick);
    handleScroll();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  return coords;
}
