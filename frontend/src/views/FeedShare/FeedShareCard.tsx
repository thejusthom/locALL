import FeedShare from "../../models/feedShare";
import '../../assets/styles/feedshare.scss';
import { Comment, Form, Image, Modal, Header,FormProps, TextAreaProps } from "semantic-ui-react";
import { Box } from "@mui/system";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import feedshareService from "../../services/feedshareService";
import EditIcon from "../../assets/images/edit-icon.svg";
import DeleteIcon from "../../assets/images/delete-icon.svg";
import moment from "moment";
import { SearchBox } from '@mapbox/search-js-react';
import { set } from "mongoose";

type Props = {
    feedShare: FeedShare;
    afterUpdate: () => void;
}

const FeedShareCard = (props: Props): React.ReactElement => {

    const handleSubmit = () => {
         props.feedShare.comments.push({author: "You", metaData: "Today", text: text, avatar: "Profile Pic"});
         feedshareService.updateFeedshare(props.feedShare.locationId, props.feedShare, props.feedShare._id);
         setText('');
      };

    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState('');
    const [editFormOpen, setEditFormOpen] = React.useState(false);
    const [selectedLocation, setSelectedLocation] = React.useState("");
    const [coordinates, setCoordinates] = React.useState({latitude: 0, longitude: 0});
    const [add,setAdd] = React.useState('');
    const [update, setUpdate] = useState(false);
    const [inputData, setInputData] = React.useState({
        image: props.feedShare.image,
        foodType: props.feedShare.foodType,
        servings: props.feedShare.servings,
        organizer: props.feedShare.organizer,
        address: props.feedShare.address,
        locationId: props.feedShare.locationId,
        postedDate: props.feedShare.postedDate,
    });

    useEffect(() => {
        const clData = {
        image: props.feedShare.image,
        foodType: props.feedShare.foodType,
        servings: props.feedShare.servings,
        organizer: props.feedShare.organizer,
        address: props.feedShare.address,
        locationId: props.feedShare.locationId,
        postedDate: props.feedShare.postedDate,
        };
        setInputData(clData);
      }, [props.feedShare]);

    const fillInputData = () => {
        console.log("fill");
        props.afterUpdate();
        const filledData = {
            image: props.feedShare.image,
            foodType: props.feedShare.foodType,
            servings: props.feedShare.servings,
            organizer: props.feedShare.organizer,
            address: props.feedShare.address,
            locationId: props.feedShare.locationId,
            postedDate: props.feedShare.postedDate,
        };
        setInputData(filledData);
    }

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
                setInputData(updateData);
              };
              return;
            }
          }
        setInputData({...inputData});
        updateData[id as keyof typeof updateData] = event.target.value;
        setInputData(updateData);
    };
    
    const updateFeedShare = async () => {
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
        await feedshareService
            .updateFeedshare(props.feedShare.locationId, props.feedShare, props.feedShare._id)
            .then(()=> {
                setUpdate(false);
                clearFormData();
                props.afterUpdate();
            });
    }

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

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>,value: TextAreaProps) => {
        setText(value.value as string);
        console.log(props.feedShare.createdUser);
      }

      const onEdit = () => {
        feedshareService.getFeedshareById(props.feedShare.locationId, props.feedShare._id).then((event)=> {
            console.log(event);

            });
        };

        const onDelete = () => {
            feedshareService.deleteFeedshare(props.feedShare.locationId, props.feedShare._id).then((event)=> {
                feedshareService.getFeedshare(props.feedShare.locationId).then((feedShareCards)=> feedShareCards(feedShareCards));
            })
        }
        return(
            <>
            
            <div className="blog-card">
                <div className="meta">
                {/* <div className="photo"></div> */}
                <img className="photo" src={props.feedShare.image}></img>
                <ul className="details">
                    <li className="author"><a href="#">{props.feedShare.organizer}</a></li>
                    <li className="date">{props.feedShare.postedDate}</li>
                    {/* <li className="tags">
                    <ul>
                        <li><a href="#">Learn</a></li>
                        <li><a href="#">Code</a></li>
                        <li><a href="#">HTML</a></li>
                        <li><a href="#">CSS</a></li>
                    </ul>
                    </li> */}
                </ul>
                </div>
                <div className="description">
                <h1>{props.feedShare.foodType}</h1>
                <img src={EditIcon} width={25} height={25} onClick={() => setEditFormOpen(true)} />
                <img src={DeleteIcon} width={25} height={25} onClick={() => onDelete()} />
                <h2>{props.feedShare.address}</h2>                
                <p>{props.feedShare.organizer}</p>
                <p className="read-more">
                    <button onClick={() => setOpen(true)}>Read More</button>
                </p>
                </div>
            </div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
            >
                <Modal.Header>{props.feedShare.foodType}</Modal.Header>
                <Modal.Content image scrolling>
                <Image
                    size="medium"
                    style={{ position: "sticky", top: 0 }}
                    src={`data:image/png;base64,${props.feedShare.image}`}
                    alt={props.feedShare.foodType}
                    wrapped
                />                
                <Modal.Description style={{ width: "500px" }}>
                    <p>{props.feedShare.address}</p>
                    <Box sx={{ display: "flex", position: "relative" }}>
                    <Box sx={{ width: "300px", float: "left" }}>
                        <p style={{ margin: 0 }}>
                        Posted by{" "}
                        {typeof props.feedShare.createdUser === "string"
                        ? "" :props.feedShare.createdUser.person.firstName}{" "}
                        {typeof props.feedShare.createdUser === "string"
                        ? "" :props.feedShare.createdUser.person.lastName}
                        </p>
                        <Typography level="body-sm">
                        &nbsp; &nbsp; on {props.feedShare.postedDate}
                        </Typography>
                    </Box>
                    <Box sx={{ float: "right", position: "absolute", right: 0 }}>
                        <Typography level="body-xs" fontSize="xl">
                        Servings:
                        </Typography>
                        <Typography fontSize="lg" fontWeight="lg">
                        {props.feedShare.servings}
                        </Typography>
                    </Box>
                    </Box>

                    <Comment.Group>
                    <Header as="h3" dividing>
                        Comments
                    </Header>
                    {props.feedShare.comments.map((comment) => (
                    <Comment>
                        <Comment.Avatar src={`data:image/png;base64,${comment.avatar}`} />
                        <Comment.Content>
                        <Comment.Author as='span'>{comment.author}</Comment.Author>
                        <Comment.Metadata>
                            <div>{comment.metaData}</div>
                        </Comment.Metadata>
                        <Comment.Text>{comment.text}</Comment.Text>
                        </Comment.Content>
                    </Comment> ))}
        
                    <Form onSubmit={handleSubmit}>
                        <Form.TextArea placeholder='Write your comments here'
                    name='text' value={text}
                    onChange={handleChange}
                    />
                <Button type="submit">Post</Button>
                    </Form>
                    </Comment.Group>
                    </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                <Button
                    variant="solid"
                    size="md"
                    color="primary"
                    aria-label="Explore Bahamas Islands"
                    sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
                    onClick={() => setOpen(false)}
                >
                    Close
                </Button>
                </Modal.Actions>
            </Modal>

            <Modal
            dimmer="inverted"
            open={editFormOpen}
                    onClose={() => {
                        console.log("close");
                        fillInputData();
                        setEditFormOpen(false);
                        setUpdate(false);
                        clearFormData();
                    }
                    }
                    onOpen={() => {
                        console.log("open");
                        setEditFormOpen(true);
                        fillInputData();
                    }
                    }
                >
                <Modal.Header>Edit</Modal.Header>    
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
                   {!!process.env.REACT_APP_MAPBOX_API_KEY && 
                   <SearchBox 
                    accessToken={'pk.eyJ1IjoiYXNobWl5YS12aWpheWFjaGFuZHJhbiIsImEiOiJjbHBnMXRxc3oxaXd3MmlwcG5zZjBpdXNqIn0.GqCCjkCcmFsgrpMnl7ntzw'}
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
                    <Button 
                    variant="solid"
                    size="md"
                    color="primary"
                    aria-label="Explore Bahamas Islands"
                    sx={{float: "right", ml:2, mr: 3, mb: 1, fontWeight: 600}}
                    type="submit" onClick={updateFeedShare}>Update</Button>
                    <Button
                    variant="solid"
                    size="md"
                    color="primary"
                    aria-label="Explore Bahamas Islands"
                    sx={{float: "left", ml:2, mr: 3, mb: 1, fontWeight: 600}}
                    onClick={() => setEditFormOpen(false)}
                    >
                    Close
                    </Button>
                </Form>
            </Modal>            


            {/* <div className="blog-card alt">
                <div className="meta">
                <img className="photo" src="https://storage.googleapis.com/chydlx/codepen/blog-cards/image-2.jpg"></img>
                <ul className="details">
                    <li className="author"><a href="#">{props.feedShare.organizer}</a></li>
                    <li className="date">July. 15, 2015</li>
                    <li className="tags">
                    <ul>
                        <li><a href="#">Learn</a></li>
                        <li><a href="#">Code</a></li>
                        <li><a href="#">JavaScript</a></li>
                    </ul>
                    </li>
                </ul>
                </div>
                <div className="description">
                <h1>Mastering the Language</h1>
                <h2>Java is not the same as JavaScript</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.</p>
                <p className="read-more">
                    <a href="#">Read More</a>
                </p>
                </div>
            </div> */}
            </>
        )    
}

export default FeedShareCard;