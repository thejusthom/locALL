import * as React from "react";
import styled from "styled-components";
import CheckoutForm from "./SubscriptionPlans";
import Girl from "../../assets/images/girl1.jpg";
import { Button } from "../Events/_EventsForm";

const DonationsView = () => {
    return(
        <>
        <Card>
            <img src={Girl} />
            <div>
            <Top>
                <Title>Donation for Ear Surgery</Title>
                <div>graph</div>
            </Top>
            <span>Aurora Rose</span> | <span>5 years</span>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse optio exercitationem nihil expedita quae illo assumenda voluptatibus saepe ea tempore. Corporis eaque impedit veritatis totam. Maiores, nam, aut minima sunt assumenda similique vel magnam amet esse fugiat veniam, dolor impedit iure iste? Beatae sint, molestias corporis quis neque odit, pariatur ipsa aliquid nobis eveniet mollitia? Laboriosam odit accusamus numquam blanditiis sunt! Quo alias minus veniam aut fuga voluptas optio autem veritatis molestiae quasi officia ullam corporis, et, quidem distinctio consectetur quam reiciendis harum, laudantium vero facere! Expedita sit doloremque dolorum tempora perspiciatis. Velit error quod, officia tempora vero animi culpa.</p>
            <span>Required amount: $10000</span>
            <Button>Donate Now</Button>
            </div>
        </Card>
        <CheckoutForm />
        </>
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
`;
const Title = styled.h2`

`;
const Top = styled.div`
display: flex;
`;

export default DonationsView;