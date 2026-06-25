export type SituationId = 'first' | 'extend' | 'transfer' | 'relapse' | 'additional';

export interface SituationGuide {
  id: SituationId;
  label: string;
  procedure: string;
  benefits: string[];
  description: string;
}

export interface ProcedureCard {
  title: string;
  when: string;
  target?: string;
  description?: string;
  notes?: string[];
}

export interface BenefitCard {
  title: string;
  summary: string;
  details: string[];
}

export interface SupportProgram {
  title: string;
  description: string;
}

export interface SupportStage {
  id: string;
  label: string;
  programs: SupportProgram[];
}

export interface RehabTeam {
  office: string;
  regionKeywords: string[];
  address: string;
  phones: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}
