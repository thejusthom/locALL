import * as React from "react";
import styled from "styled-components";
import Girl from "../../assets/images/girl1.jpg";
import { Button } from "../Events/_EventsForm";
import ProgressBar from "./_ProgressBar";

interface IDonationCardProps{
    handleMakePayment: () => void;
}

const DonationCard = (props: IDonationCardProps) => {
    const { handleMakePayment } = props;
    return(
        <Card>
        <img src={Girl} />
        <div>
        <Top>
            <Title>Donation for Ear Surgery</Title>
            <ProgressBar bgcolor="blue" height={20} progress={80} />
        </Top>
        <Name>
        <span>Aurora Rose</span> | <span>5 years</span>
        </Name>
        <p>We are reaching out with a heartfelt plea for your support. Our precious 5-year-old daughter requires an urgent ear operation to restore her hearing. The financial burden is overwhelming, and any contribution, no matter how small, would make a world of difference. Your generosity can help bring sound and joy back into her life. Please consider donating and sharing our story. Every bit counts, and we are immensely grateful for your kindness.</p>
        <p className="amount">Required amount: $10000</p>
        <Button onClick={handleMakePayment}>Donate Now</Button>
        </div>
    </Card>
    );
}

const Card = styled.div`
display: flex;
background-color: #adaaaa;
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