import { Hero } from "@/components/sections/Hero";
import { IntegrationStrip } from "@/components/sections/IntegrationStrip";
import { ProtocolMetrics } from "@/components/sections/ProtocolMetrics";
import { ProblemFraming } from "@/components/sections/ProblemFraming";
import { AtlasPlatform } from "@/components/sections/AtlasPlatform";
import { LiveDemo } from "@/components/sections/LiveDemo";
import { DecisionStack } from "@/components/sections/DecisionStack";
import { FlightToSafety } from "@/components/sections/FlightToSafety";
import { FaqSection } from "@/components/sections/FaqSection";
import { ManifestoSection } from "@/components/sections/ManifestoSection";

export default function Home() {
  return (
    <>
      <Hero />
      <IntegrationStrip />
      <ProblemFraming />
      <AtlasPlatform />
      <LiveDemo />
      <DecisionStack />
      <FlightToSafety />
      <ProtocolMetrics />
      <FaqSection />
      <ManifestoSection />
    </>
  );
}
