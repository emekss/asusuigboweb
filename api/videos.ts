import type { VercelRequest, VercelResponse } from '@vercel/node';

const VIDEOS_KEY = 'igbo-heritage-videos';

interface Video {
  id: string;
  youtubeUrl: string;
  description: string;
}

// Fallback in-memory storage (only for development/testing)
// Note: This is not persistent across deployments. Set up Vercel KV for production.
let memoryStorage: Video[] = [];

// Helper to get KV instance
async function getKV() {
  try {
    const { kv } = await import('@vercel/kv');
    return kv;
  } catch (error) {
    console.warn('Vercel KV not configured. Using in-memory storage (not persistent).');
    return null;
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const kv = await getKV();

    if (req.method === 'GET') {
      // Get all videos
      if (kv) {
        const videos = await kv.get<Video[]>(VIDEOS_KEY);
        return res.status(200).json(videos || []);
      } else {
        // Fallback to memory storage
        return res.status(200).json(memoryStorage);
      }
    }

    if (req.method === 'POST') {
      // Add a new video
      const { youtubeUrl, description } = req.body;

      if (!youtubeUrl) {
        return res.status(400).json({ error: 'YouTube URL is required' });
      }

      const newVideo: Video = {
        id: Date.now().toString(),
        youtubeUrl: youtubeUrl.trim(),
        description: description?.trim() || '',
      };

      if (kv) {
        const videos = (await kv.get<Video[]>(VIDEOS_KEY)) || [];
        videos.push(newVideo);
        await kv.set(VIDEOS_KEY, videos);
      } else {
        // Fallback to memory storage
        memoryStorage.push(newVideo);
      }

      return res.status(201).json(newVideo);
    }

    if (req.method === 'PUT') {
      // Update a video
      const { id, youtubeUrl, description } = req.body;

      if (!id || !youtubeUrl) {
        return res.status(400).json({ error: 'ID and YouTube URL are required' });
      }

      if (kv) {
        const videos = (await kv.get<Video[]>(VIDEOS_KEY)) || [];
        const videoIndex = videos.findIndex((v) => v.id === id);

        if (videoIndex === -1) {
          return res.status(404).json({ error: 'Video not found' });
        }

        videos[videoIndex] = {
          id,
          youtubeUrl: youtubeUrl.trim(),
          description: description?.trim() || '',
        };

        await kv.set(VIDEOS_KEY, videos);
        return res.status(200).json(videos[videoIndex]);
      } else {
        // Fallback to memory storage
        const videoIndex = memoryStorage.findIndex((v) => v.id === id);
        if (videoIndex === -1) {
          return res.status(404).json({ error: 'Video not found' });
        }
        memoryStorage[videoIndex] = {
          id,
          youtubeUrl: youtubeUrl.trim(),
          description: description?.trim() || '',
        };
        return res.status(200).json(memoryStorage[videoIndex]);
      }
    }

    if (req.method === 'DELETE') {
      // Delete a video
      const { id } = req.query;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Video ID is required' });
      }

      if (kv) {
        const videos = (await kv.get<Video[]>(VIDEOS_KEY)) || [];
        const filteredVideos = videos.filter((v) => v.id !== id);
        await kv.set(VIDEOS_KEY, filteredVideos);
      } else {
        // Fallback to memory storage
        memoryStorage = memoryStorage.filter((v) => v.id !== id);
      }

      return res.status(200).json({ message: 'Video deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

