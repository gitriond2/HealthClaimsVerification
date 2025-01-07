// pages/influencer/[id].js
import React from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';

const InfluencerProfile = () => {
  const router = useRouter();
  const { id } = router.query;

  // Simulando datos del influenciador
  const influencer = {
    id: id,
    name: 'Andrew Huberman',
    specializations: [
      'Neuroscience', 'Sleep', 'Performance', 'Hormones', 'Stress Management', 'Exercise Science', 'Light Exposure', 'Circadian Biology'
    ],
    description: 'Stanford Professor of Neurobiology and Ophthalmology, focusing on neural development, brain plasticity, and neural regeneration. Host of the Huberman Lab Podcast, translating neuroscience into practical tools for everyday life. Known for evidence-based approaches to performance, sleep, stress management, and brain optimization.',
    trustScore: 89,
    verifiedClaims: 127,
    yearlyRevenue: '$5.0M',
    products: 1,
    followers: '4.2M+',
    claims: [
      {
        date: '14/01/2024',
        status: 'Verified',
        claim: 'Viewing sunlight within 30-60 minutes of waking enhances cortisol release',
        trustScore: 92,
        source: 'View Source',
        analysis: 'Multiple studies confirm morning light exposure affects cortisol rhythms. Timing window supported by research.',
        research: 'View Research'
      },
      {
        date: '02/12/2023',
        status: 'Verified',
        claim: 'Non-sleep deep rest (NSDR) protocols can accelerate learning and recovery',
        trustScore: 88,
        source: 'View Source',
        analysis: 'AI Analysis',
        research: 'View Research'
      },
      // Agrega más reclamaciones aquí...
    ]
  };

  return (
    <Layout>
      <div className="bg-blue-50 p-6 rounded-md shadow-md">
        <h1 className="text-4xl font-bold mb-4">{influencer.name}</h1>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Specializations</h2>
          <p>{influencer.specializations.join(', ')}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Description</h2>
          <p>{influencer.description}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-md shadow-md text-center">
            <p className="text-xl font-bold">{influencer.trustScore}%</p>
            <p>Trust Score</p>
            <p>Based on {influencer.verifiedClaims} verified claims</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md text-center">
            <p className="text-xl font-bold">{influencer.yearlyRevenue}</p>
            <p>Yearly Revenue</p>
            <p>Estimated earnings</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md text-center">
            <p className="text-xl font-bold">{influencer.products}</p>
            <p>Products</p>
            <p>Recommended products</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md text-center">
            <p className="text-xl font-bold">{influencer.followers}</p>
            <p>Followers</p>
            <p>Total following</p>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Claims Analysis</h2>
          <input
            type="text"
            className="p-2 border border-blue-300 rounded-md w-full mb-4"
            placeholder="Search Claims"
          />
          <div className="flex justify-between mb-4">
            <div className="flex space-x-2">
              <select className="p-2 border border-blue-300 rounded-md">
                <option value="allCategories">All Categories</option>
                <option value="sleep">Sleep</option>
                <option value="performance">Performance</option>
                <option value="hormones">Hormones</option>
                <option value="nutrition">Nutrition</option>
                <option value="exercise">Exercise</option>
                <option value="stress">Stress</option>
                <option value="cognition">Cognition</option>
                <option value="motivation">Motivation</option>
                <option value="recovery">Recovery</option>
                <option value="mentalHealth">Mental Health</option>
              </select>
              <select className="p-2 border border-blue-300 rounded-md">
                <option value="allStatuses">All Statuses</option>
                <option value="verified">Verified</option>
                <option value="questionable">Questionable</option>
                <option value="debunked">Debunked</option>
              </select>
            </div>
            <select className="p-2 border border-blue-300 rounded-md">
              <option value="date">Date</option>
            </select>
          </div>
          {influencer.claims.map((claim, index) => (
            <div key={index} className="bg-white p-4 rounded-md shadow-md mb-4">
              <p className="text-xl font-bold">{claim.date}</p>
              <p><span className="font-bold">Status:</span> {claim.status}</p>
              <p><span className="font-bold">Claim:</span> {claim.claim}</p>
              <p><span className="font-bold">Trust Score:</span> {claim.trustScore}%</p>
              <a href="#" className="text-blue-600 hover:underline">View Source</a>
              <p><span className="font-bold">Analysis:</span> {claim.analysis}</p>
              <a href="#" className="text-blue-600 hover:underline">View Research</a>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default InfluencerProfile;
