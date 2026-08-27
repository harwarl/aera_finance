"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  createCircleSprite,
  createTunnelField,
  disposeTunnelField,
  getPageScrollFraction,
  stepTunnelField,
} from "@/components/shared/starfieldCore";

// The traveling star tunnel for every section OTHER than the hero.
// HeroScene (rendered via HeroSceneDust) embeds its own copy directly in
// its own scene instead of relying on this one showing through behind it
// — UnrealBloomPass, used for the dust sphere's glow, bakes an opaque
// alpha into its output, so nothing placed behind that canvas is ever
// visible no matter the z-index. Everywhere else on the page has no such
// canvas in front of it, so this single fixed, full-viewport field
// carries the rest of the site.
//
// Scroll position IS depth traveled — see starfieldCore's TunnelField.
// Scrolling down pushes every star's Z toward and past the camera
// (perspective clipping handles them vanishing behind you and new ones
// coming into range ahead); scrolling back up retraces the exact same
// stars, since nothing about their position is randomized per frame.

const STAR_COUNT = 2600;
const TUNNEL_DEPTH = 240;
const NEAR = 0.5;
const FAR = 40;
const MAX_TRAVEL = TUNNEL_DEPTH - FAR;
const LATERAL_SPREAD = 18;
const CAMERA_FOV = 65;
const INFLUENCE_RADIUS = 5; // world units around the cursor
// Mouse position is projected onto a plane at this depth ahead of the
// camera — a fixed representative distance, independent of how far the
// camera has traveled, so the projected point stays a sensible scale.
const MOUSE_PROJECT_DISTANCE = 10;

export function StarfieldBackdrop() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(CAMERA_FOV, 1, NEAR, FAR);
    camera.position.set(0, 0, 0);
    camera.lookAt(0, 0, -1);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    container.appendChild(renderer.domElement);

    const circleSprite = createCircleSprite();
    const field = createTunnelField({
      count: STAR_COUNT,
      depth: TUNNEL_DEPTH,
      nearSeed: NEAR + 0.5,
      lateralSpread: LATERAL_SPREAD,
      pointSize: 0.09,
      opacity: 0.9,
      sprite: circleSprite,
    });
    scene.add(field.points);

    const mouseWorld = { x: 9999, y: 9999, active: false };
    const fovRad = (camera.fov * Math.PI) / 180;

    function updateMouseWorld(clientX: number, clientY: number) {
      const ndcX = (clientX / window.innerWidth) * 2 - 1;
      const ndcY = -((clientY / window.innerHeight) * 2 - 1);
      const halfHeight = MOUSE_PROJECT_DISTANCE * Math.tan(fovRad / 2);
      const halfWidth = halfHeight * (window.innerWidth / window.innerHeight);
      mouseWorld.x = ndcX * halfWidth;
      mouseWorld.y = ndcY * halfHeight;
      mouseWorld.active = true;
    }

    function handlePointerMove(e: PointerEvent) {
      updateMouseWorld(e.clientX, e.clientY);
    }
    function handlePointerLeave() {
      mouseWorld.active = false;
    }
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerout", handlePointerLeave, { passive: true });

    function resize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    resize();
    window.addEventListener("resize", resize);

    function currentTravel() {
      return getPageScrollFraction() * MAX_TRAVEL;
    }

    if (reduceMotion) {
      stepTunnelField(field, currentTravel(), 0, 0, mouseWorld, INFLUENCE_RADIUS);
      renderer.render(scene, camera);
      // Reduced motion still honors scroll position (it's not an
      // animation, just where you are), so keep it in sync without a RAF
      // loop driving continuous motion.
      function handleScrollStatic() {
        stepTunnelField(field, currentTravel(), 0, 0, mouseWorld, INFLUENCE_RADIUS);
        renderer.render(scene, camera);
      }
      window.addEventListener("scroll", handleScrollStatic, { passive: true });
      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerout", handlePointerLeave);
        window.removeEventListener("resize", resize);
        window.removeEventListener("scroll", handleScrollStatic);
        disposeTunnelField(field);
        circleSprite.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      };
    }

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
      const t = now * 0.001;
      lastTime = now;

      stepTunnelField(field, currentTravel(), dt, t, mouseWorld, INFLUENCE_RADIUS);
      renderer.render(scene, camera);
      if (!paused) frameId = requestAnimationFrame(tick);
    }
    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerLeave);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      disposeTunnelField(field);
      circleSprite.dispose();
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
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
