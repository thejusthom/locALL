import {ReactElement, useEffect, useState} from 'react';
import './posts.scss';
import Happenings from '../../models/happenings';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { IPerson, IUser } from '../../models/user';

/**
 * Props for the Posts component.
 */
type Props = {
  posts: Happenings[]
}

/**
 * Initial state for the user.
 */
const initialStateUser = {
  person: {} as IPerson,
  username: '',
  password: ''
};

/**
 * Posts component.
 * 
 * @param {Props} props - The component props.
 * @returns {ReactElement} The rendered component.
 */
const Posts: React.FC<Props> = (props: Props): ReactElement =>{
  const [user, setUser] = useState<IUser>(initialStateUser);
  const currentUser : IUser = useSelector((state: any) => state.user);
  const location = useSelector((state: any) => state.location);
 
  useEffect(() => {
    setUser(currentUser);
  },[currentUser]);

  /**
   * Formats the given timestamp into a readable date and time string.
   * 
   * @param {string | undefined} timestamp - The timestamp to format.
   * @returns {string} The formatted date and time string.
   */
  function formatTimestamp(timestamp?: string): string {
    if (!timestamp) {
      return 'Timestamp is undefined';
    }
  
    const timestampValue = parseInt(timestamp, 10);
    if (isNaN(timestampValue)) {
      return 'Invalid timestamp';
    }
  
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
  
    const formattedDate = new Date(timestampValue).toLocaleString('en-US', options);
    return formattedDate;
  }

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
          <div className="postDate">{formatTimestamp(happening.postedDate)}</div>
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
