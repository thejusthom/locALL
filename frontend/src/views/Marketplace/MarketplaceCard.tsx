import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import {
  Comment,
  Form,
  Image,
  Modal,
  Header,
  FormProps,
  TextAreaProps,
} from "semantic-ui-react";
import React, { ChangeEvent, FormEvent } from "react";
import { Marketplace } from "../../models/marketplace";
import { Box } from "@mui/system";
import marketplaceService from "../../services/marketplaceService";
import image from "../../assets/images/no-image.jpg";

type Props = {
  marketplace: Marketplace;
  active: string;
};

const MarketplaceCard = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");
  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
    value: TextAreaProps
  ) => {
    setText(value.value as string);
  };
  const handleSubmit = () => {
    props.marketplace.comments.push({
      author: "You",
      metaData: "Today",
      text: text,
      avatar: "Profile Pic",
    });
    marketplaceService.updateMarketplace(
      props.marketplace.locationId,
      props.marketplace,
      props.marketplace._id
    );
    setText("");
  };
  return (
    <Box>
      <Card sx={{ width: 320 }}>
        <div>
          <Typography level="title-lg">
            {props.marketplace.productName}
          </Typography>
          <Typography level="body-sm">
            {props.marketplace.listingDate}
          </Typography>
        </div>
        <AspectRatio minHeight="120px" maxHeight="200px">
          <Image
            srcSet={props.marketplace.image}
            loading="lazy"
            alt={props.marketplace.productName}
          />
        </AspectRatio>
        <CardContent orientation="horizontal">
          <div>
            <Typography level="body-xs">Total price:</Typography>
            <Typography fontSize="lg" fontWeight="lg">
              {props.marketplace.price}
            </Typography>
          </div>
          <Button
            variant="solid"
            size="md"
            color="primary"
            aria-label="Explore Bahamas Islands"
            sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
            onClick={() => setOpen(true)}
          >
            Explore
          </Button>
        </CardContent>
      </Card>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Modal.Header>{props.marketplace.productName}</Modal.Header>
        <Modal.Content image scrolling>
          <Image
            size="medium"
            style={{ position: "sticky", top: 0 }}
            src={props.marketplace.image}
            srcSet={props.marketplace.image}
            alt={props.marketplace.productName}
            wrapped
          />

          <Modal.Description style={{ width: "500px" }}>
            <p>{props.marketplace.description}</p>
            <Box sx={{ display: "flex", position: "relative" }}>
              <Box sx={{ width: "300px", float: "left" }}>
                <p style={{ margin: 0 }}>
                  Posted by{" "}
                  {typeof props.marketplace.createdUser === "string"
                    ? ""
                    : props.marketplace.createdUser.person.firstName}{" "}
                  {typeof props.marketplace.createdUser === "string"
                    ? ""
                    : props.marketplace.createdUser.person.lastName}
                </p>
                <Typography level="body-sm">
                  &nbsp; &nbsp; on {props.marketplace.listingDate}
                </Typography>
              </Box>
              <Box sx={{ float: "right", position: "absolute", right: 0 }}>
                <Typography level="body-xs" fontSize="xl">
                  Total price:
                </Typography>
                <Typography fontSize="lg" fontWeight="lg">
                  {props.marketplace.price}
                </Typography>
              </Box>
            </Box>

            <Comment.Group>
              <Header as="h3" dividing>
                Comments
              </Header>
              {props.marketplace.comments.map((comment) => (
                <Comment>
                  <Comment.Avatar
                    src={comment.avatar}
                    srcSet={[comment.avatar, image]}
                  />
                  <Comment.Content>
                    <Comment.Author as="span">{comment.author}</Comment.Author>
                    <Comment.Metadata>
                      <div>{comment.metaData}</div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.text}</Comment.Text>
                  </Comment.Content>
                </Comment>
              ))}

              <Form onSubmit={handleSubmit}>
                <Form.TextArea
                  placeholder="Write your comments here"
                  name="text"
                  value={text}
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
    </Box>
  );
};

export default MarketplaceCard;
