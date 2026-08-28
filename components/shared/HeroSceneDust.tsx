"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader.js";
import {
  createCircleSprite,
  createTunnelField,
  disposeTunnelField,
  stepTunnelField,
} from "@/components/shared/starfieldCore";

// A dense particle sphere offset to the right as the hero's centerpiece.
// Rather than a wave sweeping through the whole shell, a small pool of up
// to MAX_CONCURRENT_MOVERS individual dust motes peel off one at a time —
// each one is a specific particle that actually relocates from its start
// coordinate to a new one, with an in-scene label tracking it the whole
// way. That's meant to read as "the agent is doing something to this
// specific position," not an ambient effect washing over the sphere.
// Two point lights orbit the sphere continuously. Rendered with a
// chromatic-aberration + bloom post pass. Tilts toward the cursor.
//
// Also embeds its own copy of the sitewide traveling star tunnel (see
// starfieldCore) rather than just relying on StarfieldBackdrop showing
// through behind it. It can't: UnrealBloomPass's composite step bakes an
// opaque alpha into this canvas's output, so anything sitting behind it —
// including a `position: fixed` backdrop with a lower z-index — is
// invisible no matter what. Embedding the same field directly in this
// scene sidesteps that entirely, since it's composited through the same
// (already-opaque) canvas instead of trying to show through it. Its
// travel is scaled to one viewport height (rather than the whole page,
// like StarfieldBackdrop) since that's roughly how much of the page the
// hero itself occupies before it's scrolled out of view.
//
// Each mover runs through three stages on its own clock:
//   drift  — sits at its start position, brightening toward the accent
//            color; label shows "[DRIFT] {ticker} {pct}% over target
//            weight."
//   move   — eases from start to target position over MOVE_DURATION_MS;
//            label switches to "[ACTION] rebalancing to target weight."
//   settle — holds at the target position; label fades out over
//            SETTLE_HOLD_MS, and once it's fully faded the mover is
//            retired and its slot freed for a new one.
// A settled particle simply stays wherever it landed — nothing resets it
// back to its original spot, and nothing keeps touching its buffer entry
// once its mover is retired, so the per-frame cost only ever scales with
// how many movers are active (at most 6), not the full 4200-point shell.
//
// All ticker names, drift/action percentages, and label copy here are
// placeholders standing in for a real per-position signal — not wired to
// anything live yet.

const SPHERE_POINT_COUNT = 4000;
const SPHERE_RADIUS = 2.2;
const CENTERPIECE_OFFSET_X = 2.2;
const CENTERPIECE_SCALE = 0.75;

const MAX_CONCURRENT_MOVERS = 6;
export const DRIFT_HOLD_MS = 1200;
export const MOVE_DURATION_MS = 1400;
export const SETTLE_HOLD_MS = 900;
const SPAWN_INTERVAL_MIN_MS = 700;
const SPAWN_INTERVAL_MAX_MS = 1600;

const TICKERS = ["AAPLx", "TSLAx", "NVDAx", "MSFTx", "ETH", "BTC", "GOOGLx"];

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

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

type Stage = "drift" | "move" | "settle";

type Mover = {
  particleIndex: number;
  labelIndex: number;
  startPos: THREE.Vector3;
  targetPos: THREE.Vector3;
  ticker: string;
  pct: number;
  stage: Stage;
  stageStart: number;
};

const STAR_COUNT = 700;
const STAR_TUNNEL_DEPTH = 26;
const STAR_NEAR_SEED = 1;
const STAR_LATERAL_SPREAD = 6;
const STAR_FAR = 8;
const STAR_MAX_TRAVEL = STAR_TUNNEL_DEPTH - STAR_FAR;
const STAR_INFLUENCE_RADIUS = 2.5; // world units — scaled to this camera, not StarfieldBackdrop's

export function HeroSceneDust() {
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelDotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const labelTagRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const labelMsgRefs = useRef<(HTMLSpanElement | null)[]>([]);

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

    // Each particle's base direction + radius jitter is kept around so a
    // mover can compute a start/target position at that same shell radius.
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

    const starField = createTunnelField({
      count: STAR_COUNT,
      depth: STAR_TUNNEL_DEPTH,
      nearSeed: STAR_NEAR_SEED,
      lateralSpread: STAR_LATERAL_SPREAD,
      pointSize: 0.05,
      opacity: 0.85,
      sprite: circleSprite,
    });
    scene.add(starField.points);

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
    const mouseWorld = { x: 9999, y: 9999, active: false };
    const starFovRad = (camera.fov * Math.PI) / 180;
    function handlePointerMove(e: PointerEvent) {
      const rect = container.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      // Same projection StarfieldBackdrop uses, scaled to this camera —
      // needed for the embedded star field's comet-follow effect.
      const halfHeight = camera.position.z * Math.tan(starFovRad / 2);
      const halfWidth = halfHeight * (rect.width / rect.height);
      mouseWorld.x = pointer.x * halfWidth;
      mouseWorld.y = -pointer.y * halfHeight;
      mouseWorld.active = true;
    }
    function handlePointerLeave() {
      mouseWorld.active = false;
    }
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerout", handlePointerLeave, {
      passive: true,
    });

    let frameId = 0;
    let paused = document.visibilityState === "hidden";

    function handleVisibility() {
      paused = document.visibilityState === "hidden";
      if (!paused && !reduceMotion) frameId = requestAnimationFrame(tick);
    }
    document.addEventListener("visibilitychange", handleVisibility);

    // --- Mover pool -----------------------------------------------------
    const movers: Mover[] = [];
    const usedParticleIndices = new Set<number>();
    const usedLabelIndices = new Set<number>();
    let nextSpawnAt = 0; // set once the clock starts, in tick()
    const posAttr = dustGeometry.attributes.position as THREE.BufferAttribute;
    const colorAttr = dustGeometry.attributes.color as THREE.BufferAttribute;
    const tmpColor = new THREE.Color();
    const worldPos = new THREE.Vector3();

    function freeLabelIndex(): number | null {
      for (let i = 0; i < MAX_CONCURRENT_MOVERS; i++) {
        if (!usedLabelIndices.has(i)) return i;
      }
      return null;
    }

    function spawnMover(now: number) {
      const labelIndex = freeLabelIndex();
      if (labelIndex === null) return;

      let particleIndex: number;
      let attempts = 0;
      do {
        particleIndex = Math.floor(Math.random() * SPHERE_POINT_COUNT);
        attempts += 1;
      } while (usedParticleIndices.has(particleIndex) && attempts < 50);

      let ticker: string;
      attempts = 0;
      do {
        ticker = TICKERS[Math.floor(Math.random() * TICKERS.length)];
        attempts += 1;
      } while (movers.some((m) => m.ticker === ticker) && attempts < 50);

      const [dx, dy, dz] = directions[particleIndex];
      const radius = SPHERE_RADIUS * baseJitters[particleIndex];
      const startPos = new THREE.Vector3(dx, dy, dz).multiplyScalar(radius);

      const [tx, ty, tz] = randomDirection();
      const targetPos = new THREE.Vector3(tx, ty, tz).multiplyScalar(radius);

      const pct = Math.round(randomBetween(-6, 6) * 10) / 10;

      usedParticleIndices.add(particleIndex);
      usedLabelIndices.add(labelIndex);
      movers.push({
        particleIndex,
        labelIndex,
        startPos,
        targetPos,
        ticker,
        pct,
        stage: "drift",
        stageStart: now,
      });
    }

    function retireMover(mover: Mover) {
      usedParticleIndices.delete(mover.particleIndex);
      usedLabelIndices.delete(mover.labelIndex);
      const label = labelRefs.current[mover.labelIndex];
      if (label) label.style.opacity = "0";
    }

    function driftLabel(mover: Mover) {
      return `${mover.ticker} ${mover.pct > 0 ? "+" : ""}${mover.pct}% over target weight`;
    }

    function updateMoversAndLabels(now: number) {
      if (now >= nextSpawnAt && movers.length < MAX_CONCURRENT_MOVERS) {
        spawnMover(now);
        nextSpawnAt =
          now + randomBetween(SPAWN_INTERVAL_MIN_MS, SPAWN_INTERVAL_MAX_MS);
      }

      for (let m = movers.length - 1; m >= 0; m--) {
        const mover = movers[m];
        const elapsed = now - mover.stageStart;
        const label = labelRefs.current[mover.labelIndex];
        const dot = labelDotRefs.current[mover.labelIndex];
        const tag = labelTagRefs.current[mover.labelIndex];
        const msg = labelMsgRefs.current[mover.labelIndex];

        let pos = mover.startPos;
        let opacity = 1;

        if (mover.stage === "drift") {
          const t = Math.min(elapsed / DRIFT_HOLD_MS, 1);
          tmpColor.copy(dustColor).lerp(accent, t);
          colorAttr.setXYZ(
            mover.particleIndex,
            tmpColor.r,
            tmpColor.g,
            tmpColor.b,
          );
          pos = mover.startPos;
          if (tag) tag.textContent = "[DRIFT]";
          if (msg) msg.textContent = driftLabel(mover);
          if (dot) dot.style.backgroundColor = "var(--accent)";
          if (elapsed >= DRIFT_HOLD_MS) {
            mover.stage = "move";
            mover.stageStart = now;
          }
        } else if (mover.stage === "move") {
          const t = easeOutCubic(Math.min(elapsed / MOVE_DURATION_MS, 1));
          pos = mover.startPos.clone().lerp(mover.targetPos, t);
          colorAttr.setXYZ(mover.particleIndex, accent.r, accent.g, accent.b);
          if (tag) tag.textContent = "[ACTION]";
          if (msg) msg.textContent = "rebalancing to target weight";
          if (elapsed >= MOVE_DURATION_MS) {
            mover.stage = "settle";
            mover.stageStart = now;
            pos = mover.targetPos;
          }
        } else {
          const t = Math.min(elapsed / SETTLE_HOLD_MS, 1);
          pos = mover.targetPos;
          tmpColor.copy(accent).lerp(dustColor, t);
          colorAttr.setXYZ(
            mover.particleIndex,
            tmpColor.r,
            tmpColor.g,
            tmpColor.b,
          );
          opacity = 1 - t;
          if (elapsed >= SETTLE_HOLD_MS) {
            retireMover(mover);
            movers.splice(m, 1);
            continue;
          }
        }

        posAttr.setXYZ(mover.particleIndex, pos.x, pos.y, pos.z);

        if (label) {
          worldPos
            .set(pos.x, pos.y, pos.z)
            .applyMatrix4(centerpiece.matrixWorld);
          const projected = worldPos.clone().project(camera);
          if (projected.z > 1) {
            label.style.opacity = "0";
          } else {
            const rect = container.getBoundingClientRect();
            const x = (projected.x * 0.5 + 0.5) * rect.width;
            const y = (-projected.y * 0.5 + 0.5) * rect.height;
            // Offset up and left of the exact point so the pill reads as
            // pointing at the particle rather than centering on top of it.
            label.style.transform = `translate(${x - 14}px, ${y - 46}px)`;
            label.style.opacity = String(opacity);
          }
        }
      }

      posAttr.needsUpdate = true;
      colorAttr.needsUpdate = true;
    }

    function hideAllLabels() {
      labelRefs.current.forEach((label) => {
        if (label) label.style.opacity = "0";
      });
    }

    function tick(now: number) {
      const t = now * 0.001;

      if (nextSpawnAt === 0) {
        nextSpawnAt =
          now + randomBetween(SPAWN_INTERVAL_MIN_MS, SPAWN_INTERVAL_MAX_MS);
      }

      // Gentle tilt toward the cursor, layered on top of the idle spin —
      // the "moving part" reacting to input.
      const tiltX = pointer.y * 0.35;
      const tiltY = pointer.x * 0.45;
      centerpiece.rotation.y = t * 0.18 + tiltY;
      centerpiece.rotation.x = Math.sin(t * 0.25) * 0.15 + tiltX;
      centerpiece.updateMatrixWorld(true);

      updateMoversAndLabels(now);

      const heroTravel =
        Math.min(1, Math.max(0, window.scrollY / window.innerHeight)) *
        STAR_MAX_TRAVEL;
      stepTunnelField(
        starField,
        heroTravel,
        1 / 60,
        t,
        mouseWorld,
        STAR_INFLUENCE_RADIUS,
      );

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

    function reduceMotionHeroTravel() {
      return (
        Math.min(1, Math.max(0, window.scrollY / window.innerHeight)) *
        STAR_MAX_TRAVEL
      );
    }
    function handleScrollStatic() {
      stepTunnelField(
        starField,
        reduceMotionHeroTravel(),
        0,
        0,
        mouseWorld,
        STAR_INFLUENCE_RADIUS,
      );
      composer.render();
    }

    if (reduceMotion) {
      hideAllLabels();
      stepTunnelField(
        starField,
        reduceMotionHeroTravel(),
        0,
        0,
        mouseWorld,
        STAR_INFLUENCE_RADIUS,
      );
      composer.render();
      window.addEventListener("scroll", handleScrollStatic, { passive: true });
    } else {
      frameId = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerLeave);
      window.removeEventListener("scroll", handleScrollStatic);
      document.removeEventListener("visibilitychange", handleVisibility);
      dustGeometry.dispose();
      dustMaterial.dispose();
      disposeTunnelField(starField);
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
      className="pointer-events-none relative h-full w-full"
    >
      {Array.from({ length: MAX_CONCURRENT_MOVERS }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            labelRefs.current[i] = el;
          }}
          className="pointer-events-none absolute left-0 top-0 z-10 flex items-center gap-2.5 whitespace-nowrap rounded-lg border border-border-muted bg-background-elevated/80 px-3.5 py-2.5 opacity-0 backdrop-blur-sm"
          style={{ willChange: "transform, opacity" }}
        >
          <span
            ref={(el) => {
              labelDotRefs.current[i] = el;
            }}
            className="h-1.5 w-1.5 shrink-0 rounded-full"
          />
          <span
            ref={(el) => {
              labelTagRefs.current[i] = el;
            }}
            className="font-mono text-[10px] uppercase tracking-widest text-accent"
          />
          <span
            ref={(el) => {
              labelMsgRefs.current[i] = el;
            }}
            className="font-mono text-xs text-foreground-muted"
          />
        </div>
      ))}
    </div>
  );
}
