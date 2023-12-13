// Imports from react
import { FC, useRef } from "react";
import Slider, { Settings } from "react-slick";
// Imports from mui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import IconArrowBack from "@mui/icons-material/ArrowBack";
import IconArrowForward from "@mui/icons-material/ArrowForward";
// Imports from project files
import "../../assets/styles/react-slick.scss";
import localEvents from "../../assets/images/localEvents.jpg";
import weatherCard from "../../assets/images/weatherCard.avif";
import marketplaceCard from "../../assets/images/marketplaceCard.png";
import locationCard from "../../assets/images/locationCard.png";
import happeningsCard from "../../assets/images/happeningsCard.jpg";
import HomeItemCard from "./HomeItemCard";

// Model of sliderArrow
interface SliderArrowArrow {
  onClick?: () => void;
  type: "next" | "prev";
  className?: "string";
}

// Model of itemCard
export interface ItemCard {
  id: number | string;
  title: string;
  content: string;
  image: string;
}

//Static data given to ItemCard
const data: Array<ItemCard> = [
  {
    id: 1,
    title: "Location-Centric Experience",
    image: locationCard,
    content:
      "Navigate through a tailored experience based on your zipcode, ensuring that all information is relevant to your local community.",
  },
  {
    id: 2,
    title: "Dynamic Marketplace",
    image: marketplaceCard,
    content:
      "Buy and sell products within your community. Post detailed listings with images, descriptions, and pricing to engage with local buyers.",
  },
  {
    id: 3,
    title: "Real-Time Weather Updates",
    image: weatherCard,
    content:
      "Stay informed about local weather conditions, ensuring that your outdoor plans are always well-informed.",
  },
  {
    id: 4,
    title: "Happenings Feed",
    image: happeningsCard,
    content:
      "Access a single, curated feed showcasing the latest activities, community announcements, and local news in your area.",
  },
  {
    id: 5,
    title: "Event Management",
    image: localEvents,
    content:
      "Organize and promote local events such as fairs, festivals, and functions. Sell tickets directly through the platform to streamline event planning.",
  },
];

// Component of SliderArrow
const SliderArrow: FC<SliderArrowArrow> = (props) => {
  const { onClick, type, className } = props;
  return (
    <IconButton
      sx={{
        backgroundColor: "background.paper",
        color: "primary.main",
        "&:hover": {
          backgroundColor: "primary.main",
          color: "primary.contrastText",
        },
        bottom: { xs: "-28px !important", md: "-10px !important" },
        left: "unset !important",
        right: {
          md: type === "prev" ? "380px !important" : "310px !important",
          xs: type === "prev" ? "270px !important" : "200px !important",
        },
        zIndex: 10,
        boxShadow: 1,
      }}
      disableRipple
      color="inherit"
      onClick={onClick}
      className={className}
    >
      {type === "next" ? (
        <IconArrowForward sx={{ fontSize: 22 }} />
      ) : (
        <IconArrowBack sx={{ fontSize: 22 }} />
      )}
    </IconButton>
  );
};

// Style given to Slick Container
const StyledSlickContainer = styled("div")(() => ({
  position: "relative",

  "& .slick-list": { marginLeft: "-30px", marginBottom: "24px" },
}));

//Main component of HomeItemCards
const HomeItemCards = () => {
  const sliderRef = useRef(null);

  //Settings of slider
  const sliderConfig: Settings = {
    infinite: true,
    autoplay: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SliderArrow type="prev" />,
    nextArrow: <SliderArrow type="next" />,
  };

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container>
        <Grid
          container
          spacing={5}
          sx={{
            display: "flex",
            justifyContent: "center",
            px: { xs: 2, md: 30 },
          }}
        >
          <Grid item xs={12} md={12}>
            <Typography
              component="h2"
              sx={{
                position: "relative",
                fontSize: { xs: 36, md: 46 },
                mt: { xs: 0, md: 7 },
                mb: 4,
                lineHeight: 1,
                fontWeight: "bold",
              }}
            >
              Your gateway to{" "}
              <Typography
                component="mark"
                sx={{
                  position: "relative",
                  color: "primary.main",
                  fontSize: "inherit",
                  fontWeight: "inherit",
                  backgroundColor: "unset",
                }}
              >
                locALL{" "}
              </Typography>
              Buzz
            </Typography>

            <StyledSlickContainer>
              <Slider ref={sliderRef} {...sliderConfig}>
                {data.map((item, index) => (
                  <HomeItemCard key={String(index)} item={item} />
                ))}
              </Slider>
            </StyledSlickContainer>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomeItemCards;
