import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import worldRoutes from './routes/worldRoutes.js';
import npcRoutes from './routes/npcRoutes.js';
import { config } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './utils/logger.js';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok', env: config.nodeEnv }));
app.use('/api/world', worldRoutes);
app.use('/api/npc', npcRoutes);

app.use(errorHandler);

app.listen(config.port, () => {
  logger.info(`RealityArchive API listening on ${config.port}`);
});
