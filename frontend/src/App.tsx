import React from 'react';
import './App.css'
import EventsView from './views/EventsView';
import FeedShare from './views/FeedShareView';

function App() {
  return (
    <div className="App">
      <div>kldj</div>
      <EventsView />
      <FeedShare
      image="./images/food.jpg"
      foodType="food_type_here"
      address="address_here"
      servings={4}
      submitterDetails="Thejus"
      timePosted="2023/21/10"/>
          </div>
  );
}

export default App;
