import { pool } from '../config/db.js';

// Function to create a new podcast (without tags)
export async function createPodcast({ title, description, image_url, userId }) {
  const [result] = await pool.query(
    `INSERT INTO podcasts (title, description, image_url, created_by)
     VALUES (?, ?, ?, ?)`,
    [title, description, image_url, userId]
  );
  return result.insertId;
}
