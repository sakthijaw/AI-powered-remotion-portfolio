import { useState, useRef, useCallback, MouseEvent } from 'react';

interface TiltState {
  rotateX: number;
  rotateY: number;
  scale: number;
  shineX: number;
  shineY: number;
  shineOpacity: number;
}

interface UsePhysicalTiltOptions {
  maxTilt?: number;
  perspective?: number;
  scaleOnHover?: number;
  scaleOnClick?: number;
}

export function usePhysicalTilt({
  maxTilt = 7,
  perspective = 1000,
  scaleOnHover = 1.015,
  scaleOnClick = 0.985,
}: UsePhysicalTiltOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<TiltState>({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    shineX: 50,
    shineY: 50,
    shineOpacity: 0,
  });

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normX = (x / rect.width - 0.5) * 2; // -1 to 1
      const normY = (y / rect.height - 0.5) * 2; // -1 to 1

      // Subtle, realistic pitch and roll
      const rotateX = -normY * maxTilt;
      const rotateY = normX * maxTilt;

      setTilt({
        rotateX,
        rotateY,
        scale: scaleOnHover,
        shineX: (x / rect.width) * 100,
        shineY: (y / rect.height) * 100,
        shineOpacity: 1,
      });
    },
    [maxTilt, scaleOnHover]
  );

  const handleMouseEnter = useCallback(() => {
    setTilt((prev) => ({ ...prev, scale: scaleOnHover, shineOpacity: 1 }));
  }, [scaleOnHover]);

  const handleMouseLeave = useCallback(() => {
    // Spring gracefully back to resting state
    setTilt({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      shineX: 50,
      shineY: 50,
      shineOpacity: 0,
    });
  }, []);

  const handleMouseDown = useCallback(() => {
    setTilt((prev) => ({ ...prev, scale: scaleOnClick }));
  }, [scaleOnClick]);

  const handleMouseUp = useCallback(() => {
    setTilt((prev) => ({ ...prev, scale: scaleOnHover }));
  }, [scaleOnHover]);

  const style = {
    transform: `perspective(${perspective}px) rotateX(${tilt.rotateX.toFixed(2)}deg) rotateY(${tilt.rotateY.toFixed(2)}deg) scale3d(${tilt.scale}, ${tilt.scale}, 1)`,
    transition:
      tilt.shineOpacity === 0
        ? 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.65s ease'
        : 'transform 0.12s ease-out, box-shadow 0.25s ease',
  };

  const shineStyle = {
    background: `radial-gradient(circle 380px at ${tilt.shineX}% ${tilt.shineY}%, rgba(255, 255, 255, 0.08), transparent 70%)`,
    opacity: tilt.shineOpacity,
    transition: 'opacity 0.4s ease',
  };

  return {
    ref,
    props: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
    },
    style,
    shineStyle,
  };
}
