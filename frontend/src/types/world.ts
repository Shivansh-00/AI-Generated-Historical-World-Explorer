export type BuildingType = 'roman_shop' | 'stone_arch' | 'temple' | 'mud_brick_house' | 'fort_wall';
export type CharacterType = 'merchant' | 'soldier' | 'citizen' | 'scribe' | 'artisan';

export interface EnvironmentSpec {
  id: string;
  prompt: string;
  time_period: string;
  currentYear: number;
  environment: string;
  climate: 'arid' | 'temperate' | 'tropical';
  buildings: BuildingType[];
  characters: CharacterType[];
  objects: string[];
  timeline: number[];
  ambienceAudio: string;
}

export interface NPCDialogueRequest {
  worldId: string;
  npcName: string;
  question: string;
}
