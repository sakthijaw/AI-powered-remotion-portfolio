import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { CameraController } from './CameraController';
import { ScrollScene } from './ScrollScene';

interface SceneProps {
  scrollProgress: number;
  onSelectVideo: (index: number) => void;
}

export const Scene: React.FC<SceneProps> = ({ scrollProgress, onSelectVideo }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<number>(scrollProgress);
  scrollRef.current = scrollProgress;

  const onSelectVideoRef = useRef(onSelectVideo);
  onSelectVideoRef.current = onSelectVideo;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8.5);

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 3. Instantiate 3D Model & Camera Controller
    const scrollScene = new ScrollScene();
    scene.add(scrollScene.group);

    const cameraController = new CameraController(camera);

    // 4. Mouse Coordinates & Raycaster for 3D Video Clicking
    let mouseX = 0;
    let mouseY = 0;
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle 3D Click directly on 3D Video Screens
    const handleClick = (e: MouseEvent) => {
      mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouseVector, camera);

      const intersects = raycaster.intersectObjects(scrollScene.videoClickMeshes, false);
      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as any;
        if (typeof hitMesh.videoIndex === 'number' && onSelectVideoRef.current) {
          onSelectVideoRef.current(hitMesh.videoIndex);
        }
      }
    };
    window.addEventListener('click', handleClick);

    // 5. Responsive Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 6. Smooth 60 FPS Render Loop
    let animId: number;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;

      // Update camera with current scroll progress and mouse coordinates
      cameraController.update(scrollRef.current, mouseX, mouseY, 0.05);

      // Update 3D transforms & 3D video screens
      scrollScene.update(scrollRef.current, elapsed, mouseX, mouseY);

      renderer.render(scene, camera);
    };

    animate();

    // 7. Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      scrollScene.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="webgl-canvas-container" aria-hidden="true" />
      <div className="scene-interactive-hint">
        <span className="hint-dot"></span>
        <span>SCROLL TO TRAVERSE 3D VIDEOS · CLICK 3D SCREEN TO PLAY</span>
      </div>
    </>
  );
};
