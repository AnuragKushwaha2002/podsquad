// src/app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import podcastRoutes from './routes/podcastRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/podcasts', podcastRoutes);

export default app;
