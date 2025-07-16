
export type View = 'dashboard' | 'prd';

export interface TechInfo {
  techStack: string[];
  description: string;
}

export interface Architecture {
  overview: string;
  frontend: TechInfo;
  backend: TechInfo;
  database: TechInfo;
  deployment: TechInfo;
}

export interface Scalability {
  title: string;
  points: string[];
}

export interface Security {
  title: string;
  points: string[];
}

export interface CostBreakdown {
  category: string;
  cost: number;
  details: string;
}

export interface CostEstimation {
  title: string;
  breakdown: CostBreakdown[];
  freeAlternatives?: string[]; // New field for free alternatives
}

export interface ChartDataItem {
  name: string;
  value: number;
  details: string;
}

export interface RoadmapPhase {
  phase: string;
  duration: string;
  tasks: string[];
}

export interface UserPersona {
    name: string;
    description: string;
}

export interface Feature {
    title: string;
    description: string;
    userStories: string[];
}

export interface NonFunctionalRequirement {
    type: string;
    details: string;
}

export interface PRD {
    introduction: string;
    userPersonas: UserPersona[];
    features: Feature[];
    nonFunctionalRequirements: NonFunctionalRequirement[];
}

export interface ArchitectureData {
  projectName: string;
  projectSummary: string;
  architecture: Architecture;
  scalability: Scalability;
  security: Security;
  costEstimation: CostEstimation;
  roadmap: RoadmapPhase[];
  prd: PRD;
}