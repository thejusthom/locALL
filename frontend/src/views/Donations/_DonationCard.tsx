import * as React from "react";
import styled from "styled-components";
import User from "../../assets/images/userDonation.svg";
import { Button } from "../Events/_EventsForm";
import ProgressBar from "./_ProgressBar";
import { IDonation } from "../../models/donation";

// donation card props
interface IDonationCardProps{
    donation: IDonation;
handleMakePayment: (id: string) => void;
}

//donation card
const DonationCard = (props: IDonationCardProps) => {
    const { donation, handleMakePayment } = props;
    let percentage = !!donation.amountAchieved ? Math.round((donation.amountAchieved/donation.amountRequired)*100) : 0;
    if(percentage > 100){
        percentage = 100;
    }
    //progress bar color based on percentage
    const progressColor = () => {
        if(percentage < 50){
            return "#ff1414";
        }
        else if(percentage < 75){
            return "#fff614";
        }
        else if(percentage < 90){
            return "#a9ff14";
        }
        else{
            return "#5bff14";
        }
    };
    return(
        <Card>
        <img src={!!donation.image ? donation.image : User} loading="lazy" />
        <div>
        <Top>
            <Title>{donation.donationName}</Title>
            {/* progress bar */}
            {!!donation._id && <ProgressBar id={donation._id} bgcolor={progressColor()} height={20} progress={percentage} donationRequired={donation.amountRequired} donationAchieved={donation.amountAchieved || 0} />}
        </Top>
        <Name>
        <span>{donation.receiver?.name}</span> | <span>{donation.receiver?.age}</span>
        </Name>
        <p>{donation.descriptionInfo}</p>
        <p className="amount">Required amount: <strong>{donation.amountRequired}</strong></p>
 <Button onClick={() => !!donation._id && handleMakePayment(donation._id)}>Help Now</Button>
        </div>
    </Card>
    );
}

const Card = styled.section`
display: flex;
box-shadow: 0px 0px 15px 5px #b4b1b1;
&:hover{
    width: 1150px;
    height: 390px;
}
width: 1100px;
    height: 370px;
    padding: 20px;
    place-items: center;
    border-radius: 20px;
    img{
        width: 240px;
    height: 270px;
    margin-right: 25px;
    }
    p{
        width: 800px;
        font-size: 17px;
        margin: 10px 0;
    }
    .amount{
        font-size: 18px;
        margin: 15px 0 20px 0;
    }
    transition: width 0.5s, height 0.5s;
`;
const Title = styled.h2`
margin: 0;
font-family: "Roboto","Helvetica","Arial",sans-serif
`;
const Name = styled.div`
margin-top: 2px;
span{
    font-size: 18px;
}
`;
const Top = styled.div`
display: flex;
    align-items: center;
    justify-content: space-between;
`;

export default DonationCard;