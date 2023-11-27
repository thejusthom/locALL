import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './happenings-page/nav-bar/nav-bar';
import EventsView from './views/EventsView';
import FeedShare from './views/FeedShareView';

function App() {
  return (
    <div>
     <Navbar/>

      {/* <div className="App">
        <div>kldj</div>
        <EventsView />
        <FeedShare/>
      </div> */}
    </div>
  )
}

export default App;
