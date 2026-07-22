export type NavLink = {
  label: string;
  href: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type StepItem = {
  index: string;
  title: string;
  description: string;
};

export type IntegrationItem = {
  name: string;
};

export type SecurityBadge = {
  title: string;
  description: string;
};

export type WhitepaperSection = {
  index: string;
  id: string;
  label: string;
  paragraphs: string[];
};

export type RoadmapStatus = "done" | "current" | "upcoming";

export type RoadmapMilestone = {
  id: string;
  quarter: string;
  title: string;
  description: string;
  status: RoadmapStatus;
};
