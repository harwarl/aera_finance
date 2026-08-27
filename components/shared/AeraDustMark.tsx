"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

// A miniature stand-in for the hero's dust sphere, used as the "AERA"
// brand mark — same Fibonacci-sphere dust cloud, just smaller and
// monochrome in the site's one accent color (read live off the --accent
// CSS variable rather than a hardcoded hex, so it never needs re-syncing
// when the palette changes, unlike HeroSceneDust's hardcoded copy).
// Rotates continuously at rest, like the hero; hovering freezes it in
// place rather than spinning it faster or reversing it — a still moment,
// not a new gesture.

const POINT_COUNT = 900;
const SPHERE_RADIUS = 1.6;
const ROTATE_SPEED = 0.25; // rad/sec

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

// WebGL points render as flat squares by default — this soft round sprite
// (alpha fades from the center) is what makes them read as dust/dots.
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
    gradient.addColorStop(0.5, "rgba(255,255,255,235)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }
  return new THREE.CanvasTexture(canvas);
}

export function AeraDustMark({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container: HTMLDivElement = containerRef.current;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const accentHex =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim() || "#ffffff";
    const accent = new THREE.Color(accentHex);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 20);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    container.appendChild(renderer.domElement);

    const sprite = createCircleSprite();
    const directions = fibonacciDirections(POINT_COUNT);
    const positions = new Float32Array(POINT_COUNT * 3);
    const colors = new Float32Array(POINT_COUNT * 3);
    for (let i = 0; i < POINT_COUNT; i++) {
      const jitter = 0.85 + Math.random() * 0.3;
      const [dx, dy, dz] = directions[i];
      positions[i * 3] = dx * SPHERE_RADIUS * jitter;
      positions[i * 3 + 1] = dy * SPHERE_RADIUS * jitter;
      positions[i * 3 + 2] = dz * SPHERE_RADIUS * jitter;
      colors[i * 3] = accent.r;
      colors[i * 3 + 1] = accent.g;
      colors[i * 3 + 2] = accent.b;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({
      size: 0.05,
      map: sprite,
      alphaMap: sprite,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    function resize() {
      const rect = container.getBoundingClientRect();
      const width = Math.max(rect.width, 1);
      const height = Math.max(rect.height, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    let hovered = false;
    function handleEnter() {
      hovered = true;
    }
    function handleLeave() {
      hovered = false;
    }
    container.addEventListener("pointerenter", handleEnter);
    container.addEventListener("pointerleave", handleLeave);

    let frameId = 0;
    let paused = document.visibilityState === "hidden";
    function handleVisibility() {
      paused = document.visibilityState === "hidden";
      if (!paused && !reduceMotion) {
        lastTime = performance.now();
        frameId = requestAnimationFrame(tick);
      }
    }
    document.addEventListener("visibilitychange", handleVisibility);

    let angle = 0;
    let lastTime = performance.now();

    function tick(now: number) {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      if (!hovered) {
        angle += dt * ROTATE_SPEED;
      }
      points.rotation.y = angle;
      renderer.render(scene, camera);
      if (!paused) frameId = requestAnimationFrame(tick);
    }

    if (reduceMotion) {
      renderer.render(scene, camera);
    } else {
      frameId = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      container.removeEventListener("pointerenter", handleEnter);
      container.removeEventListener("pointerleave", handleLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
      geometry.dispose();
      material.dispose();
      sprite.dispose();
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
      className={cn("pointer-events-auto h-full w-full", className)}
    />
  );
}
