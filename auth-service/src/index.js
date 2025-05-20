import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';

dotenv.config();
const app = express();

// ✅ CORS first
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// ✅ Then JSON parsing
app.use(express.json());

// ✅ Then your routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});
