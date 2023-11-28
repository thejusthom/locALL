import React from 'react';
import '../assests/styles/happenings.scss';
import NavBar from '../happenings-page/nav-bar/nav-bar';
import Header from '../happenings-page/header/header';

const HappeningsView: React.FC = () =>{
  return (
    <>
      <NavBar/>
      <div className="happenings">
        <Header/>
      </div>
   </>
  )
};

export default HappeningsView;