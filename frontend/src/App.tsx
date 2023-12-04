import React from 'react';
import logo from './logo.svg';
import './App.css';
import HappeningsView from './views/HappeningsView';
import EventsView from './views/Events/EventsView';
import FeedShare from './views/FeedShare/FeedShareView';
import Routes from './routes';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Routes />
  );
}

export default App;
