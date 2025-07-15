
export enum ArchitectureType {
  MICROSERVICES = 'Microservices',
  MONOLITHIC = 'Monolithic',
  SERVERLESS = 'Serverless',
  EVENT_DRIVEN = 'Event-Driven',
  SOA = 'Service-Oriented Architecture'
}

export interface TechStack {
  frontend: string[];
  backend: string[];
  database: string[];
  devops: string[];
  messaging?: string[];
}

export interface ArchitectureResponse {
  overview: string;
  techStack: TechStack;
  pros: string[];
  cons: string[];
  scalability: string;
  security: string;
  diagram: string;
}
