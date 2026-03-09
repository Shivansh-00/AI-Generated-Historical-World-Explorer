import { Router } from 'express';
import { evolveWorld, generateWorld, getWorld } from '../controllers/worldController.js';

const router = Router();
router.post('/generate', generateWorld);
router.post('/evolve', evolveWorld);
router.get('/:worldId', getWorld);

export default router;
