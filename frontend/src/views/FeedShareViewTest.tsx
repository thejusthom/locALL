import FeedShare from "../models/feedShare"
import '../../assests/styles/feedshare.scss';


type Props = {
    feedShare: FeedShare[];
}

const FeedShareViewTest: React.FC<Props> = (props: Props): React.ReactElement => {
    const feedShareEntrees = props.feedShare.map(feedShare => {
        return(
            <>
            <div className="blog-card">
                <div className="meta">
                <div className="photo"></div>
                <ul className="details">
                    <li className="author"><a href="#">John Doe</a></li>
                    <li className="date">Aug. 24, 2015</li>
                    <li className="tags">
                    <ul>
                        <li><a href="#">Learn</a></li>
                        <li><a href="#">Code</a></li>
                        <li><a href="#">HTML</a></li>
                        <li><a href="#">CSS</a></li>
                    </ul>
                    </li>
                </ul>
                </div>
                <div className="description">
                <h1>Learning to Code</h1>
                <h2>Opening a door to the future</h2>
                <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.</p>
                <p className="read-more">
                    <a href="#">Read More</a>
                </p>
                </div>
            </div>
            <div className="blog-card alt">
                <div className="meta">
                <div className="photo"></div>
                <ul className="details">
                    <li className="author"><a href="#">Jane Doe</a></li>
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
            </div>
            </>
        )
    })
    return (
        <div className="FeedShareViewTest">
            {feedShareEntrees}
        </div>
    )
}

export default FeedShareViewTest;