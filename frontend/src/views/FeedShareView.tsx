import React from 'react';
import food from '../assests/images/food1.jpg';
import '../assests/styles/feedshare.scss';

interface FeedShareProps {
  image: string;
  foodType: string;
  address: string;
  servings: number;
  submitterDetails: string;
  timePosted: Date;
}

const FeedShare = () => {
  const foodType = '';
  const address = '71 Walnut Park';
  const servings = 5;
  const submitterDetails = 'Thejus Thomson';
  const timePosted = '2023-11-26';  
  return (
    <div className="card">
      <img src={food} alt="Food" className="card-image" />
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
