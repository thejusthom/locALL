import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { IUser, IPerson} from '../../models/user';
import { useSelector } from 'react-redux';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography, {TypographyProps} from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import userService from '../../services/userService';

const Copyright = (props: TypographyProps) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        LocAll
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const initialStateUser = {
  person: {} as IPerson,
  username: '',
  password: ''
};

const Register: React.FC = () => {
  //const locationId = useSelector((state: any) => state.location.pincode);
  const [newUser, setNewUser] = useState<IUser>(initialStateUser);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setNewUser({
      ...newUser,
      person: {
        firstName: String(data.get('firstName')),
        lastName: String(data.get('lastName')),
        address: String(data.get('address')),
        zipcode: String(data.get('zipCode')),
        phoneNumber: String(data.get('phoneNo')),
      },
      username: String(data.get('userName')),
      password: String(data.get('password')),
    });

    try
    {
      const createdUser = await userService.createUser(newUser);
      console.log('User created:', createdUser);
      window.location.replace('/');
    } 
    catch(error)
    {
      console.error(`Error creating user: ${error}`);
    }

  };

  // Log the values when the state is updated
  useEffect(() => {
    console.log(newUser);
  }, [newUser]);

  return (
    <ThemeProvider theme={createTheme()}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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