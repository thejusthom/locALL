// Imports from react
import React, { ChangeEvent, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
// Imports from mui
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { Box } from "@mui/system";
import IconButton from "@mui/joy/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Avatar } from "@mui/material";
// Imports from semantic ui
import {
  Comment,
  Form,
  Image,
  Modal,
  Header,
  TextAreaProps,
} from "semantic-ui-react";
// Imports from project files
import { Marketplace } from "../../models/marketplace";
import marketplaceService from "../../services/marketplaceService";
// Imports for date formatting
import moment from "moment";

// Type of props given to MarketplaceCard
type Props = {
  marketplace: Marketplace;
  active: string;
  afterUpdate: () => void;
};

// MarketplaceCard component
const MarketplaceCard = (props: Props) => {
  // Imports for translation
  const { t } = useTranslation("common");

  // States for the component
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");
  const [update, setUpdate] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    productName: props.marketplace.productName,
    description: props.marketplace.description,
    price: props.marketplace.price,
    image: props.marketplace.image,
  });
  // Get user from redux store
  const user = useSelector((state: any) => state.user);

  // Using useEffect to update the formData state when props.marketplace changes
  useEffect(() => {
    const data = {
      productName: props.marketplace.productName,
      description: props.marketplace.description,
      price: props.marketplace.price,
      image: props.marketplace.image,
    };
    setFormData(data);
  }, [props.marketplace]);
  // Function to clear the form data
  const clearFormData = () => {
    const clData = {
      productName: "",
      description: "",
      price: "",
      image: "",
    };
    setFormData(clData);
  };
  // Function to handle the change in the text area
  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
    value: TextAreaProps
  ) => {
    setText(value.value as string);
  };

  // Function to handle the change in the input fields
  const handleOnChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    const id = event.target.id;
    const updateData = { ...formData };
    // If the input field is of type file, then read the file and update the state
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
          setFormData(updateData);
        };
        return;
      }
    }
    // Update the state with the new value if its not a file
    updateData[id as keyof typeof updateData] = event.target.value;
    setFormData(updateData);
  };

  // Function to handle the submit of the form
  const handleSubmit = async () => {
    props.marketplace.productName = formData.productName;
    props.marketplace.description = formData.description;
    props.marketplace.price = formData.price;
    props.marketplace.image = formData.image;
    try {
      // Send a PUT request to update the listing
      await marketplaceService
        .updateMarketplace(
          props.marketplace.locationId,
          props.marketplace,
          props.marketplace._id
        )
        .then(() => {
          setUpdate(false);
          clearFormData();
          props.afterUpdate();
          toast.success("Listing updated successfully");
        });
    } catch (error) {
      toast.error("Error updating listing");
    }
  };
  // Function to fill the form data
  const fillFormData = () => {
    props.afterUpdate();
    const clData = {
      productName: props.marketplace.productName,
      description: props.marketplace.description,
      price: props.marketplace.price,
      image: props.marketplace.image,
    };
    setFormData(clData);
  };

  // Function to handle the submit of the comments
  const handleCommentsSubmit = async () => {
    props.marketplace.comments.push({
      author:
        user?.user?.person?.firstName + " " + user?.user?.person?.lastName,
      metaData: moment().format("MMMM Do YYYY, h:mm:ss a"),
      text: text,
      avatar: user?.user?.userImage,
    });
    try {
      // Send a PUT request to update the listing
      await marketplaceService.updateMarketplace(
        props.marketplace.locationId,
        props.marketplace,
        props.marketplace._id
      );
      setText("");
    } catch (error) {
      toast.error("Error posting comment");
    }
  };

  // Function to handle the delete confirmation
  const handleDeleteConfirm = async () => {
    try {
      // Send a DELETE request to delete the listing
      await marketplaceService
        .deleteMarketplace(props.marketplace.locationId, props.marketplace._id)
        .then(() => {
          // Close the delete confirmation modal
          setIsDeleteModalOpen(false);
          props.afterUpdate();
          toast.success("Listing deleted successfully");
        });
    } catch (error) {
      toast.error("Error deleting listing");
    }
  };

  // Function to handle the delete cancel
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <Box>
      <ToastContainer position="top-center" closeOnClick />
      <Card sx={{ width: 320, height: 310 }}>
        <div>
          <Typography level="title-lg">
            {props.marketplace.productName}
          </Typography>
          <Typography level="body-sm">
            {props.marketplace.listingDate}
          </Typography>
          {props.active === "my-items" && (
            <Box>
              <IconButton
                aria-label="bookmark Bahamas Islands"
                variant="plain"
                color="neutral"
                size="sm"
                sx={{ position: "absolute", top: "0.875rem", right: "2.5rem" }}
                onClick={() => setUpdate(true)}
              >
                <EditOutlinedIcon />
              </IconButton>
              <IconButton
                aria-label="bookmark Bahamas Islands"
                variant="plain"
                color="neutral"
                size="sm"
                sx={{ position: "absolute", top: "0.875rem", right: "0.5rem" }}
                onClick={() => setIsDeleteModalOpen(true)}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Box>
          )}
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
              ${props.marketplace.price}
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
            {t("explore")}
          </Button>
        </CardContent>
      </Card>
      <Modal
        dimmer="inverted"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onOpen={() => {
          setOpen(true);
        }}
      >
        <Modal.Header>{props.marketplace.productName}</Modal.Header>
        <Modal.Content image scrolling>
          <Image
            size="medium"
            style={{ position: { md: "sticky", xs: "block" }, top: 0 }}
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
                    : props.marketplace.createdUser?.person?.firstName}{" "}
                  {typeof props.marketplace?.createdUser === "string"
                    ? ""
                    : props.marketplace.createdUser?.person?.lastName}
                </p>
                <Typography level="body-sm">
                  &nbsp; &nbsp; on {props.marketplace.listingDate}
                </Typography>
              </Box>
              <Box sx={{ float: "right", position: "absolute", right: 0 }}>
                <Typography level="body-xs" fontSize="xl">
                  Price:
                </Typography>
                <Typography fontSize="lg" fontWeight="lg">
                  ${props.marketplace.price}
                </Typography>
              </Box>
            </Box>

            <Comment.Group>
              <Header as="h3" dividing>
                Comments
              </Header>
              {props.marketplace.comments.map((comment, index) => (
                <Comment key={String(index)}>
                  {comment.avatar ? (
                    <Avatar
                      alt={comment.author.toUpperCase()}
                      src={comment.avatar}
                      sx={{ float: "left", mr: 1 }}
                    />
                  ) : (
                    <Avatar
                      alt={comment?.author?.charAt(0).toUpperCase()}
                      src="/broken-image.jpg"
                      sx={{ float: "left", mr: 1 }}
                    />
                    // <Comment.Avatar
                    //   alt={comment.author.toUpperCase()}
                    //   src="/broken-image.jpg"
                    // />
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

              {user.isLoggedIn && (
                <Form onSubmit={handleCommentsSubmit}>
                  <Form.TextArea
                    placeholder="Write your comments here"
                    name="text"
                    value={text}
                    onChange={handleChange}
                  />
                  <Button type="submit" disabled={!text}>
                    Post
                  </Button>
                </Form>
              )}
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
        open={update}
        onClose={() => {
          fillFormData();
          setUpdate(false);
          clearFormData();
        }}
        onOpen={() => {
          fillFormData();
          setUpdate(true);
        }}
      >
        <Modal.Header>Edit Listing</Modal.Header>
        <Modal.Content scrolling>
          <Form>
            <Form.Input
              fluid
              id="productName"
              label="Product name"
              placeholder="Product name"
              value={formData.productName}
              onChange={handleOnChange}
              required
            />
            <Form.Input
              fluid
              id="price"
              label="Product Price"
              placeholder="Product Price"
              type="number"
              value={formData.price}
              onChange={handleOnChange}
              required
            />
            <Form.TextArea
              label="Description"
              id="description"
              placeholder="Describe about the product..."
              value={formData.description}
              onChange={handleOnChange}
              required
            />
            <Image
              size="medium"
              style={{ position: "sticky", top: 0 }}
              src={formData.image}
              srcSet={formData.image}
              alt={"No images added"}
              label="Image Preview"
              wrapped
            />
            <Form.Input
              fluid
              label="Upload your images here"
              type="file"
              id="image"
              required
              onChange={handleOnChange}
            />
            <Button
              variant="solid"
              size="md"
              color="primary"
              aria-label="Explore Bahamas Islands"
              sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
              onClick={handleSubmit}
              type="submit"
              disabled={
                !formData.productName ||
                !formData.price ||
                !formData.description ||
                !formData.image
              }
            >
              Update
            </Button>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            variant="solid"
            size="md"
            color="primary"
            aria-label="Explore Bahamas Islands"
            sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
            onClick={() => {
              setUpdate(false);
              fillFormData();
            }}
          >
            Close
          </Button>
        </Modal.Actions>
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
    </Box>
  );
};

export default MarketplaceCard;
