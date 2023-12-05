import React, { FC, useRef } from "react";
import { Image } from "semantic-ui-react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Slider, { Settings } from "react-slick";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import IconArrowBack from "@mui/icons-material/ArrowBack";
import IconArrowForward from "@mui/icons-material/ArrowForward";
import localEvents from "../../assets/images/localEvents.jpg";
import HomeItemCard from "./HomeItemCard";
import '../../assets/styles/react-slick.scss'

interface SliderArrowArrow {
  onClick?: () => void;
  type: "next" | "prev";
  className?: "string";
}
export interface ItemCard {
  id: number | string;
  title: string;
  content: string;
}

const data: Array<ItemCard> = [
  {
    id: 1,
    title: "Location-Centric Experience",
    content:
      "Navigate through a tailored experience based on your zipcode, ensuring that all information is relevant to your local community."
  },
  {
    id: 2,
    title: "Dynamic Marketplace",
    content:
      "Buy and sell products within your community. Post detailed listings with images, descriptions, and pricing to engage with local buyers."
  },
  {
    id: 3,
    title: "Real-Time Weather Updates",
    content:
      "Stay informed about local weather conditions, ensuring that your outdoor plans are always well-informed."
  },
  {
    id: 4,
    title: "Happenings Feed",
    content:
      "Access a single, curated feed showcasing the latest activities, community announcements, and local news in your area."
  },
  {
    id: 5,
    title: "Event Management",
    content:
      "Organize and promote local events such as fairs, festivals, and functions. Sell tickets directly through the platform to streamline event planning."
  },
];

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
        bottom: { xs: "-28px !important", md: "5px !important" },
        left: "unset !important",
        right: type === "prev" ? "90px !important" : "30px !important",
        zIndex: 10,
        boxShadow: 1,
      }}
      disableRipple
      color="inherit"
      onClick={onClick}
      className={className}
    >
      {type === "next" ? (
        <IconArrowForward sx={{ fontSize: 22 ,bottom:'-34px !important'}} />
      ) : (
        <IconArrowBack sx={{ fontSize: 22 }} />
      )}
    </IconButton>
  );
};

const StyledSlickContainer = styled("div")(() => ({
  position: "relative",

  "& .slick-list": { marginLeft: "-30px", marginBottom: "24px" },
}));

const HomeItemCards = () => {
  const sliderRef = useRef(null);

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
    <Box sx={{ pb: { xs: 6, md: 10 }, backgroundColor: "background.paper" }}>
      <Container>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
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
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Box sx={{ width: { xs: "100%", md: "90%" } }}>
              <Image
                src={localEvents}
                alt="Testimonial img"
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomeItemCards;
