import { useMutation } from '@tanstack/react-query';
import { askNPC, evolveWorld, generateWorld } from '../services/api';

export const useWorldGeneration = () => useMutation({
  mutationFn: (prompt: string) => generateWorld(prompt)
});

export const useWorldEvolution = () => useMutation({
  mutationFn: ({ worldId, year }: { worldId: string; year: number }) => evolveWorld(worldId, year)
});

export const useNPCDialogue = () => useMutation({
  mutationFn: askNPC
});
