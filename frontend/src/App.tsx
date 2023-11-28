import React from 'react';
import logo from './logo.svg';
import './App.css';
import HappeningsView from './views/HappeningsView';
import EventsView from './views/EventsView';
import FeedShare from './views/FeedShareView';

function App() {
  return (
    <div>
     <HappeningsView/>

      {/* <div className="App">
        <div>kldj</div>
        <EventsView />
        <FeedShare/>
      </div> */}
    </div>
  )
}

export default App;
