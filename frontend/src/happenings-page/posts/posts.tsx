import {ReactElement, useEffect, useState} from 'react';
import './posts.scss';
import Happenings from '../../models/happenings';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { IPerson, IUser } from '../../models/user';

type Props = {
  posts: Happenings[]
}

const initialStateUser = {
  person: {} as IPerson,
  username: '',
  password: ''
};

const Posts: React.FC<Props> = (props: Props): ReactElement =>{
  const [user, setUser] = useState<IUser>(initialStateUser);
  const currentUser : IUser = useSelector((state: any) => state.user);
  const location = useSelector((state: any) => state.location);
  console.log(location);
  console.log(currentUser);
 
  useEffect(() => {
    setUser(currentUser);
  },[currentUser]);

  const happeningsEntrees = props.posts.map(happening => {
    return(
      <div key={happening._id} className="post">
        <img className="postImg" src={happening.image} alt="" />
        <div className="postInfo">

          <div className="postCats">
            <span className="postCat">Everyday incidents</span>
          </div>

          <div className="postTitle">
            <Link to={`/happenings/${happening._id}`} className="link">
              {happening.title}
            </Link>
          </div>
          <hr />
          <div className="postDate">{happening.postedDate}</div>
        </div>
        <p className="postDesc">
          {happening.content}
        </p>
      </div>
    )
  });

  return (
    <>
    <div className="posts">
      {happeningsEntrees}
    </div>
    </>
  )
};

export default Posts;
