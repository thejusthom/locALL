import * as React from "react";
import styled from "styled-components";
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "./SubscriptionPlans";
// import Girl from "../../assets/images/girl1.jpg";
import { Button } from "../Events/_EventsForm";
import DonationCard from "./_DonationCard";

const donations = [1, 2, 3,4];

const DonationsView = () => {
    const handleMakePayment = async()=>{
        const stripe = await loadStripe("pk_test_51OKDhEAul8oR9y69J7pdRY2qMBmY6sux6srL1tbqBlmoaKW0OsuutywjQATMAadyiX60Wmtp0CSxYT2QsHuGVSn1004nwatlKT");
  
        const body = {
            products:[{name:"test", price:12}, {name:"shhd", price: 14}]
        }
        const headers = {
            "Content-Type":"application/json"
        }
        const response = await fetch("http://localhost:3001/donations/api/create-checkout-session",{
            method:"POST",
            headers:headers,
            body:JSON.stringify(body)
        });
  
        const session = await response.json();
  
        const result = await stripe?.redirectToCheckout({
            sessionId:session.id
        });
        
        if(!!result && result.error){
            console.log(result.error);
        }
    }
    return(
        <>
        {donations.map(() => {return(<DonationCard handleMakePayment={handleMakePayment} />)} )}
        {/* <Card>
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
        </Card> */}
        <CheckoutForm />
        </>
    );
}

export default DonationsView;