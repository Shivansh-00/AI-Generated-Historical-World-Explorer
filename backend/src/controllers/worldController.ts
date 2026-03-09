import type { Request, Response } from 'express';
import { z } from 'zod';
import { createWorld, evolveWorldByYear, fetchWorldById } from '../services/worldService.js';

const worldPromptSchema = z.object({ prompt: z.string().min(3) });
const evolveSchema = z.object({ worldId: z.string().min(1), year: z.number() });

export const generateWorld = async (req: Request, res: Response) => {
  const parsed = worldPromptSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const world = await createWorld(parsed.data.prompt);
  return res.json(world);
};

export const getWorld = async (req: Request, res: Response) => {
  const world = await fetchWorldById(req.params.worldId);
  if (!world) return res.status(404).json({ error: 'World not found' });
  return res.json(world);
};

export const evolveWorld = async (req: Request, res: Response) => {
  const parsed = evolveSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const world = await evolveWorldByYear(parsed.data.worldId, parsed.data.year);
  if (!world) return res.status(404).json({ error: 'World not found' });
  return res.json(world);
};
