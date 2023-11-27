import React from 'react';

interface FeedShareProps {
  image: string;
  foodType: string;
  address: string;
  servings: number;
  submitterDetails: string;
  timePosted: string;
}

const FeedShare = () => {
  const image = '';
  const foodType = '';
  const address = '';
  const servings = 5;
  const submitterDetails = '';
  const timePosted = '';  
  return (
    <div className="card">
      <img src={image} alt="Food" className="card-image" />
      <div className="card-details">
        <h3>{foodType}</h3>
        <p>Address: {address}</p>
        <p>Servings: {servings}</p>
        <p>Submitter Details: {submitterDetails}</p>
        <p>Time Posted: {timePosted}</p>
      </div>
    </div>
  );
};

export default FeedShare;
