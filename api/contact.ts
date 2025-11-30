import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from 'redis';

const CONTACT_SUBMISSIONS_KEY = 'igbo-heritage-contact-submissions';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: number;
  read: boolean;
}

// Fallback in-memory storage
let memoryStorage: ContactSubmission[] = [];

// Helper to get Redis client
async function getRedis() {
  try {
    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) {
      console.warn('REDIS_URL not configured. Using in-memory storage (not persistent).');
      return null;
    }

    const client = createClient({ url: redisUrl });
    await client.connect();
    return client;
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
    console.warn('Falling back to in-memory storage (not persistent).');
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

  let redis: ReturnType<typeof createClient> | null = null;

  try {
    redis = await getRedis();

    if (req.method === 'POST') {
      // Submit a new contact form
      const { name, email, subject, message } = req.body;

      if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const submission: ContactSubmission = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        timestamp: Date.now(),
        read: false,
      };

      if (redis) {
        const submissionsJson = await redis.get(CONTACT_SUBMISSIONS_KEY);
        const submissions = submissionsJson ? JSON.parse(submissionsJson) : [];
        submissions.unshift(submission); // Add to beginning
        await redis.set(CONTACT_SUBMISSIONS_KEY, JSON.stringify(submissions));
      } else {
        memoryStorage.unshift(submission);
      }

      return res.status(201).json({ message: 'Contact form submitted successfully', id: submission.id });
    }

    if (req.method === 'GET') {
      // Get all contact submissions
      if (redis) {
        const submissionsJson = await redis.get(CONTACT_SUBMISSIONS_KEY);
        const submissions = submissionsJson ? JSON.parse(submissionsJson) : [];
        return res.status(200).json(submissions);
      } else {
        return res.status(200).json(memoryStorage);
      }
    }

    if (req.method === 'PUT') {
      // Mark submission as read
      const { id, read } = req.body;

      if (!id || typeof read !== 'boolean') {
        return res.status(400).json({ error: 'ID and read status are required' });
      }

      if (redis) {
        const submissionsJson = await redis.get(CONTACT_SUBMISSIONS_KEY);
        const submissions = submissionsJson ? JSON.parse(submissionsJson) : [];
        const submissionIndex = submissions.findIndex((s: ContactSubmission) => s.id === id);

        if (submissionIndex === -1) {
          return res.status(404).json({ error: 'Submission not found' });
        }

        submissions[submissionIndex].read = read;
        await redis.set(CONTACT_SUBMISSIONS_KEY, JSON.stringify(submissions));
        return res.status(200).json(submissions[submissionIndex]);
      } else {
        const submissionIndex = memoryStorage.findIndex((s) => s.id === id);
        if (submissionIndex === -1) {
          return res.status(404).json({ error: 'Submission not found' });
        }
        memoryStorage[submissionIndex].read = read;
        return res.status(200).json(memoryStorage[submissionIndex]);
      }
    }

    if (req.method === 'DELETE') {
      // Delete a submission
      const { id } = req.query;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Submission ID is required' });
      }

      if (redis) {
        const submissionsJson = await redis.get(CONTACT_SUBMISSIONS_KEY);
        const submissions = submissionsJson ? JSON.parse(submissionsJson) : [];
        const filteredSubmissions = submissions.filter((s: ContactSubmission) => s.id !== id);
        await redis.set(CONTACT_SUBMISSIONS_KEY, JSON.stringify(filteredSubmissions));
      } else {
        memoryStorage = memoryStorage.filter((s) => s.id !== id);
      }

      return res.status(200).json({ message: 'Submission deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  } finally {
    if (redis) {
      try {
        await redis.quit();
      } catch (error) {
        console.error('Error closing Redis connection:', error);
      }
    }
  }
}

