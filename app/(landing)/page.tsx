import { sx } from "@/components/aera/sx";
import { Hero } from "@/components/landing/Hero";
import { Faq, SceneAutonomy } from "@/components/landing/Interactive";
import { Nav, SceneDrift, SceneGuardrails, SceneVault, SceneYield } from "@/components/landing/Scenes";
import { Community, Footer, SceneAgent, SceneComingNext, SceneSecurity } from "@/components/landing/Scenes2";

// Translated from reference/Aera-Landing.dc.html (BUILD.md §4).
export default function LandingPage() {
  return (
    <div style={sx("--f: min(100vh, 900px); width: 100%; min-height: 100%; background: #04070A; color: #E6EEEC; overflow-x: clip; position: relative")}>
      {/* FILM TEXTURE: grain + vignette, fixed over everything */}
      <div aria-hidden="true" style={sx("position: fixed; inset: -60px; z-index: 90; pointer-events: none; opacity: 0.14; mix-blend-mode: overlay; animation: cin-grain 0.7s steps(5) infinite")}>
        <svg width="100%" height="100%">
          <filter id="aera-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#aera-grain)" />
        </svg>
      </div>
      <div aria-hidden="true" style={sx("position: fixed; inset: 0; z-index: 89; pointer-events: none; background: radial-gradient(120% 90% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.6) 100%)")} />

      <Nav />
      <main>
        <Hero />
        <SceneVault />
        <SceneYield />
        <SceneDrift />
        <SceneGuardrails />
        <SceneAutonomy />
        <SceneAgent />
        <SceneComingNext />
        <SceneSecurity />
        <Community />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
