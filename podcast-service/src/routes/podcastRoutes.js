// src/routes/podcastRoutes.js
import { Router } from 'express';
const router = Router();
import { createPodcastController } from '../controllers/podcastController.js';
import authenticate from '../middlewares/authMiddleware.js';

router.post('/', authenticate, createPodcastController);

export default router;
