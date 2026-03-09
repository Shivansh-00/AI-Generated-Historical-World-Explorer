import { npcHistoricalResponse } from '../ai/llmClient.js';
import { getWorld } from '../database/worldRepository.js';

export const askNPCQuestion = async (worldId: string, npcName: string, question: string) => {
  const world = getWorld(worldId);
  if (!world) return null;

  const answer = await npcHistoricalResponse({
    timePeriod: world.time_period,
    year: world.currentYear,
    environment: world.environment,
    npcName,
    question
  });

  return { answer };
};
