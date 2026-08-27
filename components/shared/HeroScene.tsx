"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader.js";

// A full-bleed hero background: a starfield of particles spans the whole
// section, with a slowly rotating iridescent knot + wireframe shell offset
// to the right as the centerpiece, rendered with a subtle chromatic-
// aberration + bloom post pass for the glass/prism look. Tilts toward the
// cursor — a mouse-reactive "moving part," not a full-page effect like the
// dashboard's particle field.

const PARTICLE_COUNT = 140;
const CENTERPIECE_OFFSET_X = 2.2;
const CENTERPIECE_SCALE = 0.75;

export function HeroScene() {
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

    const accent = new THREE.Color("#2dd4bf");
    const accentSoft = new THREE.Color("#2dd4bf");

    const centerpiece = new THREE.Group();
    centerpiece.position.set(CENTERPIECE_OFFSET_X, 0, 0);
    centerpiece.scale.setScalar(CENTERPIECE_SCALE);
    scene.add(centerpiece);

    const knotGeometry = new THREE.TorusKnotGeometry(1.55, 0.42, 220, 32);
    const knotMaterial = new THREE.MeshPhysicalMaterial({
      color: accent,
      metalness: 0.15,
      roughness: 0.12,
      transmission: 0.85,
      thickness: 1.4,
      ior: 1.4,
      iridescence: 1,
      iridescenceIOR: 1.3,
      clearcoat: 1,
      clearcoatRoughness: 0.15,
      envMapIntensity: 1.1,
    });
    const knot = new THREE.Mesh(knotGeometry, knotMaterial);
    centerpiece.add(knot);

    const wireGeometry = new THREE.IcosahedronGeometry(2.6, 1);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: accentSoft,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    });
    const wireShell = new THREE.Mesh(wireGeometry, wireMaterial);
    centerpiece.add(wireShell);

    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    const keyLight = new THREE.PointLight(0xffffff, 40, 20);
    keyLight.position.set(4, 3, 5);
    const rimLight = new THREE.PointLight(accent, 30, 20);
    rimLight.position.set(-4, -2, -3);
    scene.add(ambient, keyLight, rimLight);

    // Stars span the full hero background, independent of the offset,
    // scaled-down centerpiece above.
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const radius = 3.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi) * 0.6;
    }
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3),
    );
    const particleMaterial = new THREE.PointsMaterial({
      color: accentSoft,
      size: 0.035,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const rgbShift = new ShaderPass(RGBShiftShader);
    rgbShift.uniforms.amount.value = 0.0018;
    composer.addPass(rgbShift);
    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.55, 0.6, 0.72);
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

    function tick(now: number) {
      const t = now * 0.001;

      // Gentle tilt toward the cursor, layered on top of the idle spin —
      // the "moving part" reacting to input.
      const tiltX = pointer.y * 0.35;
      const tiltY = pointer.x * 0.45;
      knot.rotation.y = t * 0.25 + tiltY;
      knot.rotation.x = Math.sin(t * 0.3) * 0.2 + tiltX;
      wireShell.rotation.y = -t * 0.12;
      wireShell.rotation.x = t * 0.08;
      particles.rotation.y = t * 0.05;

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
      knotGeometry.dispose();
      knotMaterial.dispose();
      wireGeometry.dispose();
      wireMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
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
