import api from './api';

export const fetchInfluencers = async () => {
  try {
    const response = await api.get('/influencers');
    return response.data;
  } catch (error) {
    console.error('Error fetching influencers:', error);
    throw error;
  }
};
