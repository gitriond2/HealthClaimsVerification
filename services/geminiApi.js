// services/geminiApi.js
import axios from 'axios';
import https from 'https';

const agent = new https.Agent({
  rejectUnauthorized: false
});

export const verifyClaims = async (claims) => {
  try {
    console.log("Claims to verify:", claims); // Log claims before sending to API
    
    const response = await axios.post('https://localhost:5070/api/verify-claims', { claims }, { httpsAgent: agent });

    // Log response status
    console.log("Response status:", response.status);

    if (response.status !== 200) {
      console.error("Error message from server:", response.data); // Log error message from server
      throw new Error(`Error verifying claims: ${response.data}`);
    }

    const data = response.data;
    console.log("Data received from server:", data); // Log the data received from the server
    return data;
  } catch (error) {
    console.error("Error in verifyClaims:", error);
    throw error;
  }
};

