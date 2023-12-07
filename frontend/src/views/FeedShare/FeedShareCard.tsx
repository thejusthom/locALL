import FeedShare from "../../models/feedShare";
import '../../assets/styles/feedshare.scss';
import { Comment, Form, Image, Modal, Header,FormProps, TextAreaProps } from "semantic-ui-react";
import { Box } from "@mui/system";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import React, { ChangeEvent, FormEvent } from "react";
import feedshareService from "../../services/feedshareService";
import EditIcon from "../../assets/images/edit-icon.svg";
import DeleteIcon from "../../assets/images/delete-icon.svg";

type Props = {
    feedShare: FeedShare;
}

const FeedShareCard: React.FC<Props> = (props: Props): React.ReactElement => {

    const handleSubmit = () => {
         props.feedShare.comments.push({author: "You", metaData: "Today", text: text, avatar: "Profile Pic"});
         feedshareService.updateFeedshare(props.feedShare.locationId, props.feedShare, props.feedShare._id);
         setText('');
      };

    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState('');
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>,value: TextAreaProps) => {
        setText(value.value as string);
        console.log(props.feedShare.createdUser);
      }

      const onEdit = () => {
        feedshareService.getFeedshareById(props.feedShare.locationId, props.feedShare._id).then((event)=> {
            console.log(event);
            // setNewEvent(event);
            // setCoordinates({...event.address});
            // setStartDate(startDate);
            // setEndDate(new Date(event.endDate));
            // setOrganiser(event.organiser);
            // setIsEdit(true);
            // setEventId(eventId);
            // setShowModal(true);
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
                <h2>{props.feedShare.address}</h2>
                <img src={EditIcon} width={25} height={25} onClick={() => onEdit()} />
                 <img src={DeleteIcon} width={25} height={25} onClick={() => onDelete()} />
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
                        ? "" :props.feedShare.createdUser.person?.firstName}{" "}
                        {typeof props.feedShare.createdUser === "string"
                        ? "" :props.feedShare.createdUser.person?.lastName}
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