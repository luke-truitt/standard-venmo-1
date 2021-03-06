import "../../global.css";
import "./Home.css";
import {
  Snackbar,
  Box,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import mockup from "../../resources/images/mockup-lottery.png";
import headerLogo from "../../resources/images/logo-purple.svg";
import EmailInput from "../EmailInput";
import GradientTextBox from "../GradientTextBox";
import Fade from "react-reveal/Fade";
import React, { useState, useEffect } from "react";
import * as emailjs from "emailjs-com";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import ReactGA from 'react-ga';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const {
  REACT_APP_API_BASE_URL,
  REACT_APP_WAITLIST_URL,
  REACT_APP_CALCULATOR_URL,
  REACT_APP_EMAILJS_USER_ID,
  REACT_APP_EMAILJS_SERVICE_ID,
  REACT_APP_PAGE_ID,
} = process.env;

const USER_ID = REACT_APP_EMAILJS_USER_ID;
const TEMPLATE_ID = "template_b3u2bhe";
const SERVICE_ID = REACT_APP_EMAILJS_SERVICE_ID;
const PAGE_ID = REACT_APP_PAGE_ID;
function Home() {
  const axios = require("axios");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const explainerText = [
    {
      number: 1,
      title: "Get tickets",
      body: "Deposit into any prize pool and instantly get tickets.",
    },
    {
      number: 2,
      title: "Win prizes",
      body:
        "As long as you stay in the pool, you’re eligible to win. Prizes are made up of interest earned on money in the pools.",
    },
    {
      number: 3,
      title: "Never lose",
      body: "Remove your deposit from the pool at any time.",
    },
  ];
  const keyDown = (e, val) => {
    var code = e.keyCode || e.which;
    if (code === 13 || code === 32 || code === 39) {
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          email
        ) ||
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          email2
        )
      ) {
        submitEmail();
      } else {
        showError();
      }
    }
  };
  const addEmail = async (email) => {
    axios
      .post(REACT_APP_API_BASE_URL + REACT_APP_WAITLIST_URL, {
        email: email,
        landingPageId: PAGE_ID,
      })
      .then(function (response) {
        const templateParams = {
          to_email: email,
          waitlist_spot: response.data.waitlist_spot,
        };

        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID).then(
          function (response) {},
          function (error) {}
        );
        console.log("Email Sent");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const submitEmail = () => {
    // setLoading(true);
    if (email.length > 0) {
      addEmail(email);
      setEmail("");
      setErrorMessage(false);
    }
    if (email2.length > 0) {
      addEmail(email2);
      setEmail2("");
      setErrorMessage(false);
    }
    ReactGA.event({
      category: 'User',
      action: 'Signed Up For Waitlist'
    });
    setErrorMessage(false);
    setSuccessMessage(true);
  };
  const ExplainerTextBoxes = explainerText.map((step) => (
    <Fade top>
      <GradientTextBox
        color="pink"
        number={step.number}
        title={step.title}
        body={step.body}
      />
    </Fade>
  ));
  const buttonLabel = (
    <span className="waitlist-button-text">
      Join<span className="waitlist-button-web-text"> Waitlist</span>
    </span>
  );
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessMessage(false);
    setErrorMessage(false);
  };
  const showError = () => {
    setSuccessMessage(false);
    setErrorMessage(true);
  };
  const useEffect = () => {
    ReactGA.pageview('/');
  }
  return (
    <Box className="lottery-home rows">
      <Snackbar
        open={successMessage}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Alert onClose={handleClose} severity="success">
          You're on the list!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={errorMessage}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          Please enter a valid email.
        </Alert>
      </Snackbar>
      <Box className="lottery-home-header">
        <img className="lottery-home-header-logo" src={headerLogo} />
      </Box>
      <Box className="lottery-home-landing-container columns">
        <Box className="lottery-home-text rows">
          <Typography
            variant="h3"
            className="lottery-home-text-title"
            color="primary"
          >
            The only lottery where you never lose money
          </Typography>
          <EmailInput
            buttonLabel={buttonLabel}
            onKeyPress={(e, val) => keyDown(e, val)}
            submitEmail={submitEmail}
            emailValue={email}
            setEmail={setEmail}
            invalidEmail={showError}
          />
          <Typography
            className="lottery-home-subtitle"
            variant="body"
            color="primary"
          >
            We use interest earned on ticket deposits to fund lottery prizes so
            you always get your original money back
          </Typography>
        </Box>{" "}
        <Fade top>
          <img src={mockup} className="lottery-home-mockup" />{" "}
        </Fade>
      </Box>
      <Box className="explainer-container">
        <Box className="explainer-container-content rows">
          {/* <Fade top>
            <Typography
              className="explainer-title"
              variant="h6"
              color="primary"
            >
              How does it work?
            </Typography>
          </Fade> */}
          <Box className="explainer-text-boxes columns">
            {ExplainerTextBoxes}
          </Box>
        </Box>
      </Box>
      <Box className="lottery-home-footer">
        <EmailInput
          buttonLabel={buttonLabel}
          onKeyPress={(e, val) => keyDown(e, val)}
          submitEmail={submitEmail}
          emailValue={email2}
          setEmail={setEmail2}
          invalidEmail={showError}
        />
      </Box>
    </Box>
  );
}

export default Home;
