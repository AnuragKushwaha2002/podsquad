import { createPodcast } from '../models/podcastModel.js';
import { addPodcastHost } from '../models/podcastMemberModel.js';
import { addTagsToPodcast } from '../models/podcastTagModel.js';

export async function createPodcastController(req, res) {
  const { title, description, image_url, tags } = req.body;
  const userId = req.user.id;

  try {
    const podcastId = await createPodcast({ title, description, image_url, userId });
    await addPodcastHost({ podcastId, userId });

    if (Array.isArray(tags) && tags.length > 0) {
      await addTagsToPodcast(podcastId, tags);
    }

    res.status(201).json({
      message: 'Podcast created successfully',
      podcastId,
    });
  } catch (err) {
    console.error('Create Podcast Error:', err);
    res.status(500).json({ message: 'Server error while creating podcast' });
  }
}
