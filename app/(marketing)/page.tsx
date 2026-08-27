import { Hero } from "@/components/sections/Hero";
import { ProtocolMetrics } from "@/components/sections/ProtocolMetrics";
import { ProblemFraming } from "@/components/sections/ProblemFraming";
import { HowItWorksSteps } from "@/components/sections/HowItWorksSteps";
import { LiveDemo } from "@/components/sections/LiveDemo";
import { DecisionStack } from "@/components/sections/DecisionStack";
import { FlightToSafety } from "@/components/sections/FlightToSafety";
import { AutonomyModes } from "@/components/sections/AutonomyModes";
import { StatsBig } from "@/components/sections/StatsBig";
import { FaqSection } from "@/components/sections/FaqSection";
import { ManifestoSection } from "@/components/sections/ManifestoSection";

export default function Home() {
  return (
    <>
      <Hero />
      <ProtocolMetrics />
      <ProblemFraming />
      <HowItWorksSteps />
      <LiveDemo />
      <DecisionStack />
      <FlightToSafety />
      <AutonomyModes />
      <StatsBig />
      <FaqSection />
      <ManifestoSection />
    </>
  );
}
