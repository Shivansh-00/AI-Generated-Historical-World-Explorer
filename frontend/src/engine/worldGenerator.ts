import type { EnvironmentSpec } from '../types/world';
import { WORLD_SETTINGS } from '../constants/worldConfig';
import { generateCityLayout } from './cityGenerator';
import { spawnNPCs } from './npcManager';

export const generateWorldState = (world: EnvironmentSpec) => {
  const city = generateCityLayout(world);
  const npcs = spawnNPCs(world.characters).slice(0, WORLD_SETTINGS.npcCount);

  const isNight = Math.abs(world.currentYear) % 2 === 0;
  const groundColor = world.climate === 'arid' ? '#b08968' : world.climate === 'tropical' ? '#2f855a' : '#3f7f4c';

  return {
    city,
    npcs,
    terrainSize: WORLD_SETTINGS.terrainSize,
    lighting: {
      ambientIntensity: isNight ? 0.15 : 0.45,
      directionalIntensity: isNight ? 0.4 : 1.2,
      sunPosition: isNight ? [0, -1, 0] as [number, number, number] : [100, 20, 100] as [number, number, number]
    },
    groundColor
  };
};
