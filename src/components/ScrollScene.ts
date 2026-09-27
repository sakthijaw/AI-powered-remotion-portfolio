import * as THREE from 'three';
import { PROJECTS_DATA } from '../data/projectsData';

/**
 * Creates a high-resolution 35mm celluloid filmstrip texture
 * displaying actual Remotion 60FPS video project frames, Tufte graphics,
 * timecodes, and classic film perforations (sprockets).
 */
function createFilmstripTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // 1. Dark obsidian film base
  ctx.fillStyle = '#09090C';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Sprocket margin bands
  ctx.fillStyle = '#121217';
  ctx.fillRect(0, 0, canvas.width, 54);
  ctx.fillRect(0, canvas.height - 54, canvas.width, 54);

  // 3. 35mm Sprocket Holes (Rectangular film perforations)
  const numSprockets = 44;
  const sprocketWidth = 22;
  const sprocketHeight = 32;
  ctx.fillStyle = '#E4E4E7';

  for (let i = 0; i < numSprockets; i++) {
    const x = (i / numSprockets) * canvas.width + 12;
    // Top sprocket perforation
    ctx.beginPath();
    ctx.roundRect(x, 11, sprocketWidth, sprocketHeight, 4);
    ctx.fill();

    // Bottom sprocket perforation
    ctx.beginPath();
    ctx.roundRect(x, canvas.height - 43, sprocketWidth, sprocketHeight, 4);
    ctx.fill();
  }

  // 4. Five Remotion 60FPS Documentary Video Frames
  const frameWidth = 350;
  const frameHeight = 240;
  const startY = 136;
  const frames = [
    {
      title: 'EMISSIONS: TOTALS VS LIFESTYLES',
      spec: '60 FPS · TUFTE HISTOGRAM',
      code: '00:01:31:00',
      tag: 'DATA COMMONS MCP',
      color: '#38BDF8',
    },
    {
      title: "ANSCOMBE'S QUARTET",
      spec: 'SCATTERPLOT MATRIX · D3',
      code: '00:01:00:00',
      tag: 'MATHEMATICAL PROOF',
      color: '#F472B6',
    },
    {
      title: 'INDIA IN GLOBAL HEALTH',
      spec: 'COMPARATIVE BASELINES',
      code: '00:01:05:00',
      tag: 'WHO & WORLD BANK',
      color: '#34D399',
    },
    {
      title: '8.2B WORLD DEMOGRAPHICS',
      spec: 'UNIT DOT FIELD MOSAIC',
      code: '00:01:14:00',
      tag: 'UN WPP PROJECTION',
      color: '#FBBF24',
    },
    {
      title: 'ABS CENSUS INFRASTRUCTURE',
      spec: 'GALAXY DOT DENSITY MAP',
      code: '00:00:42:00',
      tag: 'AUSTRALIAN BUREAU STATS',
      color: '#A78BFA',
    },
  ];

  frames.forEach((f, idx) => {
    const x = 40 + idx * 400;

    // Frame border with camera crosshairs
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x, startY, frameWidth, frameHeight);

    // Frame background gradient
    const grad = ctx.createLinearGradient(x, startY, x + frameWidth, startY + frameHeight);
    grad.addColorStop(0, '#101015');
    grad.addColorStop(1, '#1A1A22');
    ctx.fillStyle = grad;
    ctx.fillRect(x, startY, frameWidth, frameHeight);

    // Header HUD bar
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(x, startY, frameWidth, 28);

    // Recording tally dot
    ctx.fillStyle = '#EF4444';
    ctx.beginPath();
    ctx.arc(x + 16, startY + 14, 5, 0, Math.PI * 2);
    ctx.fill();

    // Timecode
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 11px monospace';
    ctx.fillText(`REC · ${f.code}`, x + 28, startY + 18);

    ctx.fillStyle = '#A1A1AA';
    ctx.font = '10px monospace';
    ctx.fillText('REMOTION 60FPS', x + frameWidth - 105, startY + 18);

    // Center Graphic (Simulated Tufte Data Visualizations)
    ctx.fillStyle = f.color;
    // Draw animated-looking chart bars & scatter points
    for (let b = 0; b < 7; b++) {
      const bx = x + 35 + b * 42;
      const bh = 30 + Math.abs(Math.sin(b * 1.3 + idx)) * 70;
      ctx.fillRect(bx, startY + frameHeight - 48 - bh, 24, bh);

      // Scatter dot above bar
      ctx.beginPath();
      ctx.arc(bx + 12, startY + frameHeight - 56 - bh, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Baseline rule
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x + 20, startY + frameHeight - 46);
    ctx.lineTo(x + frameWidth - 20, startY + frameHeight - 46);
    ctx.stroke();

    // Frame footer
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.fillRect(x, startY + frameHeight - 36, frameWidth, 36);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(f.title, x + 12, startY + frameHeight - 19);

    ctx.fillStyle = f.color;
    ctx.font = '10px monospace';
    ctx.fillText(`${f.spec} · ${f.tag}`, x + 12, startY + frameHeight - 6);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.anisotropy = 8;
  return texture;
}

export class ScrollScene {
  public group: THREE.Group;
  public videoScreenGroups: THREE.Group[] = [];
  public videoClickMeshes: THREE.Mesh[] = [];

  // Main Director Rig Group
  public directorCoreGroup: THREE.Group;

  // 1. Cine Camera Optics & Aperture
  private cameraBody: THREE.Group;
  private lensBarrel: THREE.Mesh;
  private focusGripRing: THREE.Mesh;
  private apertureBlades: THREE.Mesh[] = [];
  private opticalSensorGlow: THREE.Mesh;
  private recIndicatorLight: THREE.PointLight;

  // 2. Kinetic Remotion 35mm Filmstrip Ribbon
  private filmRibbon1: THREE.Mesh;
  private filmRibbon2: THREE.Mesh;
  private filmTexture: THREE.CanvasTexture;

  // 3. 3D Film Spool Reels
  private topFilmReel: THREE.Group;
  private bottomFilmReel: THREE.Group;

  // 4. Three Autonomous Subagent Orbiting Probes
  private subagent1McpProbe: THREE.Group;    // Intelligence & Data Commons
  private subagent2DirectorProbe: THREE.Group; // 8-Beat Story Arc
  private subagent3QaProbe: THREE.Group;       // Remotion 60FPS Chromium QA
  private agentLaserStreams: THREE.LineSegments;

  // 5. Calibrated 60 FPS Precision Timecode Ring
  private timecodeRing: THREE.LineSegments;

  constructor() {
    this.group = new THREE.Group();

    // Premium Monochrome Studio Palette
    const colorGraphite = 0x141418;
    const colorObsidian = 0x0A0A0D;
    const colorPlatinum = 0xF5F5F7;
    const colorSilver = 0xD4D4D8;
    const colorBlush = 0xFCE7F3;
    const colorChromiumGreen = 0x10B981;
    const colorMcpCyan = 0x38BDF8;
    const colorStoryAmber = 0xFBBF24;

    this.directorCoreGroup = new THREE.Group();
    this.group.add(this.directorCoreGroup);

    // =========================================================================
    // 1. AUTONOMOUS CINE-CAMERA LENS & IRIS APERTURE (Central Video Director)
    // =========================================================================
    this.cameraBody = new THREE.Group();
    this.directorCoreGroup.add(this.cameraBody);

    // A. Main Anodized Metal Lens Barrel
    const barrelGeo = new THREE.CylinderGeometry(1.25, 1.35, 1.4, 48, 1, false);
    barrelGeo.rotateX(Math.PI / 2);
    const barrelMat = new THREE.MeshStandardMaterial({
      color: colorGraphite,
      roughness: 0.15,
      metalness: 0.92,
    });
    this.lensBarrel = new THREE.Mesh(barrelGeo, barrelMat);
    this.cameraBody.add(this.lensBarrel);

    // B. Knurled Rubber/Metal Focus Grip Ring
    const gripGeo = new THREE.CylinderGeometry(1.36, 1.36, 0.45, 64);
    gripGeo.rotateX(Math.PI / 2);
    const gripMat = new THREE.MeshStandardMaterial({
      color: colorObsidian,
      roughness: 0.8,
      metalness: 0.3,
      wireframe: false,
    });
    this.focusGripRing = new THREE.Mesh(gripGeo, gripMat);
    this.focusGripRing.position.z = 0.2;
    this.cameraBody.add(this.focusGripRing);

    // C. Machined Bevel Front Bezel
    const frontRimGeo = new THREE.TorusGeometry(1.32, 0.05, 16, 64);
    const rimMat = new THREE.MeshStandardMaterial({
      color: colorPlatinum,
      metalness: 0.95,
      roughness: 0.08,
    });
    const frontRim = new THREE.Mesh(frontRimGeo, rimMat);
    frontRim.position.z = 0.72;
    this.cameraBody.add(frontRim);

    // D. Multi-Element Optical Glass Front Lens
    const lensGlassGeo = new THREE.SphereGeometry(1.22, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.35);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x181822,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.7,
      transparent: true,
      opacity: 0.85,
      reflectivity: 0.9,
    });
    const frontGlass = new THREE.Mesh(lensGlassGeo, glassMat);
    frontGlass.position.z = 0.45;
    this.cameraBody.add(frontGlass);

    // E. Dynamic 8-Blade Mechanical Iris Aperture
    const bladeGeo = new THREE.BoxGeometry(0.55, 0.015, 0.18);
    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0x111114,
      metalness: 0.85,
      roughness: 0.2,
    });
    const numBlades = 8;
    for (let i = 0; i < numBlades; i++) {
      const blade = new THREE.Mesh(bladeGeo, bladeMat);
      const angle = (i / numBlades) * Math.PI * 2;
      const radius = 0.62;
      blade.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0.1);
      blade.rotation.z = angle + 0.35;
      this.apertureBlades.push(blade);
      this.cameraBody.add(blade);
    }

    // F. Glowing Core Sensor (Illuminated Video Engine Core)
    const sensorGeo = new THREE.CircleGeometry(0.55, 32);
    const sensorMat = new THREE.MeshBasicMaterial({
      color: colorBlush,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
    });
    this.opticalSensorGlow = new THREE.Mesh(sensorGeo, sensorMat);
    this.opticalSensorGlow.position.z = -0.15;
    this.cameraBody.add(this.opticalSensorGlow);

    // G. Live Recording Indicator Tally Light
    this.recIndicatorLight = new THREE.PointLight(0xEF4444, 2.5, 6);
    this.recIndicatorLight.position.set(1.1, 1.1, 0.75);
    this.cameraBody.add(this.recIndicatorLight);

    const recDotGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const recDotMat = new THREE.MeshBasicMaterial({ color: 0xEF4444 });
    const recDot = new THREE.Mesh(recDotGeo, recDotMat);
    recDot.position.copy(this.recIndicatorLight.position);
    this.cameraBody.add(recDot);

    // =========================================================================
    // 2. KINETIC REMOTION 35MM FILMSTRIP RIBBONS (Curving 60FPS Video Timelines)
    // =========================================================================
    this.filmTexture = createFilmstripTexture();
    const ribbonMat = new THREE.MeshBasicMaterial({
      map: this.filmTexture,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95,
    });

    // Outer orbiting filmstrip loop 1
    const ribbonGeo1 = new THREE.CylinderGeometry(2.35, 2.35, 0.95, 64, 1, true);
    ribbonGeo1.rotateZ(0.28);
    this.filmRibbon1 = new THREE.Mesh(ribbonGeo1, ribbonMat);
    this.directorCoreGroup.add(this.filmRibbon1);

    // Second counter-angled filmstrip loop 2
    const ribbonGeo2 = new THREE.CylinderGeometry(2.95, 2.95, 0.9, 64, 1, true);
    ribbonGeo2.rotateX(0.4);
    ribbonGeo2.rotateY(0.5);
    this.filmRibbon2 = new THREE.Mesh(ribbonGeo2, ribbonMat);
    this.directorCoreGroup.add(this.filmRibbon2);

    // =========================================================================
    // 3. 3D FILM SPOOL REELS (Rotating 35mm Celluloid Feeds)
    // =========================================================================
    const createFilmReel = (radius: number): THREE.Group => {
      const reelGroup = new THREE.Group();
      const reelMat = new THREE.MeshStandardMaterial({
        color: colorSilver,
        metalness: 0.9,
        roughness: 0.15,
      });

      // Outer rim
      const rim = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.04, 16, 48), reelMat);
      reelGroup.add(rim);

      // Center Hub
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.12, 24), reelMat);
      hub.rotateX(Math.PI / 2);
      reelGroup.add(hub);

      // Radial Spokes
      const numSpokes = 5;
      for (let s = 0; s < numSpokes; s++) {
        const spoke = new THREE.Mesh(new THREE.BoxGeometry(radius * 1.85, 0.035, 0.04), reelMat);
        spoke.rotation.z = (s / numSpokes) * Math.PI;
        reelGroup.add(spoke);
      }
      return reelGroup;
    };

    this.topFilmReel = createFilmReel(0.95);
    this.topFilmReel.position.set(-1.6, 1.8, -0.6);
    this.topFilmReel.rotation.y = 0.25;
    this.directorCoreGroup.add(this.topFilmReel);

    this.bottomFilmReel = createFilmReel(0.8);
    this.bottomFilmReel.position.set(1.8, -1.6, -0.8);
    this.bottomFilmReel.rotation.y = -0.3;
    this.directorCoreGroup.add(this.bottomFilmReel);

    // =========================================================================
    // 4. THREE ORBITING SUBAGENTS (The Autonomous Production Architecture)
    // =========================================================================

    // A. Subagent 01: Research & Intelligence (Google Data Commons MCP)
    this.subagent1McpProbe = new THREE.Group();
    const probeGeo = new THREE.SphereGeometry(0.18, 20, 20);
    const probe1Mat = new THREE.MeshStandardMaterial({
      color: colorMcpCyan,
      roughness: 0.1,
      metalness: 0.9,
      emissive: colorMcpCyan,
      emissiveIntensity: 0.4,
    });
    const probe1 = new THREE.Mesh(probeGeo, probe1Mat);
    this.subagent1McpProbe.add(probe1);

    const orbitRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(0.35, 0.015, 12, 32),
      new THREE.MeshBasicMaterial({ color: colorMcpCyan })
    );
    this.subagent1McpProbe.add(orbitRing1);
    this.directorCoreGroup.add(this.subagent1McpProbe);

    // B. Subagent 02: Story & Director (8-Beat Narrative Arc)
    this.subagent2DirectorProbe = new THREE.Group();
    const probe2Mat = new THREE.MeshStandardMaterial({
      color: colorStoryAmber,
      roughness: 0.15,
      metalness: 0.9,
      emissive: colorStoryAmber,
      emissiveIntensity: 0.35,
    });
    const probe2 = new THREE.Mesh(probeGeo, probe2Mat);
    this.subagent2DirectorProbe.add(probe2);

    const gimbalRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.4, 0.02, 12, 32),
      new THREE.MeshStandardMaterial({ color: colorPlatinum, metalness: 0.95, roughness: 0.1 })
    );
    this.subagent2DirectorProbe.add(gimbalRing);
    this.directorCoreGroup.add(this.subagent2DirectorProbe);

    // C. Subagent 03: Remotion 60FPS Video & Headless Chromium QA
    this.subagent3QaProbe = new THREE.Group();
    const probe3Mat = new THREE.MeshStandardMaterial({
      color: colorChromiumGreen,
      roughness: 0.1,
      metalness: 0.9,
      emissive: colorChromiumGreen,
      emissiveIntensity: 0.5,
    });
    const probe3 = new THREE.Mesh(probeGeo, probe3Mat);
    this.subagent3QaProbe.add(probe3);

    const qaShield = new THREE.Mesh(
      new THREE.TorusGeometry(0.36, 0.018, 12, 32),
      new THREE.MeshBasicMaterial({ color: colorChromiumGreen })
    );
    this.subagent3QaProbe.add(qaShield);
    this.directorCoreGroup.add(this.subagent3QaProbe);

    // D. Data Provenance Laser Stream Lines
    const laserPoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(2, 1, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-2, 1.2, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, -2, 0),
    ];
    const laserGeo = new THREE.BufferGeometry().setFromPoints(laserPoints);
    const laserMat = new THREE.LineBasicMaterial({
      color: colorPlatinum,
      transparent: true,
      opacity: 0.35,
    });
    this.agentLaserStreams = new THREE.LineSegments(laserGeo, laserMat);
    this.directorCoreGroup.add(this.agentLaserStreams);

    // =========================================================================
    // 5. 60 FPS CALIBRATION & TIMECODE HUD RING
    // =========================================================================
    const ringTicks: THREE.Vector3[] = [];
    const numTicks = 60; // 60 frames calibration
    for (let t = 0; t < numTicks; t++) {
      const angle = (t / numTicks) * Math.PI * 2;
      const isMajor = t % 10 === 0;
      const rInner = isMajor ? 3.35 : 3.42;
      const rOuter = 3.52;
      ringTicks.push(
        new THREE.Vector3(Math.cos(angle) * rInner, Math.sin(angle) * rInner, 0),
        new THREE.Vector3(Math.cos(angle) * rOuter, Math.sin(angle) * rOuter, 0)
      );
    }
    const ticksGeo = new THREE.BufferGeometry().setFromPoints(ringTicks);
    const ticksMat = new THREE.LineBasicMaterial({
      color: colorPlatinum,
      transparent: true,
      opacity: 0.45,
    });
    this.timecodeRing = new THREE.LineSegments(ticksGeo, ticksMat);
    this.directorCoreGroup.add(this.timecodeRing);

    // =========================================================================
    // 6. STUDIO LIGHTING RIG
    // =========================================================================
    const keyLight = new THREE.DirectionalLight(colorPlatinum, 3.2);
    keyLight.position.set(5, 7, 7);
    this.group.add(keyLight);

    const rimLight = new THREE.DirectionalLight(colorBlush, 2.2);
    rimLight.position.set(-6, -4, -3);
    this.group.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0x0C0C10, 1.4);
    this.group.add(ambientLight);

    // Position the autonomous director cine-rig on the right half of the screen
    // so it sits heroically beside the left-aligned hero copy!
    this.directorCoreGroup.position.set(3.2, 0.0, 0.0);
  }

  /**
   * Updates animations based on scroll progress, elapsed time, and mouse coordinates
   */
  public update(progress: number, elapsed: number, mouseX: number = 0, mouseY: number = 0): void {
    const p = Math.max(0, Math.min(1, progress));

    // A. Rotate Cine-Camera Lens Barrel smoothly
    this.cameraBody.rotation.y = Math.sin(elapsed * 0.4) * 0.18 + (mouseX * 0.2);
    this.cameraBody.rotation.x = Math.cos(elapsed * 0.35) * 0.12 - (mouseY * 0.15);

    // B. Breathe Optical Iris Aperture Blades based on scroll & elapsed time
    const apertureOpen = 0.5 + Math.sin(elapsed * 1.4 + p * Math.PI * 4) * 0.3;
    this.apertureBlades.forEach((blade, i) => {
      const angle = (i / this.apertureBlades.length) * Math.PI * 2;
      const r = 0.55 + apertureOpen * 0.25;
      blade.position.set(Math.cos(angle) * r, Math.sin(angle) * r, 0.1);
      blade.rotation.z = angle + apertureOpen * 0.4;
    });

    // C. Pulse sensor glow & tally light
    const sensorPulse = 0.65 + Math.sin(elapsed * 3.0) * 0.25;
    (this.opticalSensorGlow.material as THREE.MeshBasicMaterial).opacity = sensorPulse;
    this.recIndicatorLight.intensity = 1.5 + Math.sin(elapsed * 4.0) * 1.5;

    // D. Flow 35mm Filmstrip Ribbon (Scrolls film frames through the virtual camera gate)
    this.filmTexture.offset.x = (elapsed * 0.06) + (p * 2.2);

    this.filmRibbon1.rotation.y = elapsed * 0.12 + p * Math.PI * 2;
    this.filmRibbon1.rotation.x = 0.25 + Math.sin(elapsed * 0.3) * 0.08;

    this.filmRibbon2.rotation.y = -elapsed * 0.16 - p * Math.PI * 2;
    this.filmRibbon2.rotation.z = Math.cos(elapsed * 0.25) * 0.1;

    // E. Spin 3D Film Spool Reels (Opposite directions simulating film feed)
    this.topFilmReel.rotation.z = -elapsed * 0.8 - (p * 8);
    this.bottomFilmReel.rotation.z = elapsed * 0.95 + (p * 8);

    // F. Orbit Three Subagents with Live Laser Lines
    const t = elapsed * 0.8;
    const r1 = 3.6;
    const p1x = Math.cos(t) * r1;
    const p1y = Math.sin(t * 1.2) * 1.6;
    const p1z = Math.sin(t) * 1.4;
    this.subagent1McpProbe.position.set(p1x, p1y, p1z);
    this.subagent1McpProbe.rotation.y = elapsed * 1.5;

    const r2 = 3.8;
    const p2x = Math.cos(t + 2.1) * r2;
    const p2y = Math.cos(t * 0.9) * 1.8;
    const p2z = Math.sin(t + 2.1) * 1.6;
    this.subagent2DirectorProbe.position.set(p2x, p2y, p2z);
    this.subagent2DirectorProbe.rotation.x = elapsed * 1.8;

    const r3 = 4.0;
    const p3x = Math.cos(t + 4.2) * r3;
    const p3y = Math.sin(t * 1.1 + 1) * 1.7;
    const p3z = Math.sin(t + 4.2) * 1.5;
    this.subagent3QaProbe.position.set(p3x, p3y, p3z);
    this.subagent3QaProbe.rotation.z = elapsed * 2.0;

    // Update laser line endpoints connecting subagents to the director core
    const posAttr = this.agentLaserStreams.geometry.attributes.position as THREE.BufferAttribute;
    if (posAttr) {
      posAttr.setXYZ(0, 0, 0, 0);
      posAttr.setXYZ(1, p1x, p1y, p1z);
      posAttr.setXYZ(2, 0, 0, 0);
      posAttr.setXYZ(3, p2x, p2y, p2z);
      posAttr.setXYZ(4, 0, 0, 0);
      posAttr.setXYZ(5, p3x, p3y, p3z);
      posAttr.needsUpdate = true;
    }

    // G. Rotate 60 FPS Timecode Scale Ring
    this.timecodeRing.rotation.z = -elapsed * 0.05 - (p * Math.PI);

    // H. Layout & Scroll Adaptation:
    // When in Hero (p < 0.18): position prominently on the right half.
    // When scrolling down into exhibits (p >= 0.18): smoothly recede into subtle ambient background.
    const isMobile = window.innerWidth < 900;
    const targetX = isMobile ? 0.0 : THREE.MathUtils.lerp(3.2, 0.0, Math.min(1, p * 4));
    const targetZ = isMobile ? -2.0 : THREE.MathUtils.lerp(0.0, -4.5, Math.min(1, p * 2.5));
    const targetScale = isMobile ? 0.65 : THREE.MathUtils.lerp(1.0, 0.85, Math.min(1, p * 2));

    this.directorCoreGroup.position.x = THREE.MathUtils.lerp(this.directorCoreGroup.position.x, targetX, 0.08);
    this.directorCoreGroup.position.z = THREE.MathUtils.lerp(this.directorCoreGroup.position.z, targetZ, 0.08);
    this.directorCoreGroup.scale.setScalar(targetScale);
  }

  public dispose(): void {
    if (this.filmTexture) {
      this.filmTexture.dispose();
    }
    this.group.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments) {
        if (obj.geometry) obj.geometry.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose());
        } else if (obj.material) {
          obj.material.dispose();
        }
      }
    });
  }
}
