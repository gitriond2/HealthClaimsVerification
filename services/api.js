// services/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:5070/api', // URL del backend
  headers: {
    'Authorization': `Bearer ${process.env.GEMINI_API_KEY}` // Usa la clave desde el archivo .env
  }
});

export default api;



