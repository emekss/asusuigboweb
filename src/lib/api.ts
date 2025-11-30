const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export interface Video {
  id: string;
  youtubeUrl: string;
  description: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: number;
  read: boolean;
}

export const videoApi = {
  async getAll(): Promise<Video[]> {
    const response = await fetch(`${API_BASE_URL}/videos`);
    if (!response.ok) {
      throw new Error('Failed to fetch videos');
    }
    return response.json();
  },

  async create(video: Omit<Video, 'id'>): Promise<Video> {
    const response = await fetch(`${API_BASE_URL}/videos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(video),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to create video' }));
      throw new Error(error.error || 'Failed to create video');
    }
    return response.json();
  },

  async update(id: string, video: Omit<Video, 'id'>): Promise<Video> {
    const response = await fetch(`${API_BASE_URL}/videos`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, ...video }),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to update video' }));
      throw new Error(error.error || 'Failed to update video');
    }
    return response.json();
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/videos?id=${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to delete video' }));
      throw new Error(error.error || 'Failed to delete video');
    }
  },
};

export const contactApi = {
  async submit(submission: Omit<ContactSubmission, 'id' | 'timestamp' | 'read'>): Promise<{ message: string; id: string }> {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submission),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to submit contact form' }));
      throw new Error(error.error || 'Failed to submit contact form');
    }
    return response.json();
  },

  async getAll(): Promise<ContactSubmission[]> {
    const response = await fetch(`${API_BASE_URL}/contact`);
    if (!response.ok) {
      throw new Error('Failed to fetch contact submissions');
    }
    return response.json();
  },

  async markAsRead(id: string, read: boolean): Promise<ContactSubmission> {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, read }),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to update submission' }));
      throw new Error(error.error || 'Failed to update submission');
    }
    return response.json();
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/contact?id=${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to delete submission' }));
      throw new Error(error.error || 'Failed to delete submission');
    }
  },
};

