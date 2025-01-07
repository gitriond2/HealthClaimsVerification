// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.perplexity.ai', // URL base de la API de Perplexity
  headers: {
    'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}` // Agregar tu clave API
  }
});

export const fetchInfluencerContent = async (influencerName) => {
  try {
    const response = await api.get(`/search`, {
      params: {
        q: `from:${influencerName} health`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching influencer content:', error);
    return null;
  }
};

export default api;
