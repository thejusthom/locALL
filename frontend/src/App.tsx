import React from 'react';
import './App.css'
import EventsView from './views/EventsView';
import FeedShare from './views/FeedShareView';
import { StyledEngineProvider } from '@mui/material';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <div>kldj</div>
        <EventsView />
        <FeedShare/>
      </div>
    </StyledEngineProvider>
  );
}

export default App;
