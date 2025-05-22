// src/middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';
const { verify, sign } = jwt;
import dotenv from 'dotenv';
dotenv.config();

const authenticate = (req, res, next) => {
  const bearerToken = req.headers.authorization?.split(' ')[1];
  const cookieToken = req.cookies?.token;
  const token = bearerToken || cookieToken;

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export default authenticate;
