import React from 'react';
import './App.css';
import Routes from './routes';
import { withTranslation } from 'react-i18next';
import 'slick-carousel/slick/slick.css'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Routes />
  );
}

export default withTranslation()(App);
