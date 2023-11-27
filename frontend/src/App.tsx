import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './happenings-page/nav-bar/nav-bar';
import EventsView from './views/EventsView';
import FeedShare from './views/FeedShareView';
import { StyledEngineProvider } from '@mui/material';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <div>kldj</div>
        <Navbar/>
        <EventsView />
        <FeedShare/>
      </div>
    </StyledEngineProvider>
  );
}

export default App;
