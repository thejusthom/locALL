import * as React from "react";
import styled from "styled-components";
import {loadStripe} from '@stripe/stripe-js';
// import CheckoutForm from "./SubscriptionPlans";
// import Girl from "../../assets/images/girl1.jpg";
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
      postedOn: "",
      descriptionInfo: "",
      amountRequired: 0,
      amountAchieved: 0,
      createdUser: "",
      locationId: "",
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
    // const {eventName, descriptionInfo, category} = newEvent;
    // const eventValues = [eventName, descriptionInfo, category];
    if(newDonationValues.includes("") || newDonationValues.includes(0) || receiverValues.includes("") || receiverValues.includes(0)){
        setIsValid(false);
    }
    else{
        setIsValid(true);
    }
    }, [newDonation]);

    // const []
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
        const onCloseModal = () => {
        // setNewEvent(initialNewEvent);
        // setCoordinates({longitude: 0, latitude:0});
        // setStartDate(undefined);
        // setEndDate(undefined);
        // setOrganiser({name: "", contact: ""});
        // if(isEdit){
        //     setIsEdit(false);
        //     setEventId(""); 
        // }
        // setShowModal(false);
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
        donationServices.createDonation(loc.pincode, {...newDonation, createdUser: "656bbf4a3b7690ac27e2bcfb"}).then((donation)=> {
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
   children={<DonationForm
              newDonation={newDonation}
              onCategoryChange={onCategoryChange}
              onNameChange={onNameChange}
              onDescriptionChange={onDescriptionChange}
              onReceiverChange={onReceiverChange}
              onAmountChange={onAmountChange}
            //   onStartDateChange={onStartDateChange}
            //   onEndDateChange={onEndDateChange}
            //   onLocationChange={onLocationChange} 
            //   onOrganiserChange={onOrganiserChange}
              isEdit={false}
            />
            }
    />
  </Modal>
        <Button onClick={() => setShowModal(true)}>Create New Donation</Button>
        {donationsList.map(() => {return(<DonationCard handleMakePayment={handleMakePayment} />)} )}
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
        {/* <CheckoutForm /> */}
        </>
    );
}

export default DonationsView;