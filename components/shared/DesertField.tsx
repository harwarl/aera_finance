"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Sparse ambient particle field for the dashboard background — sand-like
// grains that idle-drift, and swirl toward the cursor with a gravity-well
// pull + tangential spin (an accretion-disk feel) rather than a hard snap.
// Kept deliberately low-density and low-opacity: this is atmosphere behind
// the real UI, never competing with it.

const PARTICLE_COUNT = 1000;
const FIELD_X = 17;
const FIELD_Y = 11;
const FIELD_Z = 7;
const INFLUENCE_RADIUS = 6.5;
const ATTRACT_FORCE = 10;
const SWIRL_FORCE = 14;
const SPRING = 1.4;
const DAMPING = 0.9;

// Warm sand tones carry the field; a small minority of accent teal and pale
// highlight specks keep it from reading as flat monochrome.
const PALETTE: [color: string, weight: number][] = [
  ["#caa06b", 0.34],
  ["#8a6a45", 0.22],
  ["#e3c08a", 0.2],
  ["#2dd4bf", 0.13],
  ["#f4ead9", 0.11],
];

function pickColor() {
  const total = PALETTE.reduce((sum, [, w]) => sum + w, 0);
  let roll = Math.random() * total;
  for (const [hex, w] of PALETTE) {
    roll -= w;
    if (roll <= 0) return new THREE.Color(hex);
  }
  return new THREE.Color(PALETTE[0][0]);
}

function createGrainTexture() {
  const size = 512;
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
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.45, "rgba(255,255,255,0.55)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }
  return new THREE.CanvasTexture(canvas);
}

export function DesertField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 20;
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const base = new Float32Array(PARTICLE_COUNT * 3);
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() * 2 - 1) * FIELD_X;
      const y = (Math.random() * 2 - 1) * FIELD_Y;
      const z = (Math.random() * 2 - 1) * FIELD_Z;
      base[i * 3] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const color = pickColor();
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const grainTexture = createGrainTexture();
    const material = new THREE.PointsMaterial({
      size: 0.11,
      map: grainTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const mouseWorld = { x: 9999, y: 9999, active: false };
    const fovRad = (camera.fov * Math.PI) / 180;

    function updateMouseWorld(clientX: number, clientY: number) {
      const ndcX = (clientX / window.innerWidth) * 2 - 1;
      const ndcY = -((clientY / window.innerHeight) * 2 - 1);
      const distance = camera.position.z;
      const halfHeight = distance * Math.tan(fovRad / 2);
      const halfWidth = halfHeight * (window.innerWidth / window.innerHeight);
      mouseWorld.x = ndcX * halfWidth;
      mouseWorld.y = ndcY * halfHeight;
      mouseWorld.active = true;
    }

    function handlePointerMove(e: PointerEvent) {
      updateMouseWorld(e.clientX, e.clientY);
    }

    function handlePointerLeaveWindow() {
      mouseWorld.active = false;
    }

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerout", handlePointerLeaveWindow, {
      passive: true,
    });

    function resize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    resize();
    window.addEventListener("resize", resize);

    let frameId = 0;
    let lastTime = performance.now();
    let paused = document.visibilityState === "hidden";

    function handleVisibility() {
      paused = document.visibilityState === "hidden";
      if (!paused) {
        lastTime = performance.now();
        frameId = requestAnimationFrame(tick);
      }
    }
    document.addEventListener("visibilitychange", handleVisibility);

    function tick(now: number) {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const posAttr = geometry.attributes.position as THREE.BufferAttribute;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const idx = i * 3;
        const x = positions[idx];
        const y = positions[idx + 1];

        let vx = velocities[idx];
        let vy = velocities[idx + 1];
        let vz = velocities[idx + 2];

        if (mouseWorld.active) {
          const dx = mouseWorld.x - x;
          const dy = mouseWorld.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < INFLUENCE_RADIUS && dist > 0.001) {
            const falloff = 1 - dist / INFLUENCE_RADIUS;
            const pull = falloff * falloff * ATTRACT_FORCE;
            const swirl = falloff * SWIRL_FORCE;
            const nx = dx / dist;
            const ny = dy / dist;
            vx += (nx * pull + -ny * swirl) * dt;
            vy += (ny * pull + nx * swirl) * dt;
          }
        }

        // Spring back toward the base "sand bed" position.
        vx += (base[idx] - x) * SPRING * dt;
        vy += (base[idx + 1] - positions[idx + 1]) * SPRING * dt;
        vz += (base[idx + 2] - positions[idx + 2]) * SPRING * dt;

        vx *= DAMPING;
        vy *= DAMPING;
        vz *= DAMPING;

        positions[idx] += vx * dt;
        positions[idx + 1] += vy * dt;
        positions[idx + 2] += vz * dt;

        velocities[idx] = vx;
        velocities[idx + 1] = vy;
        velocities[idx + 2] = vz;
      }

      posAttr.needsUpdate = true;
      renderer.render(scene, camera);

      if (!paused) frameId = requestAnimationFrame(tick);
    }

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerLeaveWindow);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      geometry.dispose();
      material.dispose();
      grainTexture.dispose();
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
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
    />
  );
}
