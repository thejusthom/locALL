import * as React from "react";
import styled from "styled-components";
import {loadStripe} from '@stripe/stripe-js';
import donationServices from "../../services/donationsService";
import EventsForm, { Button } from "../Events/_EventsForm";
import DonationCard from "./_DonationCard";
import { Modal } from "../Events/EventsView";
import { IDonation } from "../../models/donation";
import DonationForm from "./_DonationForm";
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";

const donationsList = [1, 2, 3,4];

const initialDonationState = {
    donationName: "",
      descriptionInfo: "",
      amountRequired: 0,
      category: "medical",
      receiver: {
        name: "",
        age: 0,
        contact: "",
        }
}

const DonationsView = () => {
    const [donations, setDonations] = React.useState<IDonation[]>();
    const [showModal, setShowModal] = React.useState(false);
    const [newDonation, setNewDonation] = React.useState<IDonation>(initialDonationState);
    const [isValid, setIsValid] = React.useState(false);

    const selectLocation = (state: any) => state.location;
const loc = useSelector(selectLocation);

React.useEffect(() => {
    const newDonationValues = Object.values(newDonation);
    const receiverValues = Object.values(newDonation.receiver);
    if(newDonationValues.includes("") || newDonationValues.includes(0) || receiverValues.includes("") || receiverValues.includes(0)){
        setIsValid(false);
    }
    else{
        setIsValid(true);
    }
    }, [newDonation]);

    const handleMakePayment = async()=>{
        if(!!process.env.REACT_APP_STRIPE_PUBLISHING_KEY){

        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHING_KEY);
  
        const body = {
            products:[{name:"test", price:12}, {name:"shhd", price: 14}]
        }
        const headers = {
            "Content-Type":"application/json"
        }
        const response = await fetch(`http://localhost:3001/payment/create-checkout-session`,{
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
        }}
    }
        const onCloseModal = () => {
        setNewDonation(initialDonationState);
        if(isEdit){
            setIsEdit(false);
            setEventId(""); 
        }
        setShowModal(false);
    };
    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewDonation({...newDonation, donationName: e.target.value});
    }
    const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewDonation({...newDonation, descriptionInfo: e.target.value});
    } 
    const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNewDonation({...newDonation, category: e.target.value});
    }
    const onReceiverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewDonation({...newDonation, receiver: {...newDonation.receiver, [e.target.id]: e.target.value}});
    }
    const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewDonation({...newDonation, amountRequired: parseInt(e.target.value)});
    }
    const onUpdate = () => {

    };
    const onSubmit = (event: any) => {
        event.preventDefault();
        donationServices.createDonation(loc.pincode, {...newDonation, createdUser: "656bbf4a3b7690ac27e2bcfb", locationId: loc.pincode, postedOn: new Date().toLocaleDateString()}).then((donation)=> {
            !!donations ? setDonations([...donations, donation]) : setDonations([donation]);
            toast.success("Donation Created Successfully!");
        });
        setShowModal(false);
        setNewDonation(initialDonationState);
    };
    return(
        <>
        <Modal isOpen={showModal}>
  <EventsForm 
  isEdit={false}
   eventName={newDonation.donationName}
   onCloseModal={onCloseModal} 
   onUpdate={onUpdate} 
   onSubmit={onSubmit}
   isDisabled={!isValid}
   type="Donation"
   children={<DonationForm
              newDonation={newDonation}
              onCategoryChange={onCategoryChange}
              onNameChange={onNameChange}
              onDescriptionChange={onDescriptionChange}
              onReceiverChange={onReceiverChange}
              onAmountChange={onAmountChange}
              isEdit={false}
            />
            }
    />
  </Modal>
        <Button onClick={() => setShowModal(true)}>Create New Donation</Button>
        <DonationCardsWrap>
        {donationsList.map(() => {return(<DonationCard handleMakePayment={handleMakePayment} />)} )}
        </DonationCardsWrap>
        </>
    );
}

const DonationCardsWrap = styled.article`
section{
    margin: 20px 0;
}
`;

export default DonationsView;