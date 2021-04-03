import "../../global.css";
import "./LotteryHome.css";
import { Box, Typography, TextField, Button } from "@material-ui/core";
import mockup from "../../resources/images/mockup-lottery.png";
import headerLogo from "../../resources/images/logo-light.svg";
import EmailInput from "../../components/EmailInput";
import GradientTextBox from "../../components/GradientTextBox";
import Fade from "react-reveal/Fade";
import React, { useState } from "react";
import * as emailjs from "emailjs-com";
const {
  REACT_APP_API_BASE_URL,
  REACT_APP_WAITLIST_URL,
  REACT_APP_CALCULATOR_URL,
  REACT_APP_EMAILJS_USER_ID, 
  REACT_APP_EMAILJS_SERVICE_ID,
  REACT_APP_PAGE_ID
} = process.env;

const USER_ID = REACT_APP_EMAILJS_USER_ID;
const TEMPLATE_ID = "template_b3u2bhe";
const SERVICE_ID = REACT_APP_EMAILJS_SERVICE_ID;
const PAGE_ID = REACT_APP_PAGE_ID;
function LotteryHome() {  
  const axios = require("axios");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const explainerText = [
    {
      number: 1,
      title: "A title is what happens",
      body:
        "nd then heres an explanation of what really happens. Everything goes wow.",
    },
    {
      number: 2,
      title: "A title is what happens",
      body:
        "nd then heres an explanation of what really happens. Everything goes wow.",
    },
    {
      number: 3,
      title: "A title is what happens",
      body:
        "nd then heres an explanation of what really happens. Everything goes wow.",
    },
  ];
  // const keyDown = (e, val) => {
  //   var code = e.keyCode || e.which;

  //   if (code === 13 || code === 32 || code === 39) {
  //     if (!val) {
  //       invalidClick();
  //     } else {
  //       navTo();
  //     }
  //   }
  // };
  const addEmail = async (email) => {
      axios
        .post(REACT_APP_API_BASE_URL + REACT_APP_WAITLIST_URL, {
          email: email,
          landingPageId: PAGE_ID
        })
        .then(function (response) {
          const templateParams = {
          to_email: email,
          waitlist_spot: response.data.waitlist_spot
          };

          emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID).then(
            function (response) {},
            function (error) {}
          );
          console.log("Email Sent");
        })
        .catch(function (error) {console.log(error);});
    }

  const submitEmail = () => {
    // setLoading(true);
    if(email.length > 0) {
      addEmail(email);
      setEmail('');
    }
    if(email2.length > 0) {
      addEmail(email2);
      setEmail2('');
    }
    setMessage('Successfully Registered!');
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
  return (
    <Box className="lottery-home rows">
      <Box className="lottery-home-header">
        <img className="lottery-home-header-logo" src={headerLogo} />
      </Box>
      <Box className="lottery-home-landing-container columns">
        <Box className="lottery-home-text rows">
          <Typography variant="h2" color="primary">
            The simplest intro to crypto
          </Typography>
          <EmailInput buttonLabel="Join Waitlist"  submitEmail={submitEmail} emailValue={email} setEmail={setEmail}/>
          <Typography variant="h5" color="primary">
            {message}
          </Typography>
          <Typography variant="h5" color="primary">
            Store crypto and earn interest. No fees.
          </Typography>
        </Box>{" "}
        <Fade top>
          <img src={mockup} className="lottery-home-mockup" />{" "}
        </Fade>
      </Box>
      <Box className="explainer-container">
        <Box className="explainer-container-content rows">
          <Fade top>
            <Typography
              className="explainer-title"
              variant="h3"
              color="primary"
            >
              How does it work?
            </Typography>
          </Fade>
          <Box className="explainer-text-boxes columns">
            {ExplainerTextBoxes}
          </Box>
        </Box>
      </Box>
      <Box className="lottery-home-footer">
        <EmailInput buttonLabel="Join Waitlist" submitEmail={submitEmail} emailValue={email2} setEmail={setEmail2}/>
      </Box>
    </Box>
  );
}

export default LotteryHome;
