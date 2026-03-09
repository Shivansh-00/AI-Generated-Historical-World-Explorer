import type { Request, Response } from 'express';
import { z } from 'zod';
import { askNPCQuestion } from '../services/npcService.js';

const dialogueSchema = z.object({
  worldId: z.string().min(1),
  npcName: z.string().min(1),
  question: z.string().min(1)
});

export const npcDialogue = async (req: Request, res: Response) => {
  const parsed = dialogueSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const response = await askNPCQuestion(parsed.data.worldId, parsed.data.npcName, parsed.data.question);
  if (!response) return res.status(404).json({ error: 'World not found' });
  return res.json(response);
};
