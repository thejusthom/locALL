import FeedShare from "../../models/feedShare"
import { feedShare } from "../../models/feedShare";
import { useEffect, useState } from "react";
import FeedShareCard from "./FeedShareCard";
import { useSelector } from 'react-redux'
import feedShareService from "../../services/feedshareService";

const FeedShareView: React.FC = () => {
    // get data from json
    // const feedShareCards = [...feedShare];
    const[feedShareCards, setFeedShareCards] = useState([] as FeedShare[]);
    const locationId = useSelector((state: any) => state.location.pincode);
    useEffect(()=>{
        console.log(locationId);
        feedShareService.getFeedshare(locationId).then((feedShareCards)=> setFeedShareCards(feedShareCards));
    },[locationId]);
    console.log(feedShareCards);
    return(
        <div>
            {
                feedShareCards.map((feedShareCard: FeedShare) => ( 
                <FeedShareCard feedShare = {feedShareCard}></FeedShareCard>
            ))}
        </div>
    )
}

export default FeedShareView;