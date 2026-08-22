export type PortfolioLanguage = "zh" | "en";

export type EvidenceItem = {
  value: string;
  label: string;
  placeholder?: boolean;
};

export type CaseStudy = {
  id: string;
  slug: string;
  number: string;
  status: string;
  title: string;
  summary: string;
  role: string;
  period: string;
  problems: string[];
  decision: string;
  evidence: EvidenceItem[];
  sections: {
    challenge: string[];
    ownership: string[];
    decisions: string[];
    system: string[];
    results: string[];
    reflection: string[];
    next: string[];
  };
  links: { label: string; url: string }[];
  needed: string[];
};

export type LabProject = {
  id: string;
  title: string;
  status: string;
  summary: string;
  stack: string[];
  url?: string;
  urlLabel?: string;
  needed: string[];
};

export type PortfolioCopy = {
  nav: {
    home: string;
    cases: string;
    lab: string;
    research: string;
    ai: string;
  };
  hero: {
    name: string;
    title: string;
    summary: string;
    location: string;
    primaryCta: string;
    secondaryCta: string;
  };
  metrics: EvidenceItem[];
  capabilities: {
    id: string;
    title: string;
    description: string;
  }[];
  skills: {
    heading: string;
    groups: {
      label: string;
      items: string[];
    }[];
  };
  credentials: {
    heading: string;
    groups: {
      label: string;
      items: string[];
    }[];
  };
  cases: {
    heading: string;
    intro: string;
    viewAll: string;
    viewCase: string;
    labels: {
      role: string;
      problem: string;
      decision: string;
      evidence: string;
    };
    items: CaseStudy[];
  };
  experience: {
    heading: string;
    intro?: string;
    positions: {
      company: string;
      role: string;
      duration: string;
      highlights: string[];
    }[];
  };
  lab: {
    heading: string;
    intro: string;
    viewAll: string;
    open: string;
    unavailable: string;
    items: LabProject[];
  };
  research: {
    eyebrow: string;
    heading: string;
    summary: string;
    education: {
      school: string;
      degree: string;
      field: string;
      duration: string;
      detail?: string;
    }[];
    intro: string;
    highlights: string[];
    viewAll: string;
    verificationNote: string;
  };
  closing: {
    text: string;
    resume: string;
    email: string;
    resumeNote: string;
  };
  casePage: {
    back: string;
    challenge: string;
    ownership: string;
    decisions: string;
    system: string;
    results: string;
    reflection: string;
    next: string;
    evidence: string;
    links: string;
    needed: string;
    placeholder: string;
  };
};
