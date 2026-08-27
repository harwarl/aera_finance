import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { CapabilitiesGallery } from "@/components/sections/CapabilitiesGallery";
import { StatsSection } from "@/components/sections/StatsSection";
import { SecuritySection } from "@/components/sections/SecuritySection";
import { TickerBand } from "@/components/sections/TickerBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { TexturedBand } from "@/components/shared/TexturedBand";

export default function Home() {
  return (
    <>
      <Hero />
      {/* <TexturedBand /> */}
      <TrustBar />
      {/* <TexturedBand /> */}
      <ProblemSection />
      {/* <TexturedBand /> */}
      <SolutionSection />
      {/* <TexturedBand /> */}
      <CapabilitiesGallery />
      {/* <TexturedBand /> */}
      <StatsSection />
      {/* <TexturedBand /> */}
      <SecuritySection />
      {/* <TickerBand /> */}
      <FaqSection />
      <ManifestoSection />
    </>
  );
}
