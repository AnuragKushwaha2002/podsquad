import { pool } from '../config/db.js';

export async function getOrCreateTagIds(tags) {
  const tagIds = [];

  for (const tag of tags) {
    const [existing] = await pool.query('SELECT id FROM tags WHERE name = ?', [tag]);

    let tagId;
    if (existing.length > 0) {
      tagId = existing[0].id;
    } else {
      const [result] = await pool.query('INSERT INTO tags (name) VALUES (?)', [tag]);
      tagId = result.insertId;
    }

    tagIds.push(tagId);
  }

  return tagIds;
}

export async function addTagsToPodcast(podcastId, tags) {
  try {
    const tagIds = await getOrCreateTagIds(tags);
    const values = tagIds.map(tagId => [podcastId, tagId]);

    if (values.length > 0) {
      const placeholders = values.map(() => '(?, ?)').join(', ');
      const flatValues = values.flat();

      await pool.query(
        `INSERT INTO podcast_tags (podcast_id, tag_id) VALUES ${placeholders}`,
        flatValues
      );
    }
  } catch (err) {
    console.error('Error in addTagsToPodcast:', err);
    throw err;
  }
}
