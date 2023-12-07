import FeedShare from "../../models/feedShare"
import { useEffect, useState } from "react";
import FeedShareCard from "./FeedShareCard";
import { useSelector } from 'react-redux'
import feedShareService from "../../services/feedshareService";
import { Comment, Form, Image, Modal, Header,FormProps, TextAreaProps } from "semantic-ui-react";
import React from "react";
import '../../assets/styles/feedshare.scss';
import { SearchBox } from '@mapbox/search-js-react';
import { render } from "@testing-library/react";
import Button from "@mui/joy/Button";
import moment from "moment";
import { Tab, Tabs } from "@mui/material";

const FeedShareView: React.FC = () => {
    // get data from json
    // const feedShareCards = [...feedShare];
    const [formOpen, setFormOpen] = React.useState(false);
    const[feedShareCards, setFeedShareCards] = useState([] as FeedShare[]);
    const locationId = useSelector((state: any) => state.location.pincode);
    const [selectedLocation, setSelectedLocation] = React.useState("");
    const [coordinates, setCoordinates] = React.useState({latitude: 0, longitude: 0});
    const [add,setAdd] = React.useState('');
    const [update, setUpdate] = useState(false);
    const [tab, setTab] = React.useState(0);

    const onLocationChange = (event: any) => {
        const location = event?.features[0]?.geometry?.coordinates;
        setCoordinates({longitude: location[0], latitude: location[1]});
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${location[1]}&lon=${location[0]}&format=json`, {
    headers: {
    'User-Agent': 'ID of your APP/service/website/etc. v0.1'
    }
    }).then(res => res.json())
    .then(res => {
    setAdd(res.address.postcode)
    const address = event?.features[0]?.properties?.full_address;
    setSelectedLocation(!!address ? address : res.address.postcode);
    })   
    };

    useEffect(()=>{
        // console.log(locationId);
        feedShareService.getFeedshare(locationId).then((feedShareCards)=> setFeedShareCards(feedShareCards));
    },[locationId]);

    const [inputData, setInputData] = React.useState({
        image: '',
        foodType: '',
        servings: '',
        organizer: '',
        address: '',
        postedDate: '',
        locationId: ''
    });

    const clearFormData = () => {
        const clData = {
            image: '',
            foodType: '',
            servings: '',
            organizer: '',
            address: '',
            postedDate: '',
            locationId: ''
        };
        setInputData(clData);
      };

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const id = event.target.id;
        const updateData = { ...inputData };
        if (
            event.target instanceof HTMLInputElement &&
            event.target.type === "file"
          ) {
            const file = event.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onloadend = () => {
                reader.result as string;
                updateData[id as keyof typeof updateData] = reader.result as string;
                console.log(updateData);
                setInputData(updateData);
              };
              return;
            }
          }
        setInputData({...inputData});
        updateData[id as keyof typeof updateData] = event.target.value;
        setInputData(updateData);
    };   

    const addFeedShare = async () => {
        console.log(add);
        const feedShare: FeedShare = {
            image: inputData.image,
            foodType: inputData.foodType,
            servings: inputData.servings,
            organizer: inputData.organizer,
            address: selectedLocation,
            postedDate: moment().format("MMMM Do YYYY, h:mm:ss a"),
            comments: [],
            locationId: add,
            _id: null,
            createdUser: '656c0c6e058e16521ca0e166'
        }
        await feedShareService
            .createFeedshare(feedShare.locationId, feedShare)
            .then(()=> {
                feedShareCards.push(feedShare); 
                setUpdate(true); 
                setFormOpen(false);
                clearFormData();
            });
    }

    function a11yProps(index: number) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }
      
    const handleTabChange = (event: any, newValue: number) => {
        feedShareService.getFeedshareByUser(locationId, "656c0c6e058e16521ca0e166").then((event)=> {
            setFeedShareCards(event)});
        setTab(newValue);
        console.log(event);     
      };

    return(
        <div>
            <div className="new-feedshare">
                <Button className="new-button" onClick={() => setFormOpen(true)}>New Listing</Button>
            </div>
            <Tabs sx={{margin: "15px 0 0 0"}} value={tab} onChange={handleTabChange} aria-label="basic tabs example">
                <Tab sx={{fontSize: "16px", fontWeight: "bold"}} label="All Feedshare" {...a11yProps(0)} />
                <Tab sx={{fontSize: "16px", fontWeight: "bold"}} label="My Feedshare" {...a11yProps(1)} />
            </Tabs>
            <Modal
            open={formOpen}
            onClose={() => setFormOpen(false)}
            onOpen={() => setFormOpen(true)}
            >
                <Modal.Header>Enter food details</Modal.Header>    
                <Form>            
                    <Form.Group grouped>
                    <Form.Field required label='Food Type' control='input' width={8}
                        value = {inputData.foodType}
                        onChange = {handleOnChange}
                        id="foodType"/>
                    {/* <Form.Field label='An HTML <select>' control='select'>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                    </Form.Field> */}
                    <Form.Field required label='Servings' control='input' width={6}
                        value = {inputData.servings}
                        onChange = {handleOnChange}
                        id="servings"/>
                    <Form.Field required label='Organizer' control='input' width={8}
                        value = {inputData.organizer}
                        onChange = {handleOnChange}
                        id="organizer"/>
                    <Form.Field required label='Location'/>
                   {!!process.env.REACT_APP_MAPBOX_API_KEY && <SearchBox 
                    accessToken={process.env.REACT_APP_MAPBOX_API_KEY}
                    value={selectedLocation}
                    onRetrieve={onLocationChange}
                    />}
                    <Form.Input
                        fluid
                        label="Upload your images here"
                        type="file"
                        id="image"
                        // required
                        onChange={handleOnChange}
                    />
                    </Form.Group>                    
                    <Button type="submit" onClick={addFeedShare}>Post</Button>
                    <Button
                    variant="solid"
                    size="md"
                    color="primary"
                    aria-label="Explore Bahamas Islands"
                    sx={{ ml: 98, alignSelf: "right", fontWeight: 600 }}
                    onClick={() => setFormOpen(false)}
                    >
                    Close
                    </Button>
                </Form>
            </Modal>
            {
                feedShareCards.map((feedShareCard: FeedShare) => ( 
                <FeedShareCard feedShare = {feedShareCard}/>
            ))}
        </div>
    )
}

export default FeedShareView;