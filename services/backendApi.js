// services/backendApi.js
import axios from 'axios';
import https from 'https';

const agent = new https.Agent({
  rejectUnauthorized: false
});

const backendApi = axios.create({
  baseURL: 'https://localhost:5070/api', // URL del backend
  httpsAgent: agent
});

export default backendApi;

