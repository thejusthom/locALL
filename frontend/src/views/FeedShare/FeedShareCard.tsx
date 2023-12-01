import FeedShare, { feedShare } from "../../models/feedShare";
import '../../assets/styles/feedshare.scss';

type Props = {
    feedShare: FeedShare;
}

const FeedShareCard: React.FC<Props> = (props: Props): React.ReactElement => {
        return(
            <>
            <div className="blog-card">
                <div className="meta">
                {/* <div className="photo"></div> */}
                <img className="photo" src={props.feedShare.image}></img>
                <ul className="details">
                    <li className="author"><a href="#">{props.feedShare.organizer}</a></li>
                    <li className="date">{props.feedShare.postedDate}</li>
                    {/* <li className="tags">
                    <ul>
                        <li><a href="#">Learn</a></li>
                        <li><a href="#">Code</a></li>
                        <li><a href="#">HTML</a></li>
                        <li><a href="#">CSS</a></li>
                    </ul>
                    </li> */}
                </ul>
                </div>
                <div className="description">
                <h1>{props.feedShare.foodType}</h1>
                <h2>{props.feedShare.address}</h2>
                <p>{props.feedShare.organizer}</p>
                <p className="read-more">
                    <a href="#">Read More</a>
                </p>
                </div>
            </div>
            {/* <div className="blog-card alt">
                <div className="meta">
                <img className="photo" src="https://storage.googleapis.com/chydlx/codepen/blog-cards/image-2.jpg"></img>
                <ul className="details">
                    <li className="author"><a href="#">{props.feedShare.organizer}</a></li>
                    <li className="date">July. 15, 2015</li>
                    <li className="tags">
                    <ul>
                        <li><a href="#">Learn</a></li>
                        <li><a href="#">Code</a></li>
                        <li><a href="#">JavaScript</a></li>
                    </ul>
                    </li>
                </ul>
                </div>
                <div className="description">
                <h1>Mastering the Language</h1>
                <h2>Java is not the same as JavaScript</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.</p>
                <p className="read-more">
                    <a href="#">Read More</a>
                </p>
                </div>
            </div> */}
            </>
        )    
}

export default FeedShareCard;