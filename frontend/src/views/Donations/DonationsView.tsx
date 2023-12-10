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
import CloseIcon from "../../assets/images/close-black.svg";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { ToastContainer, toast } from "react-toastify";
import MyDonations from "./_MyDonations";
import NoDataScreen from "../../common/_NoDataScreen";
import Loading from "../../common/_Loader";

const initialDonationState = {
    donationName: "",
      descriptionInfo: "",
      amountRequired: 0,
      amountAchieved: 0,
      category: "medical",
      image: "",
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
    const [showLoader, setShowLoader] = React.useState(true);

    const selectLocation = (state: any) => state.location;
const loc = useSelector(selectLocation);
const user = useSelector((state: any) => state.user);

React.useEffect(() => {
    const pincode = loc.pincode;
    if(tab === 0){
        setShowLoader(true);
donationServices.getDonations(pincode).then((donation)=> {
    // const availableEvents = event.filter((e: IEvent) => !!e.endDate && moment(e.endDate) >= moment());
    setDonations(donation)});
    setShowLoader(false);
    console.log("dsijd")
}
    else{
        setShowLoader(true);
        donationServices
        .getDonationByParams(pincode, "6573fcd148338641e52772f3")
        .then((donation => {setDonations(donation)
            setShowLoader(false);}));
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
       console.log(donation)
        if(!!process.env.REACT_APP_STRIPE_PUBLISHING_KEY){

        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHING_KEY);
  
        const body = {
            products:[{name: donation?.donationName, price:contributionAmount}],
            donation,
            pincode: loc.pincode
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
        console.log(donation)
        !!donation && donationServices.updateDonation(loc.pincode, selectedId, {...donation, amountAchieved: (donation.amountAchieved || 0) + contributionAmount});
        // .then((d)=> {
        //     // donationServices.getDonations(loc.pincode).then((d)=> {
        //         // const availableEvents = event.filter((e: IEvent) => !!e.endDate && moment(e.endDate) >= moment());
        //         setDonations(d)}
        // );
    // });
        console.log(session);
  
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
    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = !!e.target?.files?.length ? e.target.files?.[0] : null;
        if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            reader.result as string;
            // updateData[id as keyof typeof updateData] = reader.result as string;
            // console.log(updateData);
            // setFormData(updateData);
            setNewDonation({...newDonation, image: reader.result as string})
          };
        }
      }
            // console.log(e.target.files[0]);
            // !!e.target?.files?.length && setNewDonation({...newDonation, image: e.target?.files[0]});
    // } 
    const onContributionChange  = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContributionAmount(parseInt(e.target.value));
    }
    const onCloseAmountModal = () => {
        setSelectedId("");
        setShowAmountPopup(false);
    };

    const onUpdate = () => {
        setShowLoader(true);
        const updatedEvent = {...newDonation};
        donationServices.updateDonation(loc.pincode, donationId, updatedEvent).then((donation)=> {
            donationServices.getDonations(loc.pincode).then((donation)=> {
                // const availableEvents = event.filter((e: IEvent) => !!e.endDate && moment(e.endDate) >= moment());
                setDonations(donation);
                setShowLoader(false);
            }
        );
        toast.success(`${donation.donationName} Updated Successfully!`);
    });
            setNewDonation(initialDonationState);
            setIsEdit(false);
            setDonationId("");
            setShowModal(false);
    };
    const onEdit = (donationId: string) => {
        setShowLoader(true);
        donationServices.getDonationById(loc.pincode, donationId).then((donation)=> {
           setNewDonation(donation);
           setIsEdit(true);
           setDonationId(donationId);
           setShowModal(true);
           setShowLoader(false);
       });
   };
   const onDelete = (donationId: string) => {
    setShowLoader(true);
       donationServices.deleteDonation(loc.pincode, donationId).then((donation)=> {
           donationServices.getDonations(loc.pincode).then((donation)=> {
            //    const availableEvents = donation.filter((e: IDonation) => !!e.endDate && moment(e.endDate) >= moment());
               setDonations(donation);
               setShowLoader(false);
           });
               toast.success(`Donation Deleted Successfully!`);
       });
   };
    const onSubmit = (event: any) => {
        event.preventDefault();
        setShowLoader(true);
        donationServices.createDonation(loc.pincode, {...newDonation, createdUser: "6573fcd148338641e52772f3", locationId: loc.pincode, postedOn: new Date().toLocaleDateString()}).then((donation)=> {
            !!donations ? setDonations([...donations, donation]) : setDonations([donation]);
            setShowLoader(false);
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
        <DonationsWrap>
        <ToastContainer position="top-center" closeOnClick />
        {/* <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: "center", justifyContent: "center" }}> */}
        <Modal isOpen={showLoader}>
        <Loading isLoading={showLoader} />
        </Modal>
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
              onImageChange={onImageChange}
            />
            }
    />
  </Modal>
  <Modal isOpen={showAmountPopup}>
    <FormWrap>
        <Form>
            <div className="close">
        <img src={CloseIcon} width={25} height={25} onClick={onCloseAmountModal} />
        </div>
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
        {tab === 0 ? !!donations?.length ? 
        (<DonationCardsWrap>
        {donations.map((donation) => {return(<DonationCard donation={donation} handleMakePayment={onChangeDonationAmount} />)} )}
        </DonationCardsWrap>) 
        :  (<NoDataScreen />)
        : !!donations?.length ? (<MyDonations donations={donations} onEdit={onEdit} onDelete={onDelete} />)
        : <NoDataScreen />
        }
        </DonationsWrap>
    );
}

const DonationsWrap = styled.div`
margin: 25px;
`;
const Form = styled(BaseForm)`
height: 235px;
overflow: hidden;
    padding: 40px;
    .close{
        text-align-last: end;
    }
`;

const DonationCardsWrap = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
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