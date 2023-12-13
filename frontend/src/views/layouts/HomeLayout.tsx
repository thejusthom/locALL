// Imports from react
import { Link, Outlet } from "react-router-dom";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// Imports from mui
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
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import { Avatar } from "@mui/material";
// Imports from project files
import LocationBar from "../_LocationBar";
import Footer from "../footer/footer";
import userService from "../../services/userService";
import { deleteUser } from "../../store/slices/user-slice";
import i18n from "../../i18n";

// Home layout
function HomeLayout() {
  // Getting user from redux store
  const user = useSelector((state: any) => state.user);
  // Dispatching action to redux store
  const dispatch = useDispatch();
  // Navigate to different pages
  const navigate = useNavigate();

  // Creating state for language
  const [language, setLanguage] = React.useState({
    checked: true,
  });
  // Creating state for anchor element
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  // Using useEffect with language
  React.useEffect(() => {
    if (language.checked) {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("ta");
    }
  }, [language]);
  // Declaring t variable for translation
  const { t } = useTranslation("common");

  // Declaring pages for navigation
  const pages = [
    { name: t("home"), path: "/" },
    { name: t("events"), path: "/events" },
    { name: t("marketplace"), path: "/marketplace" },
    { name: t("feedshare"), path: "/feedshare" },
    { name: t("happenings"), path: "/happenings" },
    { name: t("donations"), path: "/donations" },
  ];

  // Getting pathname from window location
  const pathname = window.location.pathname;

  // Creating functions for opening and closing menu
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //Handling logout of user
  const handleLogout = async () => {
    // Checking if user has refresh token
    if (user.refreshToken) {
      const responseJSON = await userService.logoutUser(
        user,
        user.refreshToken
      );
      if (responseJSON === "Logout successful") {
        dispatch(deleteUser()); // Delete user from redux store
        localStorage.removeItem("user"); // Delete user from local storage
        navigate("/");
      }
    }
  };

  // Handling language change
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setLanguage({ ...language, [event.target.value]: checked });
  };

  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>
      <Box>
        <AppBar
          position="sticky"
          sx={{
            pr: { md: 2, xs: 2 },
            pl: { md: 2, xs: 2 },
            backgroundColor: "#123abc",
          }}
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
                {t("locall")}
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
                {user.isLoggedIn ? (
                  <Box>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar src={user.user?.userImage} />
                    </IconButton>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem key="userProfile" onClick={handleCloseUserMenu}>
                        <Button
                          component={Link}
                          to="/userProfile"
                          sx={{ fontSize: 15 }}
                        >
                          Profile
                        </Button>
                      </MenuItem>
                      <MenuItem key="logout" onClick={handleCloseUserMenu}>
                        <Typography component={Button} onClick={handleLogout}>
                          Logout
                        </Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                ) : (
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
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Box sx={{ minHeight: "100vh" }}>
          {pathname !== "/login" && (
            <LanguageSelectWrap>
              <div>
                <Grid
                  component="label"
                  container
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>தமிழ்</Grid>
                  <Grid item>
                    <Switch
                      sx={{
                        "& .MuiSwitch-track": { backgroundColor: "#1976d2" },
                        "& .MuiSwitch-thumb": { backgroundColor: "#1976d2" },
                      }}
                      checked={language.checked} // relevant state for your case
                      onChange={handleChange} // relevant method to handle your change
                      value="checked" // some value you need
                    />
                  </Grid>
                  <Grid item>English</Grid>
                </Grid>
              </div>
            </LanguageSelectWrap>
          )}
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

const LanguageSelectWrap = styled.section`
  display: flex;
  justify-content: right;
  margin-top: 15px;
  padding-right: 20px;
  label {
    font-size: 18px;
    font-weight: bold;
  }
`;

export default HomeLayout;
