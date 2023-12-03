import React, { useState , useEffect} from 'react';
import '../assets/styles/happenings.scss';
import NavBar from '../happenings-page/nav-bar/nav-bar';
import Header from '../happenings-page/header/header';
import Posts from '../happenings-page/posts/posts';
import CreatePost from '../happenings-page/create-post/create-post';
import happeningsService from '../services/happeningsService';
import SinglePost from '../happenings-page/single-post/single-post';
import { useSelector } from 'react-redux';
import Happenings from '../models/happenings';

const HappeningsView: React.FC = () =>{
  const [happenings, setHappenings] = useState([] as Happenings[]);
  const locationId = useSelector((state: any) => state.location.pincode);
 
  useEffect(() => {
    console.log(locationId);
    happeningsService.getAllHappenings("02119").then((happenings) => setHappenings(happenings));
  },[locationId]);

  return (
    <>
      {/* <NavBar/> */}
      <div className="happenings">
        <Header/>
        <Posts posts={happenings}/>
      </div>
      {/* <CreatePost/> */}
   </>
  )
};

export default HappeningsView;