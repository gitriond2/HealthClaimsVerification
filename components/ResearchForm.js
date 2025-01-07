// components/ResearchForm.js
import React, { useState } from 'react';
import backendApi from '../services/backendApi';
import { verifyClaims } from '../services/geminiApi';

const ResearchForm = ({ onSubmit }) => {
  const [timeRange, setTimeRange] = useState('Last Week');
  const [influencerName, setInfluencerName] = useState('');
  const [claimsToAnalyze, setClaimsToAnalyze] = useState(50);
  const [productsToFind, setProductsToFind] = useState(10);
  const [includeRevenueAnalysis, setIncludeRevenueAnalysis] = useState(false);
  const [verifyWithJournals, setVerifyWithJournals] = useState(false);
  const [searchResults, setSearchResults] = useState([]); // Nuevo estado para resultados de búsqueda

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Log data at different points for debugging
    console.log("Form submitted");
    console.log("Current state values:", {
      timeRange,
      influencerName,
      claimsToAnalyze,
      productsToFind,
      includeRevenueAnalysis,
      verifyWithJournals
    });

    // Aquí puedes realizar la verificación directamente con la API de Gemini
    const dummyData = {
      influencers: [
        { name: influencerName, followers: 1000 },
        { name: `${influencerName}2`, followers: 2000 },
      ],
      claims: [
        { text: 'Claim 1', category: 'Health' },
        { text: 'Claim 2', category: 'Fitness' },
      ],
    };
    
    // Log dummy data
    console.log("Dummy data:", dummyData);

    setSearchResults(dummyData.influencers); // Actualizar resultados de búsqueda
    
    const verifiedClaims = await verifyClaims(dummyData.claims); // Verificar afirmaciones
    
    // Log verified claims
    console.log("Verified claims:", verifiedClaims);

    if (verifiedClaims) {
      onSubmit({
        timeRange,
        influencerName,
        claimsToAnalyze,
        productsToFind,
        includeRevenueAnalysis,
        verifyWithJournals,
        influencerContent: dummyData,
        verifiedClaims
      });

      // También puedes llamar a tu backend local si es necesario
      await backendApi.post('/route', { data: verifiedClaims });
      
      // Log post request
      console.log("Data sent to backend API:", verifiedClaims);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex space-x-4 p-6 bg-blue-100 shadow-md rounded-md mt-6">
        <div className="w-1/2">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Specific Influencer</h2>
          <div className="flex flex-col space-y-2">
            <label className="font-semibold text-blue-900">Time Range:</label>
            <select className="p-2 border border-blue-300 rounded-md" value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
              <option value="Last Week">Last Week</option>
              <option value="Last Month">Last Month</option>
              <option value="Last Year">Last Year</option>
              <option value="All Time">All Time</option>
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-semibold text-blue-900">Influencer Name:</label>
            <input
              type="text"
              className="p-2 border border-blue-300 rounded-md"
              value={influencerName}
              onChange={(e) => setInfluencerName(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-semibold text-blue-900">Claims to Analyze:</label>
            <input
              type="number"
              className="p-2 border border-blue-300 rounded-md"
              value={claimsToAnalyze}
              onChange={(e) => setClaimsToAnalyze(e.target.value)}
            />
          </div>
        </div>
        <div className="w-1/2">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Discover New</h2>
          <div className="flex flex-col space-y-2">
            <label className="font-semibold text-blue-900">Products to Find Per Influencer:</label>
            <input
              type="number"
              className="p-2 border border-blue-300 rounded-md"
              value={productsToFind}
              onChange={(e) => setProductsToFind(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="font-semibold text-blue-900">Include Revenue Analysis:</label>
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={includeRevenueAnalysis}
              onChange={(e) => setIncludeRevenueAnalysis(e.target.checked)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="font-semibold text-blue-900">Verify with Scientific Journals:</label>
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={verifyWithJournals}
              onChange={(e) => setVerifyWithJournals(e.target.checked)}
            />
          </div>
          <button type="submit" className="p-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">+ Start Research</button>
        </div>
      </form>
      <div className="mt-6">
        <h3 className="text-2xl font-bold mb-4">Search Results</h3>
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((influencer, index) => (
              <li key={index} className="p-2 border border-blue-300 rounded-md mb-2">
                {influencer.name} - {influencer.followers} seguidores
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </>
  );
};

export default ResearchForm;
