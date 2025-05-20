import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../models/userModel.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await findUserByEmail(email);
  if (existing) return res.status(400).json({ message: 'Email already registered' });

  const hashed = await bcrypt.hash(password, 10);
  const userId = await createUser(name, email, hashed);

  res.status(201).json({ userId, message: 'User registered' });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
};
