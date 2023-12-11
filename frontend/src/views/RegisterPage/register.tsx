import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { IUser, IPerson } from "../../models/user";
import { useSelector } from "react-redux";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography, { TypographyProps } from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import userService from "../../services/userService";
import { Image, Input } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const Copyright = (props: TypographyProps) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        LocAll
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const initialStateUser = {
  person: {} as IPerson,
  username: "",
  password: "",
};

const Register: React.FC = () => {
  const navigate = useNavigate();
  //const locationId = useSelector((state: any) => state.location.pincode);
  const [newUser, setNewUser] = useState<IUser>(initialStateUser);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setError(null);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [error]);

  useEffect(() => {
    const register = async () => {
      try {
        const createdUser = await userService.createUser(newUser);
        console.log("User created:", createdUser);
        setError(null);
        navigate("/login");
      } catch (error) {
        console.error(`Error creating user: ${error}`);
        setError("Registration failed. Please try again.");
      }
    };

    if (newUser.username && newUser.password && newUser.person) {
      register();
    }
  }, [newUser]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("hi");
    const data = new FormData(event.currentTarget);
    console.log(data);

    setNewUser({
      ...newUser,
      person: {
        firstName: String(data.get("firstName")),
        lastName: String(data.get("lastName")),
        address: String(data.get("address")),
        zipcode: String(data.get("zipCode")),
        phoneNumber: String(data.get("phoneNo")),
      },
      userImage: String(imagePreview),
      username: String(data.get("userName")),
      password: String(data.get("password")),
    });
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            {/* Render error message if it exists */}
            {error && (
              <Typography
                variant="body2"
                color="error"
                align="center"
                sx={{ mb: 2 }}
              >
                {error}
              </Typography>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phoneNo"
                  label="PhoneNo"
                  type="PhoneNo"
                  id="phoneNo"
                  autoComplete="phoneNo"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="Address"
                  type="Address"
                  id="address"
                  autoComplete="Address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="zipCode"
                  label="ZipCode"
                  type="ZipCode"
                  id="zipCode"
                  autoComplete="ZipCode"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userName"
                  label="Username"
                  name="userName"
                  autoComplete="Username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
              <Image
              size="medium"
              style={{ position: "sticky", top: 0 }}
              src={imagePreview}
              srcSet={imagePreview}
              alt={"No images added"}
              label="Profile Pic Preview"
              wrapped
            />
                <Input
                  fluid
                  type="file"
                  id="image"
                  name="image"
                  onChange={onFileChange}
                  required
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Register;
