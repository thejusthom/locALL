import * as React from "react";
import styled from "styled-components";
import {loadStripe} from '@stripe/stripe-js';
import donationServices from "../../services/donationsService";
import EventsForm, { Button, Form as BaseForm } from "../Events/_EventsForm";
import DonationCard from "./_DonationCard";
import { Modal } from "../Events/EventsView";
import { IDonation } from "../../models/donation";
import DonationForm from "./_DonationForm";
import { useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { ToastContainer, toast } from "react-toastify";
import MyDonations from "./_MyDonations";

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
    const [showAmountPopup, setShowAmountPopup] = React.useState(false);
    const [newDonation, setNewDonation] = React.useState<IDonation>(initialDonationState);
    const [isValid, setIsValid] = React.useState(false);
    const [tab, setTab] = React.useState(0);
    const [donationId, setDonationId] = React.useState("");
    const [isEdit, setIsEdit] = React.useState<boolean>(false);
    const [selectedId, setSelectedId] = React.useState("");
    const [contributionAmount, setContributionAmount] = React.useState(0);

    const selectLocation = (state: any) => state.location;
const loc = useSelector(selectLocation);
const user = useSelector((state: any) => state.user);

React.useEffect(() => {
    const pincode = loc.pincode;
    if(tab === 0){
donationServices.getDonations(pincode).then((donation)=> {
    // const availableEvents = event.filter((e: IEvent) => !!e.endDate && moment(e.endDate) >= moment());
    setDonations(donation)});
    console.log("dsijd")
}
    else{
        donationServices
        .getDonationByParams(pincode, "6573fcd148338641e52772f3")
        .then((donation => {setDonations(donation)}));
        console.log("ij")
    }
}, [loc, user._id, tab]);

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

    function a11yProps(index: number) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }

      const onChangeDonationAmount = (id: string) => {
        setSelectedId(id);
        setShowAmountPopup(true);
      }

    const handleMakePayment = async(event: any) => {
        event.preventDefault();
       const donation = donations?.find((i) => i._id === selectedId);
        if(!!process.env.REACT_APP_STRIPE_PUBLISHING_KEY){

        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHING_KEY);
  
        const body = {
            products:[{name: donation?.donationName, price:contributionAmount}]
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
            setDonationId(""); 
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
    const onContributionChange  = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContributionAmount(parseInt(e.target.value));
    }
    const onUpdate = () => {
        const updatedEvent = {...newDonation};
        donationServices.updateDonation(loc.pincode, donationId, updatedEvent).then((donation)=> {
            donationServices.getDonations(loc.pincode).then((donation)=> {
                // const availableEvents = event.filter((e: IEvent) => !!e.endDate && moment(e.endDate) >= moment());
                setDonations(donation)}
        );
        toast.success(`${donation.donationName} Updated Successfully!`);
    });
            setNewDonation(initialDonationState);
            setIsEdit(false);
            setDonationId("");
            setShowModal(false);
    };
    const onEdit = (donationId: string) => {
        donationServices.getDonationById(loc.pincode, donationId).then((donation)=> {
           setNewDonation(donation);
           setIsEdit(true);
           setDonationId(donationId);
           setShowModal(true);
       });
   };
   const onDelete = (donationId: string) => {
       donationServices.deleteDonation(loc.pincode, donationId).then((donation)=> {
           donationServices.getDonations(loc.pincode).then((donation)=> {
            //    const availableEvents = donation.filter((e: IDonation) => !!e.endDate && moment(e.endDate) >= moment());
               setDonations(donation)
           });
               toast.success(`Donation Deleted Successfully!`);
       });
   };
    const onSubmit = (event: any) => {
        event.preventDefault();
        donationServices.createDonation(loc.pincode, {...newDonation, createdUser: "6573fcd148338641e52772f3", locationId: loc.pincode, postedOn: new Date().toLocaleDateString()}).then((donation)=> {
            !!donations ? setDonations([...donations, donation]) : setDonations([donation]);
            toast.success("Donation Created Successfully!");
        });
        setShowModal(false);
        setNewDonation(initialDonationState);
    };
    const handleTabChange = (event: any, newValue: number) => {
        // donationServices.getDonations(loc.pincode).then((donation)=> {
        //     // const availa = donation.filter((e: IEvent) => !!e.endDate && moment(e.endDate) >= moment());
        //     setDonations(donation)});
        setTab(newValue);
      };
    return(
        <>
        <ToastContainer position="top-center" closeOnClick />
        <Modal isOpen={showModal}>
  <EventsForm 
  isEdit={isEdit}
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
              isEdit={isEdit}
            />
            }
    />
  </Modal>
  <Modal isOpen={showAmountPopup}>
    <FormWrap>
        <Form>
        <label>
        How much would you like to contribute?
        </label>
        <div style={{ margin: "15px 0 5px 0"}}>
        <input type="number" value={contributionAmount} onChange={onContributionChange} />
        </div>
       <div style={{textAlign: "center"}}>
        <Button onClick={handleMakePayment}>Donate</Button>
          </div>
        </Form>
    </FormWrap>
  </Modal>
        <Button onClick={() => setShowModal(true)}>Create New Donation</Button>
        <Tabs sx={{margin: "15px 0 0 0"}} value={tab} onChange={handleTabChange} aria-label="basic tabs example">
          <Tab sx={{fontSize: "16px", fontWeight: "bold"}} label="All Donations" {...a11yProps(0)} />
          <Tab sx={{fontSize: "16px", fontWeight: "bold"}} label="My Donations" {...a11yProps(1)} />
        </Tabs>
        {tab === 0 && !!donations ? 
        <DonationCardsWrap>
        {donations.map((donation) => {return(<DonationCard donation={donation} handleMakePayment={onChangeDonationAmount} />)} )}
        </DonationCardsWrap> 
        : <MyDonations donations={donations} onEdit={onEdit} onDelete={onDelete} />
        }
        </>
    );
}

const Form = styled(BaseForm)`
height: 200px;
    padding: 40px;
`;

const DonationCardsWrap = styled.article`
margin: 60px 40px;
section{
    margin: 20px 0;
}
`;

const FormWrap = styled.section`
height: 100%;
justify-content: center;
display: flex;
`;


export default DonationsView;