// components/InfluencerList.js
import React from 'react';

const InfluencerList = ({ influencers }) => {
  return (
    <ul>
      {influencers.length > 0 ? (
        influencers.map(influencer => (
          <li key={influencer.id} className="p-2">{influencer.name} - {influencer.followers} seguidores</li>
        ))
      ) : (
        <li className="p-2">No hay influenciadores disponibles</li>
      )}
    </ul>
  );
};

export default InfluencerList;

