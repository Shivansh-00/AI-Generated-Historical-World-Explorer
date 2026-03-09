import type { CharacterType } from '../types/world';

export interface NPCSpawn {
  id: string;
  name: CharacterType;
  position: [number, number, number];
}

export const spawnNPCs = (characters: CharacterType[]): NPCSpawn[] => {
  return characters.map((name, index) => ({
    id: `${name}-${index}`,
    name,
    position: [index * 2.4 - 6, 1, -5 - (index % 2)]
  }));
};
