// pages/research.js
import React, { useState } from 'react';
import api from '../services/api';

const ResearchPage = () => {
  const [claims, setClaims] = useState([]);
  const [error, setError] = useState(null);

  const verifyClaims = async (claims) => {
    try {
      console.log('Sending claims:', claims); // Añadir log
      const response = await fetch('https://localhost:5001/api/verify-claims', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`
        },
        body: JSON.stringify({ claims })
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        console.log('Error response:', errorMessage); // Añadir log
        throw new Error(`Error verifying claims: ${errorMessage}`);
      }
      const data = await response.json();
      console.log('Verified claims:', data); // Añadir log
      return data;
    } catch (error) {
      console.error("Error in verifyClaims:", error);
      throw error;
    }
  };

  const handleResearchClick = async () => {
    try {
      const data = await verifyClaims(claims);
      console.log(data);
      // Aquí puedes actualizar el estado con los datos verificados
      // setClaims(data);
    } catch (error) {
      console.error('Error during Axios request:', error);
      setError(error); // Guardar el error en el estado para mostrarlo
    }
  };

  return (
    <div>
      <button onClick={handleResearchClick}>Research</button>
      {error && <div className="error">Error: {error.message}</div>}
      <div>
        {/* Mostrar los claims verificados o lo que necesites aquí */}
      </div>
    </div>
  );
};

export default ResearchPage;

