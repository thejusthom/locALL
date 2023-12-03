import React, { useEffect, useState} from 'react';
import './single-post.scss';
import { useLocation } from 'react-router-dom';
import happeningsService from '../../services/happeningsService';
import Happenings from '../../models/happenings';
import { useSelector } from 'react-redux';

const SinglePost: React.FC = () =>{
  const [happening, setHappening] = useState({} as Happenings);
  const locationId = useSelector((state: any) => state.location.pincode);
  const happeningPathObj = useLocation();
  console.log(happeningPathObj);
  const happeningPath = happeningPathObj.pathname.split("/");
  const happeningId = happeningPath[2];
  console.log(happeningId);

  useEffect(() => {
    console.log(locationId);
    happeningsService.getHappeningById("02119", happeningId).then((happening) => setHappening(happening));
  },[happeningId]);

  return (
   <div className="singlePost">
      <div className="singlePostWrapper">
        <img className="singlePostImg" src={happening.image} alt="" />
        <h1 className="singlePostTitle">{happening.title}</h1>

        <div className="singlePostInfo">
          <span className="singlePostAuthor">Author: <b>Shashikar</b></span>
          <span className="singlePostDate">{happening.postedDate}</span>
        </div>

        <p className="singlePostDesc">
          {happening.content}
        </p>
      </div>
   </div>
  )
};

export default SinglePost;
