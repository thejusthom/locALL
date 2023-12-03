import {ReactElement} from 'react';
import './posts.scss';
import Happenings from '../../models/happenings';
import { Link } from "react-router-dom";

type Props = {
  posts: Happenings[]
}

const posts: React.FC<Props> = (props: Props): ReactElement =>{

  const happeningsEntrees = props.posts.map(happening => {
    return(
      <div className="post">
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
    <div className="posts">
      {happeningsEntrees}
    </div>
  )
};

export default posts;
