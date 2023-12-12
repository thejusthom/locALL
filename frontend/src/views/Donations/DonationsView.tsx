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
import DonationMetrics from "./_DonationMetrics";
import { useTranslation } from "react-i18next";

const initialDonationState = {
    donationName: "",
      descriptionInfo: "",
      amountRequired: 0,
    //   amountAchieved: 0,
      category: "medical",
    //   image: "",
      receiver: {
        name: "",
        age: 0,
        contact: "",
        }
}

const DonationsView = () => {

    const { t } = useTranslation('common');

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
        .getDonationByParams(pincode, user?.user._id)
        .then((donation => {setDonations(donation)
            setShowLoader(false);}));
        console.log("ij")
    }
}, [loc, user?.user?._id, tab]);

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
            setNewDonation({...newDonation, image: reader.result as string})
          };
        }
      }
    const onContributionChange  = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContributionAmount(parseInt(e.target.value));
    }
    const onCloseAmountModal = () => {
        setSelectedId("");
        setShowAmountPopup(false);
    };

    const onUpdate = async(event: any) => {
        event.preventDefault();
        setShowLoader(true);
        const updatedEvent = {...newDonation};
        try{ 
            await donationServices.updateDonation(loc.pincode, donationId, updatedEvent).then((donation)=> {
            donationServices.getDonations(loc.pincode).then((donation)=> {
                setDonations(donation);
                setShowLoader(false);
            }
        );
        toast.success(`${donation.donationName} Updated Successfully!`);
    });
}
    catch(err){
    console.log("Error updating donation:", err);
    toast.error("Error occured while updating donation!");
    }

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
   const onDelete = async(donationId: string) => {
    setShowLoader(true);
    try{ 
        await donationServices.deleteDonation(loc.pincode, donationId).then((donation)=> {
           donationServices.getDonations(loc.pincode).then((donation)=> {
               setDonations(donation);
               setShowLoader(false);
           });
               toast.success(`Donation Deleted Successfully!`);
       });
    }
       catch(err){
        console.log("Error deleting donation:", err);
        toast.error("Error occured while deleting donation!");
    }
   };
   console.log(new Date())
    const onSubmit = async(event: any) => {
        event.preventDefault();
        setShowLoader(true);
        try{ 
            await donationServices.createDonation(loc.pincode, {...newDonation, createdUser: user?.user._id, locationId: loc.pincode}).then((donation)=> {
            !!donations ? setDonations([...donations, donation]) : setDonations([donation]);
            setShowLoader(false);
            toast.success("Donation Created Successfully!");
        });
    }
    catch(err){
        console.log("Error adding donation:", err);
        toast.error("Error occured while adding donation!");
    }
        setShowModal(false);
        setNewDonation(initialDonationState);
    };
    const handleTabChange = (event: any, newValue: number) => {
        setTab(newValue);
      };
    return(
        <DonationsWrap>
        <ToastContainer position="top-center" closeOnClick />
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
  {!!user?.user?._id && <Button onClick={() => setShowModal(true)}>{t('create_donation')}</Button>}
        <Tabs sx={{margin: "15px 0 0 0", "& button": {color: "#123abc"}, "& button.Mui-selected": {color: "#123abc"}}} value={tab} onChange={handleTabChange} aria-label="basic tabs example"   TabIndicatorProps={{sx:{backgroundColor: "#123abc"}}}>
          <Tab sx={{fontSize: "16px", fontWeight: "bold"}} label={t('all_donations')} {...a11yProps(0)} />
          {!!user?.user?._id && <Tab sx={{fontSize: "16px", fontWeight: "bold"}} label={t('my_donations')} {...a11yProps(1)} />}
          <Tab sx={{fontSize: "16px", fontWeight: "bold"}} label={t('donation_metrics')} {...a11yProps(2)} />
        </Tabs>
        {tab === 0 ? !!donations?.length ? 
        (<DonationCardsWrap>
        {donations.map((donation) => {return(<DonationCard donation={donation} handleMakePayment={onChangeDonationAmount} />)} )}
        </DonationCardsWrap>) 
        :  (<NoDataScreen />)
        : tab === 1 ? !!donations?.length ? (<MyDonations donations={donations} onEdit={onEdit} onDelete={onDelete} />)
        : <NoDataScreen />
        : tab === 2 && donations && <DonationMetrics donation={donations} />}
        </DonationsWrap>
    );
}

const DonationsWrap = styled.div`
margin: 10px 25px 25px 25px;
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