import express from 'express';
import { register, login, logout, getCurrentUser, refreshAccessToken } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me',verifyToken, getCurrentUser);
router.post('/refresh', refreshAccessToken);

export default router;
