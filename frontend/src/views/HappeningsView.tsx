import React from 'react';
import '../assests/styles/happenings.scss';
import NavBar from '../happenings-page/nav-bar/nav-bar';
import Header from '../happenings-page/header/header';
import Posts from '../happenings-page/posts/posts';
import { happenings } from '../models/happenings';
import SinglePost from '../happenings-page/single-post/single-post';

const HappeningsView: React.FC = () =>{
  const happeningsList = [...happenings];
  return (
    <>
      {/* <NavBar/> */}
      <div className="happenings">
        <Header/>
        <Posts posts={happeningsList}/>
      </div>
   </>
  )
};

export default HappeningsView;