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

const FeedShareView: React.FC = () => {
    // get data from json
    // const feedShareCards = [...feedShare];
    const [formOpen, setFormOpen] = React.useState(false);
    const[feedShareCards, setFeedShareCards] = useState([] as FeedShare[]);
    const locationId = useSelector((state: any) => state.location.pincode);
    const [selectedLocation, setSelectedLocation] = React.useState("");
    const [coordinates, setCoordinates] = React.useState({latitude: 0, longitude: 0});
    const [add,setAdd] = React.useState('');

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
        console.log(locationId);
        feedShareService.getFeedshare(locationId).then((feedShareCards)=> setFeedShareCards(feedShareCards));
    },[locationId]);

    const [inputData, setInputData] = React.useState({
        image: '',
        foodType: '',
        servings: 0,
        organizer: '',
        address: '',
        postedDate: '',
        comments: [],
        locationId: ''
    });

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setInputData({
            ...inputData,
            [name]: value
        });
    };

    const addFeedShare = () => {
        const feedShare: FeedShare = {
            image: inputData.image,
            foodType: inputData.foodType,
            servings: inputData.servings,
            organizer: inputData.organizer,
            address: selectedLocation,
            postedDate: new Date().toLocaleDateString(),
            comments: [],
            locationId: locationId,
            _id: 0,
            createdUser: '656c0c6e058e16521ca0e166'
        }
        feedShareService.addFeedshare(locationId, feedShare).then((feedShareCards)=> setFeedShareCards(feedShareCards));
    }

    return(
        <div>
            <div className="new-feedshare">
                <span>Have leftovers? Share them </span>
                <button className="new-button" onClick={() => setFormOpen(true)}>here</button>
            </div>
            
            <Modal
            open={formOpen}
            onClose={() => setFormOpen(false)}
            onOpen={() => setFormOpen(true)}
            >
                <Modal.Header>Enter food details</Modal.Header>    
                <Form>            
                    <Form.Group grouped>
                    <Form.Field required label='Food Type' control='input' width={8}
                        value = {inputData.foodType}/>
                    {/* <Form.Field label='An HTML <select>' control='select'>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                    </Form.Field> */}
                    <Form.Field required label='Servings' control='input' width={6}
                        value = {inputData.servings}/>
                    <Form.Field required label='Organizer' control='input' width={8}
                        value = {inputData.organizer}/>
                    <Form.Field required label='Location'/>
                    <SearchBox 
                    accessToken={'pk.eyJ1IjoiYXNobWl5YS12aWpheWFjaGFuZHJhbiIsImEiOiJjbHBnMXRxc3oxaXd3MmlwcG5zZjBpdXNqIn0.GqCCjkCcmFsgrpMnl7ntzw'}
                    value={selectedLocation}
                    onRetrieve={onLocationChange}
                    />
                    <Form.Input
                        fluid
                        label="Upload your images here"
                        type="file"
                        id="image"
                        // required
                        onChange={handleOnChange}
                    />
                    </Form.Group>
                    {/* <label>HTML radios</label>                    
                    <Form.Field
                        label='This one'
                        control='input'
                        type='radio'
                        name='htmlRadios'
                    />
                    <Form.Field
                        label='That one'
                        control='input'
                        type='radio'
                        name='htmlRadios'
                    /> */}
                    {/* 
                    <Form.Group grouped>
                    <label>HTML checkboxes</label>
                    <Form.Field label='This one' control='input' type='checkbox' />
                    <Form.Field label='That one' control='input' type='checkbox' />
                    </Form.Group>
                    <Form.Field label='An HTML <textarea>' control='textarea' rows='3' />
                    <Form.Field label='An HTML <button>' control='button'>
                    HTML Button
                    </Form.Field> */}
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
                <FeedShareCard feedShare = {feedShareCard}></FeedShareCard>
            ))}
        </div>
    )
}

export default FeedShareView;