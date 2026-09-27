import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Hero3DDirectorProps {
  onExplore: () => void;
}

export const Hero3DDirector: React.FC<Hero3DDirectorProps> = ({ onExplore }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<'mcp' | 'arc' | 'qa'>('mcp');
  const [fps, setFps] = useState<number>(60);
  const [timecode, setTimecode] = useState<string>('00:01:31:18');

  const modeRef = useRef(activeMode);
  modeRef.current = activeMode;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const width = container.clientWidth || 540;
    const height = container.clientHeight || 460;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // 3. Lighting (Warm Champagne Gold & Sandalwood Ambient)
    const ambientLight = new THREE.AmbientLight(0xfffdf7, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfff8eb, 2.4);
    dirLight1.position.set(5, 8, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xd4af37, 1.6); // warm champagne gold rim
    dirLight2.position.set(-6, -4, -4);
    scene.add(dirLight2);

    const sandalRimLight = new THREE.DirectionalLight(0xb38e46, 1.4); // rich sandalwood bronze rim
    sandalRimLight.position.set(4, -5, 3);
    scene.add(sandalRimLight);

    // 4. Director System 3D Hierarchy
    const directorGroup = new THREE.Group();
    scene.add(directorGroup);

    // A. Outer Concentric Gimbal Ring (Subagent 1: Research - Champagne Gold)
    const ring1Geo = new THREE.TorusGeometry(2.35, 0.038, 24, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.92,
      roughness: 0.16,
      emissive: 0xb38e46,
      emissiveIntensity: 0.22,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    directorGroup.add(ring1);

    // B. Middle Concentric Gimbal Ring (Subagent 2: 8-Beat Director - Sandalwood Bronze)
    const ring2Geo = new THREE.TorusGeometry(1.9, 0.034, 24, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xa48962,
      metalness: 0.88,
      roughness: 0.2,
      emissive: 0x846b48,
      emissiveIntensity: 0.2,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    directorGroup.add(ring2);

    // C. Inner Concentric Gimbal Ring (Subagent 3: 60FPS Remotion - Warm Alabaster Pearl)
    const ring3Geo = new THREE.TorusGeometry(1.45, 0.03, 24, 100);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: 0xeee4d4,
      metalness: 0.8,
      roughness: 0.15,
      emissive: 0xdfd2be,
      emissiveIntensity: 0.25,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    directorGroup.add(ring3);

    // D. Central Optical Core Prism (The Director Lens Barrel - Espresso Sandalwood Bronze)
    const lensBarrelGeo = new THREE.CylinderGeometry(0.95, 1.05, 0.65, 48);
    const lensBarrelMat = new THREE.MeshStandardMaterial({
      color: 0x221d18,
      metalness: 0.92,
      roughness: 0.24,
    });
    const lensBarrel = new THREE.Mesh(lensBarrelGeo, lensBarrelMat);
    lensBarrel.rotation.x = Math.PI / 2;
    directorGroup.add(lensBarrel);

    // E. Optical Lens Glass Element with Champagne Sheen
    const lensGlassGeo = new THREE.SphereGeometry(0.88, 36, 36, 0, Math.PI * 2, 0, Math.PI * 0.4);
    const lensGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x28231d,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.88,
      thickness: 0.5,
      reflectivity: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      emissive: 0xb38e46,
      emissiveIntensity: 0.2,
    });
    const lensGlass = new THREE.Mesh(lensGlassGeo, lensGlassMat);
    lensGlass.position.z = 0.32;
    directorGroup.add(lensGlass);

    // F. Floating 3D Tufte Living Unit Cells (Sandalwood Gold & Ivory Cubes orbiting in 3D)
    const particleCount = 72;
    const particlesGeo = new THREE.BoxGeometry(0.065, 0.065, 0.065);
    const particlesMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      emissive: 0xb38e46,
      emissiveIntensity: 0.45,
      metalness: 0.88,
      roughness: 0.18,
    });

    const particlesGroup = new THREE.Group();
    directorGroup.add(particlesGroup);

    const particleOffsets: { radius: number; speed: number; angle: number; y: number }[] = [];
    for (let i = 0; i < particleCount; i++) {
      const pMesh = new THREE.Mesh(particlesGeo, particlesMat);
      const radius = 1.1 + Math.random() * 1.5;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 1.8;
      pMesh.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      particlesGroup.add(pMesh);
      particleOffsets.push({
        radius,
        speed: 0.4 + Math.random() * 0.6,
        angle,
        y,
      });
    }

    // G. 3D Floating Cinema Film Frame Planes (Subagent Output)
    const filmFrameGeo = new THREE.PlaneGeometry(0.65, 0.42);
    const filmFrameMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const filmFramesGroup = new THREE.Group();
    directorGroup.add(filmFramesGroup);

    for (let i = 0; i < 5; i++) {
      const frameMesh = new THREE.Mesh(filmFrameGeo, filmFrameMat);
      const fAngle = (i / 5) * Math.PI * 2;
      frameMesh.position.set(Math.cos(fAngle) * 2.7, (i - 2) * 0.28, Math.sin(fAngle) * 2.7);
      frameMesh.lookAt(0, 0, 0);
      filmFramesGroup.add(frameMesh);
    }

    // 5. Mouse Interaction & Inertia
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetRotY = normX * 0.65;
      targetRotX = -normY * 0.55;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // 6. Timecode & Animation Loop
    let animId: number;
    let clock = new THREE.Clock();
    let frameCounter = 18;
    let secCounter = 31;

    const tcInterval = setInterval(() => {
      frameCounter = (frameCounter + 1) % 60;
      if (frameCounter === 0) secCounter = (secCounter + 1) % 60;
      const fStr = frameCounter < 10 ? `0${frameCounter}` : `${frameCounter}`;
      const sStr = secCounter < 10 ? `0${secCounter}` : `${secCounter}`;
      setTimecode(`00:01:${sStr}:${fStr}`);
    }, 120);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth camera gimbal rotation with realistic physical inertia
      currentRotX += (targetRotX - currentRotX) * 0.06;
      currentRotY += (targetRotY - currentRotY) * 0.06;

      directorGroup.rotation.x = currentRotX + Math.sin(elapsed * 0.6) * 0.08;
      directorGroup.rotation.y = currentRotY + Math.cos(elapsed * 0.5) * 0.08;

      // Independent Gimbal Ring Axis Rotations
      ring1.rotation.x = elapsed * 0.45;
      ring1.rotation.y = elapsed * 0.35;

      ring2.rotation.y = -elapsed * 0.55;
      ring2.rotation.z = elapsed * 0.3;

      ring3.rotation.x = -elapsed * 0.65;
      ring3.rotation.z = -elapsed * 0.45;

      filmFramesGroup.rotation.y = -elapsed * 0.2;

      // Orbiting living histogram data particles
      particleOffsets.forEach((po, idx) => {
        po.angle += po.speed * delta;
        const pChild = particlesGroup.children[idx];
        if (pChild) {
          pChild.position.x = Math.cos(po.angle) * po.radius;
          pChild.position.z = Math.sin(po.angle) * po.radius;
          pChild.position.y = po.y + Math.sin(elapsed * 2 + idx) * 0.12;
        }
      });

      // Highlight active mode
      if (modeRef.current === 'mcp') {
        ring1Mat.emissiveIntensity = 0.65 + Math.sin(elapsed * 4) * 0.25;
        ring2Mat.emissiveIntensity = 0.1;
        ring3Mat.emissiveIntensity = 0.1;
      } else if (modeRef.current === 'arc') {
        ring1Mat.emissiveIntensity = 0.1;
        ring2Mat.emissiveIntensity = 0.65 + Math.sin(elapsed * 4) * 0.25;
        ring3Mat.emissiveIntensity = 0.1;
      } else {
        ring1Mat.emissiveIntensity = 0.1;
        ring2Mat.emissiveIntensity = 0.1;
        ring3Mat.emissiveIntensity = 0.75 + Math.sin(elapsed * 4) * 0.25;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(tcInterval);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="director-3d-wrapper">
      {/* 3D WebGL Canvas Viewport */}
      <div className="director-canvas-box" ref={mountRef} />

      {/* Cybernetic HUD Overlay Lines & Crosshairs */}
      <div className="hud-lens-overlay" pointer-events="none">
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        {/* Center Director Crosshair */}
        <div className="hud-center-crosshair">
          <div className="cross-h" />
          <div className="cross-v" />
          <div className="cross-circle" />
        </div>

        {/* Top Telemetry Bar */}
        <div className="hud-top-telemetry">
          <div className="hud-rec-indicator">
            <span className="rec-pulse-dot" />
            <span>DIRECTOR ONLINE · {timecode}</span>
          </div>
          <div className="hud-stat-pill">
            <span className="pulse-green-dot" />
            <span>60.0 FPS LOCKED</span>
          </div>
          <span className="hud-ratio-tag">0.0% HALLUCINATION</span>
        </div>

        {/* Bottom Camera Settings Bar */}
        <div className="hud-bottom-telemetry">
          <span className="hud-param">FOCAL: 50mm f/1.4</span>
          <span className="hud-param">PROVENANCE: GOOGLE DATA COMMONS</span>
          <span className="hud-param">TUFTE SKILLS: 226+ ACTIVE</span>
        </div>
      </div>

      {/* 3 Interactive Pipeline Mode Selectors (Directly Controls 3D Rings) */}
      <div className="director-mode-switches">
        <button
          className={`director-mode-btn ${activeMode === 'mcp' ? 'active-mcp' : ''}`}
          onClick={() => setActiveMode('mcp')}
        >
          <span className="mode-step">01</span>
          <div className="mode-label-group">
            <span className="mode-name">MCP Intelligence</span>
            <span className="mode-sub">Data Commons Ground Truth</span>
          </div>
        </button>

        <button
          className={`director-mode-btn ${activeMode === 'arc' ? 'active-arc' : ''}`}
          onClick={() => setActiveMode('arc')}
        >
          <span className="mode-step">02</span>
          <div className="mode-label-group">
            <span className="mode-name">8-Beat Director</span>
            <span className="mode-sub">226+ Tufte Principles</span>
          </div>
        </button>

        <button
          className={`director-mode-btn ${activeMode === 'qa' ? 'active-qa' : ''}`}
          onClick={() => setActiveMode('qa')}
        >
          <span className="mode-step">03</span>
          <div className="mode-label-group">
            <span className="mode-name">Remotion 60FPS QA</span>
            <span className="mode-sub">Deterministic Chromium Render</span>
          </div>
        </button>
      </div>

      {/* Direct Jump CTA */}
      <div className="director-hud-action-bar">
        <span className="director-status-text">
          ● Interactive 3D Director Engine · Move cursor to rotate lens in space
        </span>
        <button className="btn-cta director-view-work-btn" onClick={onExplore}>
          <span>View 5 Documentaries ↓</span>
        </button>
      </div>
    </div>
  );
};
