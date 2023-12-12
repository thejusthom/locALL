// Import from react
import { useState, useEffect, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
// Imports from mui
import { Box } from "@mui/material";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
// Imports for date formatting
import moment from "moment";
// Imports from semantic ui
import { Form, Image, Modal } from "semantic-ui-react";
// Imports from project files
import MarketplaceCard from "./MarketplaceCard";
import { Marketplace } from "../../models/marketplace";
import marketplaceService from "../../services/marketplaceService";

// Type of props given to MarketplaceView
type Props = {
  active: string;
};

// View of Marketplace
const MarketplaceView = (props: Props) => {
  // Translation
  const { t } = useTranslation("common");

  // Get user from redux store
  const user = useSelector((state: any) => state.user);
  // Get location id from redux store
  const locationId = useSelector((state: any) => state.location.pincode);
  // State of marketplace cards
  const [marketplaceCards, setMarketplaceCards] = useState([] as Marketplace[]);
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    image: "",
  });

  // Using useEffect to call API once mounted and set the data
  useEffect(() => {
    if (props.active === "my-items") {
      marketplaceService
        .getMarketplaceByParams(locationId, user?.user?._id)
        .then((marketplaceCards) => setMarketplaceCards(marketplaceCards));
    } else {
      marketplaceService
        .getMarketplace(locationId)
        .then((marketplaceCards) => setMarketplaceCards(marketplaceCards));
    }
  }, [locationId, props.active, update, user.isLoggedIn, user]);
  // Function to update the state of update
  const afterUpdate = () => {
    if (update === false) {
      setUpdate(true);
    } else {
      setUpdate(false);
    }
  };
  // Function to clear form data
  const clearFormData = () => {
    const clData = {
      productName: "",
      description: "",
      price: "",
      image: "",
    };
    setFormData(clData);
  };

  // Function to handle on change of input
  const handleOnChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    const id = event.target.id;
    const updateData = { ...formData };
    // If input is of type file then read the file and set the state of image
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
    // Set the state of other input fields
    updateData[id as keyof typeof updateData] = event.target.value;
    setFormData(updateData);
  };
  // Function to handle submit of form
  const handleSubmit = async () => {
    const listingDate = moment().format("MMMM Do YYYY, h:mm:ss a");
    const marketplace: Marketplace = {
      ...formData,
      locationId,
      createdUser: user?.user?._id,
      listingDate,
      _id: null,
      comments: [],
    };
    try {
      // Call create marketplace service
      await marketplaceService
        .createMarketplace(locationId, marketplace)
        .then(() => {
          if (update === false) {
            setUpdate(true);
          } else {
            setUpdate(false);
          }
          setCreate(false);
          clearFormData();
          toast.success("Post created successfully");
        });
    } catch (err) {
      toast.error("Error in creating post");
    }
  };

  return (
    <Box sx={{}}>
      <ToastContainer position="top-center" closeOnClick />
      {props.active === "my-items" && (
        <Button
          variant="solid"
          size="md"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: "auto", alignSelf: "center", fontWeight: 600, mb: 2 }}
          onClick={() => setCreate(true)}
        >
          {t("create_post")}
        </Button>
      )}
      {marketplaceCards.length === 0 && (
        <Box>
          <Typography sx={{ m: 4, ml: 1 }} fontSize="lg" fontWeight="lg">
            {t("no_posts")}
          </Typography>
        </Box>
      )}
      <Box sx={{ display: "flex", m: 1, gap: 2, flexWrap: "wrap" }}>
        {marketplaceCards.map((marketplaceCard: Marketplace, index) => (
          <MarketplaceCard
            key={String(index)}
            marketplace={marketplaceCard}
            active={props.active}
            afterUpdate={afterUpdate}
          />
        ))}
      </Box>
      <Modal
        dimmer="inverted"
        open={create}
        onClose={() => {
          setCreate(false);
          clearFormData();
        }}
        onOpen={() => setCreate(true)}
      >
        <Modal.Header> {t("create_listing")}</Modal.Header>
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
              Create
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
              setCreate(false);
              clearFormData();
            }}
          >
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </Box>
  );
};

export default MarketplaceView;
