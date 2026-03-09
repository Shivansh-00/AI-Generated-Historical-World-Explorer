import { generateEnvironmentFromPrompt } from '../ai/llmClient.js';
import { getWorld, saveWorld } from '../database/worldRepository.js';

const yearLabel = (year: number) => (year < 0 ? `${Math.abs(year)} BCE` : `${year} AD`);

export const createWorld = async (prompt: string) => {
  const world = await generateEnvironmentFromPrompt(prompt);
  return saveWorld(world);
};

export const fetchWorldById = async (worldId: string) => {
  return getWorld(worldId) ?? null;
};

export const evolveWorldByYear = async (worldId: string, year: number) => {
  const world = getWorld(worldId);
  if (!world) return null;

  const modernization = year > 1000 ? ['stone_arch'] : world.buildings;
  const evolved = {
    ...world,
    currentYear: year,
    time_period: `${world.environment} around ${yearLabel(year)}`,
    buildings: modernization,
    objects: year > 1000 ? [...new Set([...world.objects, 'caravan_route'])] : world.objects
  };

  return saveWorld(evolved);
};
