// services/verification.js
import axios from 'axios';

const openaiApi = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
  }
});

export const verifyClaims = async (claims) => {
  try {
    const response = await openaiApi.post('/engines/davinci-codex/completions', {
      prompt: `Compare the following health claims with scientific publications and determine their verification status and confidence score. Return the results as JSON.\n\nClaims: ${JSON.stringify(claims)}`,
      max_tokens: 1024
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error verifying claims:', error);
    return null;
  }
};
