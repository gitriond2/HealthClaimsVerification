// pages/index.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import InfluencerList from '../components/InfluencerList';
import ResearchForm from '../components/ResearchForm';
import Layout from '../components/Layout';
import { fetchInfluencers } from '../services/fetchInfluencers';

export default function Home() {
  const [influencers, setInfluencers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const getInfluencers = async () => {
      try {
        const data = await fetchInfluencers();
        setInfluencers(Array.isArray(data) ? data : []); // Asegurarse de que data es un array
      } catch (error) {
        setError(error);
      }
    };

    getInfluencers();
  }, []);

  useEffect(() => {
    // Este código solo se ejecutará en el lado del cliente
    const cspMetaTag = document.createElement('meta');
    cspMetaTag.httpEquiv = "Content-Security-Policy";
    cspMetaTag.content = "default-src 'self'; img-src 'self' https://localhost:5070;";
    document.head.appendChild(cspMetaTag);
  }, []);

  const filteredInfluencers = Array.isArray(influencers)
    ? influencers.filter(influencer =>
        influencer.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleResearchSubmit = (data) => {
    console.log('Research data:', data);
    // Lógica para manejar la configuración de investigación
  };

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-4">Influenciadores</h1>
      <input
        type="text"
        className="p-2 border border-blue-300 rounded-md w-full mb-4 text-black"
        placeholder="Buscar influenciadores"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="bg-white p-4 rounded-md shadow-md text-black">
        <InfluencerList influencers={filteredInfluencers} />
      </div>
      <ResearchForm onSubmit={handleResearchSubmit} />
      {error && <div className="error">Error: {error.message}</div>}
    </Layout>
  );
}
