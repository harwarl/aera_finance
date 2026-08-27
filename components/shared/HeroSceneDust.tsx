"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader.js";

// PRESERVED — this is the original hero scene (dense dust-shell sphere with a
// traveling ripple wave + agent-message pop cycle), kept around unused after
// HeroScene.tsx was swapped to the wireframe-mesh scene. Not deleted, only
// renamed, per instruction. See HeroScene.tsx for the current hero visual.
//
// A full-bleed hero background: a sparse starfield spans the whole section,
// with a dense particle sphere offset to the right as the centerpiece — one
// single dust shell (no separate wireframe/band mesh) that a ripple of light
// sweeps through every cycle, bulging and brightening whichever dust it
// passes, meant to read as an AI thinking hard. Two point lights orbit the
// sphere continuously. Rendered with a chromatic-aberration + bloom post
// pass. Tilts toward the cursor.
//
// Timing is a single repeating cycle — WAVE (ripple sweeps pole to pole),
// then POP (agent message card shows), then REST (idle) — driven off
// `now` each frame rather than component state, so HeroScene never needs
// to re-render. AgentPulseFeed mirrors the same three durations with its
// own setTimeout chain to stay in step without any prop wiring between them.

const STAR_COUNT = 500;
const SPHERE_POINT_COUNT = 4200;
const SPHERE_RADIUS = 2.7;
const CENTERPIECE_OFFSET_X = 2.2;
const CENTERPIECE_SCALE = 0.75;

const RIPPLE_THICKNESS = 0.4; // radians of arc that's lit at any instant
const RIPPLE_BULGE = 0.16; // extra radial displacement at full intensity

export const DUST_WAVE_DURATION_MS = 1900;
export const DUST_CARD_HOLD_MS = 2400;
export const DUST_REST_DURATION_MS = 1300;
const CYCLE_MS =
  DUST_WAVE_DURATION_MS + DUST_CARD_HOLD_MS + DUST_REST_DURATION_MS;

function fibonacciDirections(count: number) {
  const dirs: [number, number, number][] = [];
  const offset = 2 / count;
  const increment = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = i * increment;
    dirs.push([Math.cos(phi) * r, y, Math.sin(phi) * r]);
  }
  return dirs;
}

function randomDirection(): [number, number, number] {
  const u = Math.random() * 2 - 1;
  const theta = Math.random() * Math.PI * 2;
  const r = Math.sqrt(Math.max(0, 1 - u * u));
  return [r * Math.cos(theta), u, r * Math.sin(theta)];
}

// WebGL points render as flat squares by default — this soft round sprite
// (alpha fades out from the center) is what makes them read as dots/stars.
function createCircleSprite(): THREE.Texture {
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
    gradient.addColorStop(0.5, "rgba(255,255,255,240)");
    gradient.addColorStop(1, "rgba(255,255,255,230)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }
  return new THREE.CanvasTexture(canvas);
}

export function HeroSceneDust() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container: HTMLDivElement = containerRef.current;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    container.appendChild(renderer.domElement);

    const accent = new THREE.Color("#dffc5a");
    const dustColor = new THREE.Color("#D4D0C9");
    const circleSprite = createCircleSprite();

    const centerpiece = new THREE.Group();
    centerpiece.position.set(CENTERPIECE_OFFSET_X, 0, 0);
    centerpiece.scale.setScalar(CENTERPIECE_SCALE);
    scene.add(centerpiece);

    // A single dense dust shell — no separate wireframe/band mesh. Each
    // particle's base direction + radius jitter is kept around so the wave
    // pass below can displace/brighten it and settle it back afterward.
    const directions = fibonacciDirections(SPHERE_POINT_COUNT);
    const baseJitters = new Float32Array(SPHERE_POINT_COUNT);
    const dustPositions = new Float32Array(SPHERE_POINT_COUNT * 3);
    const dustColors = new Float32Array(SPHERE_POINT_COUNT * 3);
    for (let i = 0; i < SPHERE_POINT_COUNT; i++) {
      const jitter = 0.9 + Math.random() * 0.2;
      baseJitters[i] = jitter;
      const [dx, dy, dz] = directions[i];
      dustPositions[i * 3] = dx * SPHERE_RADIUS * jitter;
      dustPositions[i * 3 + 1] = dy * SPHERE_RADIUS * jitter;
      dustPositions[i * 3 + 2] = dz * SPHERE_RADIUS * jitter;
      dustColors[i * 3] = dustColor.r;
      dustColors[i * 3 + 1] = dustColor.g;
      dustColors[i * 3 + 2] = dustColor.b;
    }
    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(dustPositions, 3),
    );
    dustGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(dustColors, 3),
    );
    const dustMaterial = new THREE.PointsMaterial({
      size: 0.026,
      map: circleSprite,
      alphaMap: circleSprite,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dustCloud = new THREE.Points(dustGeometry, dustMaterial);
    centerpiece.add(dustCloud);

    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    const keyLight = new THREE.PointLight(0xffffff, 40, 20);
    const rimLight = new THREE.PointLight(accent, 30, 20);
    scene.add(ambient, keyLight, rimLight);

    // Sparse starfield spans the full hero background, independent of the
    // offset centerpiece above.
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      const radius = 3.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi) * 0.6;
    }
    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3),
    );
    const starMaterial = new THREE.PointsMaterial({
      color: accent,
      map: circleSprite,
      alphaMap: circleSprite,
      size: 0.035,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
      depthWrite: false,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const rgbShift = new ShaderPass(RGBShiftShader);
    rgbShift.uniforms.amount.value = 0.0018;
    composer.addPass(rgbShift);
    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.65, 0.6, 0.68);
    composer.addPass(bloom);

    function resize() {
      const rect = container.getBoundingClientRect();
      const width = Math.max(rect.width, 1);
      const height = Math.max(rect.height, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
    }
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const pointer = { x: 0, y: 0 };
    function handlePointerMove(e: PointerEvent) {
      const rect = container.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    }
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    let frameId = 0;
    let paused = document.visibilityState === "hidden";

    function handleVisibility() {
      paused = document.visibilityState === "hidden";
      if (!paused && !reduceMotion) frameId = requestAnimationFrame(tick);
    }
    document.addEventListener("visibilitychange", handleVisibility);

    let waveOrigin = randomDirection();
    let cycleIndex = -1;
    const tmpColor = new THREE.Color();

    function tick(now: number) {
      const t = now * 0.001;

      const currentCycle = Math.floor(now / CYCLE_MS);
      if (currentCycle !== cycleIndex) {
        cycleIndex = currentCycle;
        waveOrigin = randomDirection();
      }
      const cycleT = now - cycleIndex * CYCLE_MS;
      const inWave = cycleT < DUST_WAVE_DURATION_MS;
      const rippleAngle = inWave
        ? (cycleT / DUST_WAVE_DURATION_MS) * Math.PI
        : -1;

      const posAttr = dustGeometry.attributes.position as THREE.BufferAttribute;
      const colorAttr = dustGeometry.attributes.color as THREE.BufferAttribute;

      for (let i = 0; i < SPHERE_POINT_COUNT; i++) {
        const [dx, dy, dz] = directions[i];
        let intensity = 0;
        if (inWave) {
          const cosAngle =
            dx * waveOrigin[0] + dy * waveOrigin[1] + dz * waveOrigin[2];
          const angDist = Math.acos(Math.min(1, Math.max(-1, cosAngle)));
          const delta = Math.abs(angDist - rippleAngle);
          if (delta < RIPPLE_THICKNESS) {
            intensity = 1 - delta / RIPPLE_THICKNESS;
          }
        }

        const radius =
          SPHERE_RADIUS * (baseJitters[i] + RIPPLE_BULGE * intensity);
        posAttr.setXYZ(i, dx * radius, dy * radius, dz * radius);

        if (intensity > 0) {
          tmpColor.copy(dustColor).lerp(accent, intensity);
          colorAttr.setXYZ(i, tmpColor.r, tmpColor.g, tmpColor.b);
        } else {
          colorAttr.setXYZ(i, dustColor.r, dustColor.g, dustColor.b);
        }
      }
      posAttr.needsUpdate = true;
      colorAttr.needsUpdate = true;

      // Gentle tilt toward the cursor, layered on top of the idle spin —
      // the "moving part" reacting to input.
      const tiltX = pointer.y * 0.35;
      const tiltY = pointer.x * 0.45;
      centerpiece.rotation.y = t * 0.18 + tiltY;
      centerpiece.rotation.x = Math.sin(t * 0.25) * 0.15 + tiltX;
      stars.rotation.y = t * 0.05;

      // Lights revolve around the centerpiece continuously.
      keyLight.position.set(
        CENTERPIECE_OFFSET_X + Math.cos(t * 0.5) * 5,
        3,
        Math.sin(t * 0.5) * 5,
      );
      rimLight.position.set(
        CENTERPIECE_OFFSET_X + Math.cos(t * 0.5 + Math.PI) * 5,
        -2,
        Math.sin(t * 0.5 + Math.PI) * 5,
      );

      camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.04;
      camera.position.y += (-pointer.y * 0.4 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      composer.render();
      if (!paused) frameId = requestAnimationFrame(tick);
    }

    if (reduceMotion) {
      composer.render();
    } else {
      frameId = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibility);
      dustGeometry.dispose();
      dustMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      circleSprite.dispose();
      composer.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none h-full w-full"
    />
  );
}
