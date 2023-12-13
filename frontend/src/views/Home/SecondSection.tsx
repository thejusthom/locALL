// Imports from react
import { ReactNode } from "react";
// Imports from semantic ui
import { Image } from "semantic-ui-react";
// Imports from mui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import building from "../../assets/images/HighBuilding.jpg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArticleIcon from "@mui/icons-material/Article";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import EventIcon from "@mui/icons-material/Event";

// Model of data
interface Data {
  title: string;
  description: string;
  icon?: ReactNode;
}

// Static data given to data
export const data: Data[] = [
  {
    title: "Local Marketplace",
    description: "Buy and sell products within your community.",
    icon: <ShoppingCartIcon />,
  },
  {
    title: "Everyday Happenings",
    description:
      "curated feed showcasing the latest activities, and local news in your area.",
    icon: <ArticleIcon />,
  },
  {
    title: "User Publishing",
    description:
      "Publish your events, marketplace listings, or community initiatives.",
    icon: <LocalLibraryIcon />,
  },
  {
    title: "Events Map",
    description:
      "Search for events happening in your area, or publish your own.",
    icon: <EventIcon />,
  },
];

// Second section of Home page
const SecondSection = () => {
  return (
    <Box
      id="feature"
      sx={{ py: { xs: 10, md: 14 }, backgroundColor: "#f6f6f6" }}
    >
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Box sx={{ position: "relative" }}>
              <Image src={building} alt="Local City" />
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography
              component="h2"
              sx={{
                position: "relative",
                fontSize: { xs: 40, md: 50 },
                ml: { xs: 0, md: 4 },
                mt: 2,
                mb: 3,
                lineHeight: 1,
                fontWeight: "bold",
              }}
            >
              Make your{" "}
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
                Life <br />
              </Typography>
              Enjoyable
            </Typography>

            <Typography
              sx={{ color: "text.secondary", mb: 2, ml: { xs: 0, md: 4 } }}
            >
              Join locAll today and be an active participant in building a
              vibrant and connected local community. Together, let's make every
              neighborhood a better place!
            </Typography>

            <Grid container spacing={2} sx={{ ml: { xs: 0, md: 2 } }}>
              {data.map(({ title, description, icon }, index) => (
                <Grid key={String(index)} item xs={12} md={6}>
                  <Box
                    sx={{
                      px: 2,
                      py: 1.5,
                      boxShadow: 1,
                      borderRadius: 4,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        mr: 1,
                        backgroundColor: "primary.main",
                        borderRadius: "50%",
                        height: 36,
                        width: 36,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "primary.contrastText",
                        "& svg": {
                          fontSize: 20,
                        },
                      }}
                    >
                      {icon}
                    </Box>
                    <Box
                      sx={{ display: "flex", flex: 1, flexDirection: "column" }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "1rem",
                          mb: 1,
                          color: "secondary.main",
                        }}
                      >
                        {title}
                      </Typography>
                      <Typography
                        sx={{ lineHeight: 1.3, color: "text.secondary" }}
                        variant="subtitle1"
                      >
                        {description}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SecondSection;
