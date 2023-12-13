import FeedShare from "../../models/feedShare"
import { useEffect, useState } from "react";
import FeedShareCard from "./FeedShareCard";
import { useSelector } from 'react-redux'
import feedShareService from "../../services/feedshareService";
import { Form, Modal, Image } from "semantic-ui-react";
import React from "react";
import '../../assets/styles/feedshare.scss';
import { SearchBox } from '@mapbox/search-js-react';
import Button from "@mui/joy/Button";
import moment from "moment";
import { Tab } from "@mui/material";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { ToastContainer, toast } from "react-toastify";
import NoDataScreen from "../../common/_NoDataScreen";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const FeedShareView: React.FC = () => {
    const { t } = useTranslation('common');

    const [formOpen, setFormOpen] = React.useState(false);
    const locationId = useSelector((state: any) => state.location.pincode);
    const [selectedLocation, setSelectedLocation] = React.useState("");
    const [coordinates, setCoordinates] = React.useState({ latitude: 0, longitude: 0 });
    const [add, setAdd] = React.useState('');
    const [update, setUpdate] = useState(false);
    const [tab, setTab] = React.useState('0');
    const user = useSelector((state: any) => state.user);
    const [allFeedshare, setAllFeedshare] = useState([] as FeedShare[]);
    const [myFeedshare, setMyFeedshare] = useState([] as FeedShare[]);


    /**
     * Handles the change event when the location is updated.
     * 
     * @param event - The event object containing the location change information.
     */
    const onLocationChange = (event: any) => {
        const location = event?.features[0]?.geometry?.coordinates;
        setCoordinates({ longitude: location[0], latitude: location[1] });
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

    /**
     * Toggles the update state between true and false.
     */
    const afterUpdate = () => {
        if (update === false) {
            setUpdate(true);
        } else {
            setUpdate(false);
        }
    };

    /**
     * Fetches feedshare data based on the location ID and updates the state variables.
     * 
     * @param {string} locationId - The ID of the location.
     * @param {boolean} update - A flag indicating whether to update the data.
     * @param {string} userId - The ID of the user.
     * @returns {void}
     */
    useEffect(() => {
        feedShareService.getFeedshare(locationId).then((feedShareCards) => setAllFeedshare(feedShareCards));
        feedShareService.getFeedshareByUser(locationId, user?.user?._id).then((feedShareCards) => setMyFeedshare(feedShareCards));
    }, [locationId, update, user?.user?._id]);

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
        setSelectedLocation('');
        setInputData(clData);
    };

    /**
     * Handles the change event of an input element.
     * @param event - The change event.
     */
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
        setInputData({ ...inputData });
        updateData[id as keyof typeof updateData] = event.target.value;
        setInputData(updateData);
    };

    /**
     * Adds a new feed share.
     * 
     * @returns {Promise<void>} A promise that resolves when the feed share is added successfully.
     */
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
            createdUser: user?.user?._id,
            _id: null,
        }
        try {
            await feedShareService
                .createFeedshare(feedShare.locationId, feedShare)
                .then(() => {
                    allFeedshare.push(feedShare);
                    myFeedshare.push(feedShare);
                    setUpdate(true);
                    setFormOpen(false);
                    clearFormData();
                    toast.success("Feedshare added Successfully!");
                });
        }
        catch (err) {
            console.log("Error adding feedshare:", err);
            toast.error("Error occured while adding feedshare!");
        }
    }

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    /**
     * Handles the change of the tab in the FeedShareView component.
     * 
     * @param {any} event - The event object triggered by the tab change.
     * @param {string} newValue - The new value of the selected tab.
     * @returns {void}
     */
    const handleTabChange = (event: any, newValue: string) => {
        setTab(newValue);
        if (newValue === '0') {
            feedShareService.getFeedshare(locationId).then((event) => {
                setAllFeedshare(event);
            });
        } else if (newValue === '1') {
            feedShareService.getFeedshareByUser(locationId, user?.user?._id).then((event) => {
                setMyFeedshare(event);
            });
        }
    };

    return (
        /**
         * Renders the FeedShareView component.
         * 
         * @returns The JSX element representing the FeedShareView component.
         */
        <FeedShareWrap>
            <ToastContainer position="top-center" closeOnClick />
            <TabContext value={tab}>
                <TabList sx={{ margin: "0 0 0 0", "& button": { color: "#123abc" }, "& button.Mui-selected": { color: "#123abc" } }} onChange={handleTabChange} aria-label="basic tabs example" TabIndicatorProps={{ sx: { backgroundColor: "#123abc" } }}>
                    <Tab sx={{ fontSize: "16px", fontWeight: "bold" }} label={t('all_feedshare')} value="0" {...a11yProps(0)} />
                    {user?.isLoggedIn && <Tab sx={{ fontSize: "16px", fontWeight: "bold" }} label={t('my_feedshare')} value="1" {...a11yProps(1)} />}
                </TabList>
                <TabPanel value="0">
                    {
                        allFeedshare.length === 0 ? <NoDataScreen /> :
                            allFeedshare.map((feedShareCard: FeedShare) => (
                                <FeedShareCard
                                    feedShare={feedShareCard}
                                    afterUpdate={afterUpdate}
                                    type="all" />
                            ))
                    }

                </TabPanel>
                <TabPanel value="1">
                    <div className="new-feedshare">
                        <Button className="new-button" onClick={() => setFormOpen(true)} sx={{ bgcolor: "#123abc", margin: "-5px 0 10px -10px" }}>{t('new_listing')}</Button>
                    </div>
                    {
                        myFeedshare.length === 0 ? <NoDataScreen /> :
                            myFeedshare.map((feedShareCard: FeedShare) => (
                                <FeedShareCard
                                    feedShare={feedShareCard}
                                    afterUpdate={afterUpdate}
                                    type="my" />
                            ))}
                </TabPanel>
            </TabContext>
            <Modal
                open={formOpen}
                onClose={() => {
                    setFormOpen(false);
                    clearFormData();
                }}
                onOpen={() => setFormOpen(true)}
            >
                <Modal.Header>Enter food details</Modal.Header>
                <Form>
                    <Form.Group grouped>
                        <Form.Field required label='Food Type' control='input' width={8}
                            value={inputData.foodType}
                            onChange={handleOnChange}
                            id="foodType" />
                        <Form.Field required label='Servings' control='input' width={6}
                            value={inputData.servings}
                            onChange={handleOnChange}
                            id="servings" />
                        <Form.Field required label='Organizer' control='input' width={8}
                            value={inputData.organizer}
                            onChange={handleOnChange}
                            id="organizer" />
                        <Form.Field required label='Location' />
                        {!!process.env.REACT_APP_MAPBOX_API_KEY &&
                            <SearchBox
                                accessToken={process.env.REACT_APP_MAPBOX_API_KEY}
                                value={selectedLocation}
                                onRetrieve={onLocationChange}
                            />}
                        <Form.Input
                            fluid
                            label="Upload your images here"
                            type="file"
                            id="image"
                            required
                            onChange={handleOnChange}
                        />
                        <Image
                            size="medium"
                            style={{ position: "sticky", top: 0 }}
                            src={inputData.image}
                            srcSet={inputData.image}
                            alt={"No images added"}
                            label="Image Preview"
                            wrapped
                        />
                    </Form.Group>
                    <Button type="submit" onClick={addFeedShare}
                        size="md"
                        color="success"
                        sx={{ float: "right", ml: 2, mr: 3, mb: 1, fontWeight: 600 }}
                        disabled={
                            !inputData.foodType ||
                            !inputData.servings ||
                            !inputData.organizer ||
                            !inputData.image ||
                            !selectedLocation
                        }>
                        Post</Button>
                    <Button
                        variant="solid"
                        size="md"
                        color="danger"
                        sx={{ float: "left", ml: 2, mr: 3, mb: 1, fontWeight: 600 }}
                        onClick={() => {
                            setFormOpen(false);
                            clearFormData();
                        }}
                    >
                        Close
                    </Button>
                </Form>
            </Modal>
        </FeedShareWrap>
    )
}

const FeedShareWrap = styled.div`
margin: 10px 25px 25px 25px;
`;

export default FeedShareView;