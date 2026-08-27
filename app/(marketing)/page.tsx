import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { CapabilitiesGallery } from "@/components/sections/CapabilitiesGallery";
import { StatsSection } from "@/components/sections/StatsSection";
import { SecuritySection } from "@/components/sections/SecuritySection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ManifestoSection } from "@/components/sections/ManifestoSection";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ProblemSection />
      <SolutionSection />
      <CapabilitiesGallery />
      <StatsSection />
      <SecuritySection />
      <FaqSection />
      <ManifestoSection />
    </>
  );
}
