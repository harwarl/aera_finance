import * as THREE from "three";

// Shared by StarfieldBackdrop (the sitewide fixed backdrop) and
// HeroSceneDust (which embeds its own copy directly in-scene — see the
// comment in HeroSceneDust for why it can't just rely on the fixed one
// showing through).
//
// This is a tunnel, not a rotating shell: every star has a fixed depth
// (home Z) chosen once and never touched again. "Travel" is a single
// scalar — how far down the page you've scrolled — added to every star's
// Z each frame. Increase it and stars slide toward and past the camera
// (normal perspective clipping makes the passed ones vanish and brings the
// distant ones into range); decrease it and the exact same stars slide
// back the other way. Nothing here is random per-frame, so scrolling back
// up retraces precisely rather than reshuffling into a new arrangement —
// that determinism is the whole point.
//
// A cursor gravity well nudges nearby stars sideways (X/Y only, depth
// stays put) with a spring pulling them back — a comet-style lag, not an
// orbit, same as before.

export const STAR_PALETTE: [color: string, weight: number][] = [
  ["#eef2f5", 0.62],
  ["#cdd9e6", 0.22],
  ["#a9d6ff", 0.13],
  ["#dffc5a", 0.03],
];

export function pickStarColor(palette: typeof STAR_PALETTE = STAR_PALETTE) {
  const total = palette.reduce((sum, [, w]) => sum + w, 0);
  let roll = Math.random() * total;
  for (const [hex, w] of palette) {
    roll -= w;
    if (roll <= 0) return new THREE.Color(hex);
  }
  return new THREE.Color(palette[0][0]);
}

// WebGL points render as flat squares by default — this soft round sprite
// (alpha fades from the center) is what makes them read as dots/stars.
export function createCircleSprite(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2,
    );
    gradient.addColorStop(0, "rgba(255,255,255,255)");
    gradient.addColorStop(0.5, "rgba(255,255,255,235)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }
  return new THREE.CanvasTexture(canvas);
}

export type TunnelField = {
  count: number;
  homeX: Float32Array;
  homeY: Float32Array;
  homeZ: Float32Array;
  offsetX: Float32Array;
  offsetY: Float32Array;
  velocityX: Float32Array;
  velocityY: Float32Array;
  baseSize: Float32Array;
  twinkleSpeed: Float32Array;
  twinklePhase: Float32Array;
  baseColors: Float32Array;
  geometry: THREE.BufferGeometry;
  material: THREE.PointsMaterial;
  points: THREE.Points;
};

export function createTunnelField(opts: {
  count: number;
  /** Total Z span stars are seeded across, in front of the camera's start position (world units). */
  depth: number;
  /** Nearest a star is ever seeded — keep clear of the near clip plane. */
  nearSeed: number;
  /** Half-extent of the X/Y placement box (world units). */
  lateralSpread: number;
  pointSize: number;
  opacity: number;
  sprite: THREE.Texture;
  palette?: typeof STAR_PALETTE;
}): TunnelField {
  const { count, depth, nearSeed, lateralSpread, pointSize, opacity, sprite, palette } = opts;

  const homeX = new Float32Array(count);
  const homeY = new Float32Array(count);
  const homeZ = new Float32Array(count);
  const offsetX = new Float32Array(count);
  const offsetY = new Float32Array(count);
  const velocityX = new Float32Array(count);
  const velocityY = new Float32Array(count);
  const baseSize = new Float32Array(count);
  const twinkleSpeed = new Float32Array(count);
  const twinklePhase = new Float32Array(count);
  const baseColors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    homeX[i] = (Math.random() * 2 - 1) * lateralSpread;
    homeY[i] = (Math.random() * 2 - 1) * lateralSpread;
    homeZ[i] = -(nearSeed + Math.random() * (depth - nearSeed));
    baseSize[i] = 0.045 + Math.random() * 0.08;
    twinkleSpeed[i] = 0.4 + Math.random() * 1.3;
    twinklePhase[i] = Math.random() * Math.PI * 2;
    const color = pickStarColor(palette);
    baseColors[i * 3] = color.r;
    baseColors[i * 3 + 1] = color.g;
    baseColors[i * 3 + 2] = color.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
  const material = new THREE.PointsMaterial({
    size: pointSize,
    map: sprite,
    alphaMap: sprite,
    vertexColors: true,
    transparent: true,
    opacity,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(geometry, material);

  return {
    count,
    homeX,
    homeY,
    homeZ,
    offsetX,
    offsetY,
    velocityX,
    velocityY,
    baseSize,
    twinkleSpeed,
    twinklePhase,
    baseColors,
    geometry,
    material,
    points,
  };
}

export const COMET_FOLLOW_FORCE = 9;
export const COMET_SPRING = 2.2;
export const COMET_DAMPING = 0.9;

export function stepTunnelField(
  field: TunnelField,
  travelZ: number,
  dt: number,
  t: number,
  mouseWorld: { x: number; y: number; active: boolean },
  influenceRadius: number,
) {
  const posAttr = field.geometry.attributes.position as THREE.BufferAttribute;
  const colorAttr = field.geometry.attributes.color as THREE.BufferAttribute;

  for (let i = 0; i < field.count; i++) {
    const x = field.homeX[i] + field.offsetX[i];
    const y = field.homeY[i] + field.offsetY[i];

    let vx = field.velocityX[i];
    let vy = field.velocityY[i];

    if (mouseWorld.active) {
      const dx = mouseWorld.x - x;
      const dy = mouseWorld.y - y;
      const dist = Math.hypot(dx, dy);
      if (dist < influenceRadius && dist > 0.001) {
        const falloff = 1 - dist / influenceRadius;
        const pull = falloff * falloff * COMET_FOLLOW_FORCE;
        vx += (dx / dist) * pull * dt;
        vy += (dy / dist) * pull * dt;
      }
    }

    vx += -field.offsetX[i] * COMET_SPRING * dt;
    vy += -field.offsetY[i] * COMET_SPRING * dt;
    vx *= COMET_DAMPING;
    vy *= COMET_DAMPING;

    field.offsetX[i] += vx * dt;
    field.offsetY[i] += vy * dt;
    field.velocityX[i] = vx;
    field.velocityY[i] = vy;

    posAttr.setXYZ(
      i,
      field.homeX[i] + field.offsetX[i],
      field.homeY[i] + field.offsetY[i],
      field.homeZ[i] + travelZ,
    );

    const twinkle = 0.55 + 0.45 * Math.sin(t * field.twinkleSpeed[i] + field.twinklePhase[i]);
    const brightness = twinkle * (0.6 + field.baseSize[i] * 3);
    colorAttr.setXYZ(
      i,
      field.baseColors[i * 3] * brightness,
      field.baseColors[i * 3 + 1] * brightness,
      field.baseColors[i * 3 + 2] * brightness,
    );
  }
  posAttr.needsUpdate = true;
  colorAttr.needsUpdate = true;
}

export function disposeTunnelField(field: TunnelField) {
  field.geometry.dispose();
  field.material.dispose();
}

/** How far down the page you've scrolled, as a 0..1 fraction. */
export function getPageScrollFraction() {
  const doc = document.documentElement;
  const max = Math.max(1, doc.scrollHeight - window.innerHeight);
  return Math.min(1, Math.max(0, window.scrollY / max));
}
