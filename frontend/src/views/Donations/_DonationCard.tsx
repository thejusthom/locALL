import * as React from "react";
import styled from "styled-components";
import User from "../../assets/images/userDonation.svg";
import { Button } from "../Events/_EventsForm";
import ProgressBar from "./_ProgressBar";
import { IDonation } from "../../models/donation";

interface IDonationCardProps{
    donation: IDonation;
handleMakePayment: (id: string) => void;
}

const DonationCard = (props: IDonationCardProps) => {
    const { donation, handleMakePayment } = props;
    return(
        <Card>
        <img src={!!donation.image ? donation.image : User} loading="lazy" />
        <div>
        <Top>
            <Title>{donation.donationName}</Title>
            <ProgressBar bgcolor="blue" height={20} progress={80} />
        </Top>
        <Name>
        <span>{donation.receiver?.name}</span> | <span>{donation.receiver?.age}</span>
        </Name>
        <p>{donation.descriptionInfo}</p>
        <p className="amount">Required amount: {donation.amountRequired}</p>
 <Button onClick={() => !!donation._id && handleMakePayment(donation._id)}>Help Now</Button>
        </div>
    </Card>
    );
}

const Card = styled.section`
display: flex;
background-color: #fbf3f3;
box-shadow: 0px 0px 15px 5px #b4b1b1;
&:hover{
    width: 1050px;
    height: 325px;
}
width: 1000px;
    height: 300px;
    padding: 20px;
    place-items: center;
    border-radius: 20px;
    img{
        width: 30%;
    height: 80%;
    }
    p{
        font-size: 16px;
    }
    .amount{
        font-size: 16px;
    }
`;
const Title = styled.h2`
margin: 0;
`;
const Name = styled.div`
span{
    font-size: 18px;
}
`;
const Top = styled.div`
display: flex;
`;

export default DonationCard;