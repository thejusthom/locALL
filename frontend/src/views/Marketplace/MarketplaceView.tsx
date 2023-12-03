import { Box } from "@mui/material";
import { useState, useEffect, ChangeEvent } from "react";
import MarketplaceCard from "./MarketplaceCard";
import { Marketplace } from "../../models/marketplace";
import marketplaceService from "../../services/marketplaceService";
import { useSelector } from "react-redux";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import { Form, Image, Modal } from "semantic-ui-react";
import moment from "moment";

type Props = {
  active: string;
};

const MarketplaceView = (props: Props) => {
  const [marketplaceCards, setMarketplaceCards] = useState([] as Marketplace[]);
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    image: "",
  });
  const locationId = useSelector((state: any) => state.location.pincode);

  useEffect(() => {
    if (props.active === "my-items") {
      marketplaceService
        .getMarketplaceByParams(locationId, "65682596adef270d5ffe1ff6")
        .then((marketplaceCards) => setMarketplaceCards(marketplaceCards));
    } else {
      marketplaceService
        .getMarketplace(locationId)
        .then((marketplaceCards) => setMarketplaceCards(marketplaceCards));
    }
  }, [locationId, props.active, update]);
  const afterUpdate = () => {
    if (update === false) {
      setUpdate(true);
    } else {
      setUpdate(false);
    }
  };
  const clearFormData = () => {
    const clData = {
      productName: "",
      description: "",
      price: "",
      image: "",
    };
    setFormData(clData);
  };

  const handleOnChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    const id = event.target.id;
    const updateData = { ...formData };
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
          setFormData(updateData);
        };
        return;
      }
    }
    updateData[id as keyof typeof updateData] = event.target.value;
    console.log(updateData);
    setFormData(updateData);
  };
  const handleSubmit = async () => {
    const listingDate = moment().format("MMMM Do YYYY, h:mm:ss a");
    const marketplace: Marketplace = {
      ...formData,
      locationId,
      //TODO: change this to the user id from state
      createdUser: "65682596adef270d5ffe1ff6",
      listingDate,
      _id: null,
      comments: [],
    };
    console.log(marketplace);
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
      });
  };

  return (
    <Box sx={{}}>
      {props.active === "my-items" && (
        <Button
          variant="solid"
          size="md"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: "auto", alignSelf: "center", fontWeight: 600, mb: 2 }}
          onClick={() => setCreate(true)}
        >
          Create Post
        </Button>
      )}
      {marketplaceCards.length === 0 && (
        <Box>
          <Typography sx={{ m: 4, ml: 1 }} fontSize="lg" fontWeight="lg">
            No Posts Yet
          </Typography>
        </Box>
      )}
      <Box sx={{ display: "flex", m: 1, gap: 2, flexWrap: "wrap" }}>
        {marketplaceCards.map((marketplaceCard: Marketplace) => (
          <MarketplaceCard
            marketplace={marketplaceCard}
            active={props.active}
            afterUpdate={afterUpdate}
          />
        ))}
      </Box>
      <Modal
      dimmer='inverted'
        open={create}
        onClose={() => {
          setCreate(false);
          clearFormData();
        }}
        onOpen={() => setCreate(true)}
      >
        <Modal.Header>Create Listing</Modal.Header>
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
