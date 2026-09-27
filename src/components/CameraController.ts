import * as THREE from 'three';

// Smooth cubic hermite interpolation (smoothstep)
function smoothstep(min: number, max: number, value: number): number {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

export class CameraController {
  private camera: THREE.PerspectiveCamera;
  private currentPos: THREE.Vector3;
  private currentTarget: THREE.Vector3;
  private desiredPos: THREE.Vector3;
  private desiredTarget: THREE.Vector3;

  constructor(camera: THREE.PerspectiveCamera) {
    this.camera = camera;
    this.currentPos = camera.position.clone();
    this.currentTarget = new THREE.Vector3(0, 0, 0);
    this.desiredPos = camera.position.clone();
    this.desiredTarget = new THREE.Vector3(0, 0, 0);
  }

  /**
   * Calculates camera position and lookAt target from scroll progress (0.0 to 1.0)
   * with smooth multi-layer mouse parallax.
   */
  public update(progress: number, mouseX: number = 0, mouseY: number = 0, damping: number = 0.06): void {
    const p = Math.max(0, Math.min(1, progress));

    // Section 1: Hero (0.00 -> 0.16)
    if (p < 0.16) {
      const t = smoothstep(0, 0.16, p);
      this.desiredPos.set(
        THREE.MathUtils.lerp(0.0, 0.4, t),
        THREE.MathUtils.lerp(0.0, 0.1, t),
        THREE.MathUtils.lerp(7.8, 7.0, t)
      );
      this.desiredTarget.set(
        THREE.MathUtils.lerp(0.8, 0.5, t),
        0.0,
        0.0
      );
    }
    // Section 2: 3D Video Exhibition (0.16 -> 0.74)
    // Scrolling through each of the 5 videos animatedly in 3D!
    else if (p < 0.74) {
      const videoSpan = (0.74 - 0.16) / 5; // ~0.116 per video
      const sub = (p - 0.16) / (0.74 - 0.16); // 0 to 1 across 5 videos
      const videoIndex = Math.min(4, Math.floor(sub * 5));
      const localT = (sub * 5) - videoIndex;
      const smoothLocal = smoothstep(0, 1, localT);

      // Current video index align: 0 (right), 1 (left), 2 (right), 3 (left), 4 (right)
      const isRight = videoIndex % 2 === 0;
      const nextIsRight = !isRight;

      const currentCamX = isRight ? -0.8 : 0.8;
      const nextCamX = nextIsRight ? -0.8 : 0.8;

      const currentLookX = isRight ? 1.4 : -1.4;
      const nextLookX = nextIsRight ? 1.4 : -1.4;

      this.desiredPos.set(
        THREE.MathUtils.lerp(currentCamX, nextCamX, smoothLocal),
        Math.sin(p * Math.PI * 5) * 0.25,
        6.4
      );
      this.desiredTarget.set(
        THREE.MathUtils.lerp(currentLookX, nextLookX, smoothLocal),
        0.0,
        0.0
      );
    }
    // Section 3: Exploded View & Architecture (0.74 -> 0.88)
    else if (p < 0.88) {
      const t = smoothstep(0.74, 0.88, p);
      this.desiredPos.set(
        THREE.MathUtils.lerp(0.8, 0.0, t),
        THREE.MathUtils.lerp(0.0, 1.4, t),
        THREE.MathUtils.lerp(6.4, 5.0, t)
      );
      this.desiredTarget.set(0.0, 0.0, 0.0);
    }
    // Section 4: Final CTA (0.88 -> 1.00)
    else {
      const t = smoothstep(0.88, 1.0, p);
      this.desiredPos.set(
        0.0,
        THREE.MathUtils.lerp(1.4, 0.4, t),
        THREE.MathUtils.lerp(5.0, 9.4, t)
      );
      this.desiredTarget.set(0.0, 0.0, 0.0);
    }

    // High-Fidelity Multi-Layer Mouse Parallax
    // Subtle, organic inertia without jerky jumps
    const parallaxX = mouseX * 0.45;
    const parallaxY = -mouseY * 0.35;

    this.currentPos.x = THREE.MathUtils.lerp(this.currentPos.x, this.desiredPos.x + parallaxX, damping);
    this.currentPos.y = THREE.MathUtils.lerp(this.currentPos.y, this.desiredPos.y + parallaxY, damping);
    this.currentPos.z = THREE.MathUtils.lerp(this.currentPos.z, this.desiredPos.z, damping);

    this.currentTarget.x = THREE.MathUtils.lerp(this.currentTarget.x, this.desiredTarget.x + parallaxX * 0.2, damping);
    this.currentTarget.y = THREE.MathUtils.lerp(this.currentTarget.y, this.desiredTarget.y + parallaxY * 0.2, damping);
    this.currentTarget.z = THREE.MathUtils.lerp(this.currentTarget.z, this.desiredTarget.z, damping);

    this.camera.position.copy(this.currentPos);
    this.camera.lookAt(this.currentTarget);
  }
}
