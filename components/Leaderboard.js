// components/Leaderboard.js
import React from 'react';

const Leaderboard = ({ influencers }) => {
  return (
    <div className="container mx-auto p-6 bg-blue-50 text-blue-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Influencer Trust Leaderboard</h1>
      <div className="flex justify-between mb-4">
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold">1,234</span>
          <span>Active Influencers</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold">25,431</span>
          <span>Claims Verified</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold">85.7%</span>
          <span>Average Trust Score</span>
        </div>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Top Influencers</h2>
        <select className="p-2 border border-blue-300 rounded-md">
          <option value="highestFirst">Highest First</option>
          <option value="lowestFirst">Lowest First</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {influencers.map((influencer, index) => (
          <div key={influencer.id} className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-xl font-bold">{index + 1}. {influencer.name} ({influencer.category})</h3>
            <p>Trust Score: {influencer.trustScore}%</p>
            <p>Followers: {influencer.followers}</p>
            <p>Verified Claims: {influencer.verifiedClaims}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
