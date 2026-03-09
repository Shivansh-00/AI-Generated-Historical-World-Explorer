import axios from 'axios';
import type { EnvironmentSpec, NPCDialogueRequest } from '../types/world';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api'
});

export const generateWorld = async (prompt: string): Promise<EnvironmentSpec> => {
  const { data } = await api.post('/world/generate', { prompt });
  return data;
};

export const evolveWorld = async (worldId: string, year: number): Promise<EnvironmentSpec> => {
  const { data } = await api.post('/world/evolve', { worldId, year });
  return data;
};

export const getWorld = async (worldId: string): Promise<EnvironmentSpec> => {
  const { data } = await api.get(`/world/${worldId}`);
  return data;
};

export const askNPC = async (payload: NPCDialogueRequest): Promise<{ answer: string }> => {
  const { data } = await api.post('/npc/dialogue', payload);
  return data;
};
