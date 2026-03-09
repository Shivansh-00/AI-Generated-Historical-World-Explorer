import { Router } from 'express';
import { npcDialogue } from '../controllers/npcController.js';

const router = Router();
router.post('/dialogue', npcDialogue);

export default router;
