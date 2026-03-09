import { nanoid } from 'nanoid';
import { historicalLookup } from './knowledgeBase.js';
import { NPC_PROMPT, WORLD_PROMPT } from './promptTemplates.js';
import type { EnvironmentSpec } from '../types/world.js';

export const generateEnvironmentFromPrompt = async (prompt: string): Promise<EnvironmentSpec> => {
  const _template = WORLD_PROMPT;
  const draft = historicalLookup(prompt);

  return {
    id: nanoid(),
    prompt,
    time_period: draft.period,
    currentYear: draft.timeline[0],
    environment: draft.environment,
    climate: draft.climate,
    buildings: draft.buildings,
    characters: draft.characters,
    objects: draft.objects,
    timeline: draft.timeline,
    ambienceAudio: '/assets/audio/market-ambience.mp3'
  };
};

export const npcHistoricalResponse = async (context: {
  timePeriod: string;
  year: number;
  environment: string;
  npcName: string;
  question: string;
}) => {
  const _systemPrompt = NPC_PROMPT;
  return `${context.npcName.toUpperCase()} says: In ${context.timePeriod} (${context.year}), this ${context.environment} was vital. ${context.question} connects to trade, governance, and daily rituals of this era.`;
};
