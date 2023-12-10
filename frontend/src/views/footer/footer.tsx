import React, { FC } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#123abc",
        color: "primary.contrastText",
        width: "100%"
      }}
    >
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} sx={{display:'flex',justifyContent:'center'}}>
            <Box sx={{ width: { xs: "100%", md: 360 }, mb: { xs: 3, md: 0 } }}>
              <Typography component="h2" variant="h2" sx={{ mb: 2 }}>
                locALL
              </Typography>
              <Typography variant="subtitle1" sx={{ letterSpacing: 1, mb: 2 }}>
              Join locAll today and be an active participant in building a vibrant and connected local community.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default footer;
