export interface EnvironmentSpec {
  id: string;
  prompt: string;
  time_period: string;
  currentYear: number;
  environment: string;
  climate: 'arid' | 'temperate' | 'tropical';
  buildings: string[];
  characters: string[];
  objects: string[];
  timeline: number[];
  ambienceAudio: string;
}
