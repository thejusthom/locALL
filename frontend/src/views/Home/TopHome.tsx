import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link as ScrollLink } from "react-scroll";
import { StyledButton } from "./styled-button";
import { Image } from "semantic-ui-react";
import locality from "../../assets/images/locality.avif";
import IconButton from "@mui/joy/IconButton";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import FoodBankOutlinedIcon from "@mui/icons-material/FoodBankOutlined";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";

const TopHome = () => {
  return (
    <Box
      id="top-home"
      sx={{
        backgroundColor: "background.paper",
        position: "relative",
        pt: 4,
        pb: { xs: 8, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={0}
          sx={{ flexDirection: { xs: "column", md: "unset" } }}
        >
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                textAlign: { xs: "center", md: "left" },
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box sx={{ mb: 3 }}>
                <Typography
                  component="h2"
                  sx={{
                    position: "relative",
                    fontSize: { xs: 40, md: 72 },
                    letterSpacing: 1.5,
                    fontWeight: "bold",
                    lineHeight: 1.3,
                  }}
                >
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
                  one{" "}
                  <Typography
                    component="span"
                    sx={{
                      fontSize: "inherit",
                      fontWeight: "inherit",
                      position: "relative",
                      "& svg": {
                        position: "absolute",
                        top: -16,
                        right: -21,
                        width: { xs: 22, md: 30 },
                        height: "auto",
                      },
                    }}
                  >
                    place
                    <svg version="1.1" viewBox="0 0 3183 3072">
                      <g id="Layer_x0020_1">
                        <path
                          fill="#127C71"
                          d="M2600 224c0,0 0,0 0,0 236,198 259,562 52,809 -254,303 -1849,2089 -2221,1776 -301,-190 917,-1964 1363,-2496 207,-247 570,-287 806,-89z"
                        />
                        <path
                          fill="#127C71"
                          d="M3166 2190c0,0 0,0 0,0 64,210 -58,443 -270,516 -260,90 -1848,585 -1948,252 -104,-230 1262,-860 1718,-1018 212,-73 437,39 500,250z"
                        />
                        <path
                          fill="#127C71"
                          d="M566 3c0,0 0,0 0,0 -219,-26 -427,134 -462,356 -44,271 -255,1921 90,1962 245,62 628,-1392 704,-1869 36,-221 -114,-424 -332,-449z"
                        />
                      </g>
                    </svg>
                  </Typography>{" "}
                  <br />
                  for everything
                </Typography>
              </Box>
              <Box sx={{ mb: 4, width: { xs: "100%", md: "70%" } }}>
                <Typography
                  sx={{ color: "#717171", lineHeight: 1.6, fontWeight: "500" }}
                >
                  {
                    "Your go-to platform for connecting with local happenings, commerce, and community support by providing a centralized space for events, marketplace listings, weather updates, and community initiatives—all tailored to your specific location."
                  }
                </Typography>
              </Box>
              <Box sx={{ "& button": { mr: 2 } }}>
                <ScrollLink
                  to="popular-course"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={350}
                >
                  <StyledButton
                    color="primary"
                    size="large"
                    variant="contained"
                  >
                    Get Started
                  </StyledButton>
                </ScrollLink>
                <ScrollLink
                  to="video-section"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={350}
                >
                  <StyledButton color="primary" size="large" variant="outlined">
                    Explore Events
                  </StyledButton>
                </ScrollLink>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={5} sx={{ position: "relative" }}>
            <Box sx={{ lineHeight: 0 }}>
              <Image src={locality} alt="Hero img" />
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ boxShadow: 2, py: 4, px: 7, borderRadius: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: "center", mb: { xs: 1, md: 0 } }}>
                <IconButton
                  aria-label="bookmark Bahamas Islands"
                  variant="plain"
                  color="primary"
                  size="lg"
                  sx={{
                    mb: { xs: 1, md: 2 },
                  }}
                >
                  <LocationOnIcon />
                </IconButton>
                <Typography color="text.secondary" variant="h5">
                  Based tailoring
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: "center", mb: { xs: 1, md: 0 } }}>
                <IconButton
                  aria-label="bookmark Bahamas Islands"
                  variant="plain"
                  color="primary"
                  size="lg"
                  sx={{
                    mb: { xs: 1, md: 2 },
                  }}
                >
                  <CloudOutlinedIcon />
                </IconButton>
                <Typography color="text.secondary" variant="h5">
                  Real-Time
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: "center", mb: { xs: 1, md: 0 } }}>
                <IconButton
                  aria-label="bookmark Bahamas Islands"
                  variant="plain"
                  color="primary"
                  size="lg"
                  sx={{
                    mb: { xs: 1, md: 2 },
                  }}
                >
                  <FoodBankOutlinedIcon />
                </IconButton>
                <Typography color="text.secondary" variant="h5">
                  Food-Bank
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: "center", mb: { xs: 1, md: 0 } }}>
                <IconButton
                  aria-label="bookmark Bahamas Islands"
                  variant="plain"
                  color="primary"
                  size="lg"
                  sx={{
                    mb: { xs: 1, md: 2 },
                  }}
                >
                  <CelebrationOutlinedIcon sx={{fontSize:'large'}}/>
                </IconButton>
                <Typography color="text.secondary" variant="h5">
                  Event Management
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>

  )
}

export default TopHome