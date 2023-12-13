import FeedShare from "../../models/feedShare";
import '../../assets/styles/feedshare.scss';
import { Comment, Form, Image, Modal, Header, TextAreaProps } from "semantic-ui-react";
import { Box } from "@mui/system";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import React, { ChangeEvent, useEffect, useState } from "react";
import feedshareService from "../../services/feedshareService";
import EditIcon from "../../assets/images/edit-icon.svg";
import DeleteIcon from "../../assets/images/delete-icon.svg";
import moment from "moment";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Avatar } from "@mui/material";

type Props = {
    feedShare: FeedShare;
    afterUpdate: () => void;
    type: string;
}

const FeedShareCard = (props: Props): React.ReactElement => {
    const { t } = useTranslation('common');
    /**
     * Handles the submission of the feed share form.
     */
    const handleSubmit = () => {
        props.feedShare.comments.push({
            author: user?.user?.person?.firstName,
            metaData: moment().format("MMMM Do YYYY, h:mm:ss a"),
            text: text,
            avatar: "Profile Pic"
        });
        feedshareService.updateFeedshare(props.feedShare.locationId, props.feedShare, props.feedShare._id);
        setText('');
    };

    const user = useSelector((state: any) => state.user);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState('');
    const [editFormOpen, setEditFormOpen] = React.useState(false);
    const [selectedLocation, setSelectedLocation] = React.useState("");
    const [coordinates, setCoordinates] = React.useState({ latitude: 0, longitude: 0 });
    const [add, setAdd] = React.useState('');
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

    /**
     * Sets the input data for the FeedShareCard component based on the props.feedShare object.
     * @param {Object} props - The props object containing the feedShare data.
     * @param {Object} props.feedShare - The feedShare object containing the data for the card.
     * @param {string} props.feedShare.image - The image URL for the feedShare.
     * @param {string} props.feedShare.foodType - The type of food for the feedShare.
     * @param {number} props.feedShare.servings - The number of servings available in the feedShare.
     * @param {string} props.feedShare.organizer - The name of the organizer of the feedShare.
     * @param {string} props.feedShare.address - The address of the feedShare location.
     * @param {string} props.feedShare.locationId - The ID of the feedShare location.
     * @param {string} props.feedShare.postedDate - The date when the feedShare was posted.
     */
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

    /**
     * Handles the change event for the input fields in the FeedShareCard component.
     * @param event - The change event object.
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
     * Updates the feed share with the provided data.
     * @returns {Promise<void>} A promise that resolves when the feed share is successfully updated.
     */
    const updateFeedShare = async (): Promise<void> => {
        const feedShare: FeedShare = {
            image: inputData.image,
            foodType: inputData.foodType,
            servings: inputData.servings,
            organizer: inputData.organizer,
            address: props.feedShare.address,
            postedDate: moment().format("MMMM Do YYYY, h:mm:ss a"),
            comments: [],
            locationId: props.feedShare.locationId,
            _id: props.feedShare._id,
            createdUser: user?.user?._id
        }
        console.log(feedShare);
        try {
            console.log(props.feedShare);
            await feedshareService
                .updateFeedshare(props.feedShare.locationId, feedShare, props.feedShare._id)
                .then(() => {
                    setUpdate(false);
                    clearFormData();
                    props.afterUpdate();
                    setEditFormOpen(false);
                    toast.success("Feedshare edited Successfully!");
                });
        } catch (error) {
            toast.error("Feedshare update failed!");
            console.error("Error updating listing:", error);
        }
    }

    /**
     * Clears the form data by resetting the input fields to their initial values.
     */
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

    /**
     * Handles the change event of the textarea element.
     * 
     * @param e - The change event object.
     * @param value - The value of the textarea.
     */
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>, value: TextAreaProps) => {
        setText(value.value as string);
        console.log(props.feedShare.createdUser);
    }

    /**
     * Handles the delete confirmation for the feedshare.
     * 
     * @returns A promise that resolves when the feedshare is deleted successfully.
     */
    const handleDeleteConfirm = async () => {
        try {
            await feedshareService
                .deleteFeedshare(props.feedShare.locationId, props.feedShare._id)
                .then(() => {
                    setIsDeleteModalOpen(false);
                    props.afterUpdate();
                    toast.success("Feedshare deleted Successfully!");
                });
        } catch (error) {
            console.error("Error deleting listing:", error);
        }
    };

    /**
     * Handles the cancel action for the delete operation.
     */
    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false);
    };

    return (
        <>
            <ToastContainer position="top-center" closeOnClick />
            <div className="blog-card">
                <div className="meta">
                    <img className="photo" src={props.feedShare.image}></img>
                    <ul className="details">
                        <li className="author"><a href="#">
                            {typeof props.feedShare.createdUser === "string"
                                ? "" : props.feedShare.createdUser?.person?.firstName}{" "}
                            {typeof props.feedShare.createdUser === "string"
                                ? "" : props.feedShare.createdUser?.person?.lastName}
                        </a></li>
                        <li className="date">{props.feedShare.postedDate}</li>
                    </ul>
                </div>
                <div className="description">
                    <h1>{props.feedShare.foodType}</h1>
                    {props.type === "my" && <img src={EditIcon} width={25} height={25} onClick={() => setEditFormOpen(true)} />}
                    {props.type === "my" && <img src={DeleteIcon} width={25} height={25} onClick={() => setIsDeleteModalOpen(true)} />}
                    <h2>{props.feedShare.address}</h2>
                    <p>{props.feedShare.organizer}</p>
                    <p className="read-more">
                        <button onClick={() => setOpen(true)}>{t('read_more')}</button>
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
                        style={{ position: "sticky", top: 0, height: '100%', width: '100%' }}
                        src={props.feedShare.image}
                        alt={props.feedShare.foodType}
                        wrapped
                    />
                    <Modal.Description style={{ width: "500px" }}>
                        <Typography fontSize="xl" fontWeight="lg">Organizer</Typography>
                        <p>{props.feedShare.organizer}</p>
                        <Typography fontSize="xl" fontWeight="lg">Address</Typography>
                        <p>{props.feedShare.address}</p>
                        <Typography fontSize="xl" fontWeight="lg">Servings</Typography>
                        <p>{props.feedShare.servings}</p>
                        <Box sx={{ display: "flex", position: "relative" }}>
                            <Box sx={{ width: "300px", float: "left" }}>
                                <p style={{ margin: 0 }}>
                                    Posted by{" "}
                                    {typeof props.feedShare.createdUser === "string"
                                        ? "" : props.feedShare.createdUser?.person?.firstName}{" "}
                                    {typeof props.feedShare.createdUser === "string"
                                        ? "" : props.feedShare.createdUser?.person?.lastName}
                                </p>
                                <Typography level="body-sm">
                                    &nbsp; &nbsp; on {props.feedShare.postedDate}
                                </Typography>
                            </Box>
                        </Box>

                        <Comment.Group>
                            <Header as="h3" dividing>
                                Comments
                            </Header>
                            {props.feedShare.comments.map((comment, index) => (
                                <Comment key={String(index)}>
                                    {comment.avatar ? (
                                        <Avatar
                                            alt={comment?.author?.toUpperCase()}
                                            src={comment.avatar}
                                            sx={{ float: "left", mr: 1 }}
                                        />
                                    ) : (
                                        <Avatar
                                            alt={comment?.author?.charAt(0).toUpperCase()}
                                            src="/broken-image.jpg"
                                            sx={{ float: "left", mr: 1 }}
                                        />
                                    )}
                                    <Comment.Content>
                                        <Comment.Author as="span">{comment.author}</Comment.Author>
                                        <Comment.Metadata>
                                            <div>{comment.metaData}</div>
                                        </Comment.Metadata>
                                        <Comment.Text>{comment.text}</Comment.Text>
                                    </Comment.Content>
                                </Comment>
                            ))}

                            {user.isLoggedIn && (<Form onSubmit={handleSubmit}>
                                <Form.TextArea placeholder='Write your comments here'
                                    name='text' value={text}
                                    onChange={handleChange}
                                />
                                <Button type="submit">Post</Button>
                            </Form>)}
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
                        <Form.Input
                            fluid
                            label="Upload your images here"
                            type="file"
                            id="image"
                            onChange={handleOnChange}
                        />
                        <Image
                            size="medium"
                            style={{ position: "sticky", top: 0 }}
                            src={inputData.image}
                            srcSet={inputData.image}
                            alt={"No images added"}
                            label="Existing Image"
                            wrapped
                        />
                    </Form.Group>
                    <Button
                        variant="solid"
                        size="md"
                        color="success"
                        aria-label="Explore Bahamas Islands"
                        sx={{ float: "right", ml: 2, mr: 3, mb: 1, fontWeight: 600 }}
                        type="submit"
                        disabled={
                            !inputData.foodType ||
                            !inputData.servings ||
                            !inputData.organizer}
                        onClick={updateFeedShare}>Update</Button>
                    <Button
                        variant="solid"
                        size="md"
                        color="danger"
                        aria-label="Explore Bahamas Islands"
                        sx={{ float: "left", ml: 2, mr: 3, mb: 1, fontWeight: 600 }}
                        onClick={() => setEditFormOpen(false)}
                    >
                        Close
                    </Button>
                </Form>
            </Modal>
            <Modal
                dimmer="inverted"
                open={isDeleteModalOpen}
                onClose={handleDeleteCancel}
            >
                <Modal.Header>Delete Listing</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to delete this listing?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="danger" onClick={handleDeleteConfirm} sx={{ mr: 2 }}>
                        Delete
                    </Button>
                    <Button color="neutral" onClick={handleDeleteCancel}>
                        Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    )
}

export default FeedShareCard;