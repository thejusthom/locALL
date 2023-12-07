import { Link, Outlet } from "react-router-dom";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import LocationBar from "../_LocationBar";
import Footer from "../footer/footer";

const pages = [
  { name: "Home", path: "/" },
  { name: "Events", path: "/events" },
  { name: "Marketplace", path: "/marketplace" },
  { name: "Feed Share", path: "/feedshare" },
  { name: "Happenings", path: "/happenings" },
  { name: "Donations", path: "/donations" },
];

function HomeLayout() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>
      <Box>
        <AppBar
          position="sticky"
          sx={{ pr: { md: 15, xs: 2 }, pl: { md: 20, xs: 2 } }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontSize: "18px",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                  "&:hover": {
                    color: "#101a45",
                  },
                }}
              >
                locALL
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                      <Typography
                        textAlign="center"
                        component={Link}
                        to={page.path}
                      >
                        {page.name}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                locALL
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  display: {
                    xs: "none",
                    md: "flex",
                    "& .MuiBox-root:primary.light": {
                      color: "black",
                    },
                  },
                }}
              >
                {pages.map((page) => (
                  <Button
                    component={Link}
                    to={page.path}
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      mx: 1.1,
                      color: "white",
                      display: "block",
                      fontSize: "16px",
                      fontWeight: 600,
                      "&:hover": {
                        color: "#101a45",
                      },
                    }}
                  >
                    {page.name}
                  </Button>
                ))}
              </Box>
              {!!process.env.REACT_APP_MAPBOX_API_KEY && (
                <LocationBar
                  accessToken={process.env.REACT_APP_MAPBOX_API_KEY}
                />
              )}
              <Box sx={{ flexGrow: 0 }}>
                <Button
                  key="login"
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to="/login"
                  sx={{
                    my: 2,
                    mx: 1.1,
                    color: "white",
                    display: "block",
                    fontSize: "16px",
                    fontWeight: 600,
                    "&:hover": {
                      color: "#101a45",
                    },
                  }}
                >
                  LOGIN
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Box sx={{minHeight:'100vh'}}>
        <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default HomeLayout;
