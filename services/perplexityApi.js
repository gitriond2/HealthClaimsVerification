/* // services/perplexityApi.js
import axios from 'axios';

const perplexityApi = axios.create({
  baseURL: 'https://api.perplexity.ai', // URL base de la API de Perplexity
  headers: {
    'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`, // Agregar tu clave API
    'Content-Type': 'application/json'
  }
});

export const fetchInfluencerContent = async (influencerName) => {
  const options = {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
      'Content-Type': 'application/json'
    },
    data: {
      model: "llama-3.1-sonar-small-128k-online",
      messages: [
        { role: "system", content: "Be precise and concise." },
        { role: "user", content: `Find recent health-related content from ${influencerName}.` }
      ],
      max_tokens: 1024,
      temperature: 0.2,
      top_p: 0.9,
      search_domain_filter: ["perplexity.ai"],
      return_images: false,
      return_related_questions: false,
      search_recency_filter: "month",
      top_k: 0,
      stream: false,
      presence_penalty: 0,
      frequency_penalty: 1
    }
  };
  
  try {
    const response = await axios.post('https://api.perplexity.ai/chat/completions', options.data, { headers: options.headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching influencer content:', error);
    return null;
  }
};

export default perplexityApi;
 */

