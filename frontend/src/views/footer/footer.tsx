import React, { FC } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import '../../assets/styles/footer.scss';
import { SocialIcon } from 'react-social-icons'


const footer = () => {
  return (
    // <Box
    //   component="footer"
    //   sx={{
    //     backgroundColor: "#123abc",
    //     color: "primary.contrastText",
    //     width: "100%"
    //   }}
    // >

        <footer className="footer">
          <div className="footer-split">            
            <div className="footer-left">
              <div className="footer__addr">
                <h1 className="footer__logo">
                  <Typography variant="subtitle1" sx={{ letterSpacing: 1, mb: 2, fontSize: 25, fontWeight: 'bold', color: 'white' }}>
                    Join locAll today and be an active participant in building a vibrant and connected local community!
                  </Typography>
                </h1>

                <Typography variant="subtitle1" sx={{ letterSpacing: 1, mb: 2, fontSize: 25, fontWeight: 'bold', color: 'white' }}>
                  Contact
                </Typography>
                <address>
                  5534 Somewhere In. The World 22193-10212
                  <a className="footer__btn" href="mailto:example@gmail.com">Email Us</a>
                </address>
              </div>
            </div>
            <div className="footer-right">
              <ul className="social-icon">
                <li className="social-icon__item"><a className="social-icon__link" href="#">
                  <SocialIcon url="https://x.com/" />
                </a></li>
                <li className="social-icon__item"><a className="social-icon__link" href="#">
                  <SocialIcon url="https://facebook.com/" />
                </a></li>
                <li className="social-icon__item"><a className="social-icon__link" href="#">
                  <SocialIcon url="https://instagram.com/" />
                </a></li>
                <li className="social-icon__item"><a className="social-icon__link" href="#">
                  <SocialIcon url="https://linkedin.com/" />
                </a></li>
              </ul>
              <ul className="menuu">
                <li className="menu__item"><a className="menu__link" href="#">Home</a></li>
                <li className="menu__item"><a className="menu__link" href="#">About</a></li>
                <li className="menu__item"><a className="menu__link" href="#">Services</a></li>
                <li className="menu__item"><a className="menu__link" href="#">Team</a></li>
                <li className="menu__item"><a className="menu__link" href="#">Contact</a></li>

              </ul>
              <p>&copy;2023 <a href="/">locALL</a> | All Rights Reserved</p>
            </div>
          </div>
        </footer>
  );
};

export default footer;
