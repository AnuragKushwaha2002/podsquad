// src/models/podcastMemberModel.js
import { pool } from '../config/db.js';

// Function to add a user as host to a podcast
export async function addPodcastHost({ podcastId, userId }) {
  await pool.query(
    `INSERT INTO podcast_members (podcast_id, user_id, role)
     VALUES (?, ?, 'host')`,
    [podcastId, userId]
  );
}
