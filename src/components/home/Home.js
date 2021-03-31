import "./home.css";
import "../../styles.css";
import "../header/header.css";
import {
  ThemeProvider,
  AppBar,
  Zoom,
  Typography,
  Button,
  Fade,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@material-ui/core/";
import { EmbeddedEmailInput } from "../inputs/Inputs.js";
import { primaryTheme, fadeDefault } from "../../utils/constants.js";
// import { Mixpanel } from "./../../mixpanel.js";
import { useHistory, useLocation } from "react-router-dom";
import Header from "../header/Header";
import React, { useRef, useState, useEffect, forwardRef } from "react";
// import { PageView, initGA, Event } from "../tracking/Tracking";

import ben from "./../../images/home/ben.png";
// const trackingId = "UA-189058741-1";
const {
  REACT_APP_API_BASE_URL,
  REACT_APP_WAITLIST_URL,
  REACT_APP_CALCULATOR_URL,
} = process.env;

function Home(props) {
  const [email, setEmail] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const axios = require("axios");
  const emailInput = useRef(null);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const handleClickOpen = (old_user) => {
    setUser(old_user);
    setOpen(true);
  };

  let referById = "";

  const keyDown = (e, val) => {
    var code = e.keyCode || e.which;

    if (code === 13 || code === 32 || code === 39) {
      if (!val) {
        invalidClick();
      } else {
        navTo();
      }
    }
  };
  useEffect(() => {
    // initGA(trackingId);
    // // Mixpanel.track("visit_home");
    // PageView();
  }, []);

  const navTo = () => {
    // Event("SIGNUP", "User Signed Up", "LANDING_PAGE");
    setLoading(true);
    addEmail(email);
  };

  const invalidClick = () => {
    setInvalid(true);
  };

  const searchParams =
    location.search.split("?").length == 1
      ? []
      : location.search.split("?")[1].split("&");
  let i;
  for (i = 0; i < searchParams.length; i++) {
    const paramName = searchParams[i].split("=")[0];
    if (paramName == "referId") {
      referById = searchParams[i].split("=")[1];
    }
  }

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const addEmail = async (email) => {
    // const old_user = await findUserByEmail(email);
      axios
        .post(REACT_APP_API_BASE_URL + REACT_APP_WAITLIST_URL, {
          email: email,
        })
        .then(function (response) {
          const referToId = response.data.referId;
          props.setReferTo(referToId);
          // Mixpanel.identify(referToId);
          // Mixpanel.people.set({ $email: email });
          // Mixpanel.track("waitlist_joined");
          // Mixpanel.people.set_once({ sign_up_date: new Date() });
          setLoading(false);
        })
        .catch(function (error) {});
    } 

  return (
    <ThemeProvider theme={primaryTheme}>
      <div className="page-root row-container">
        <Header/>
        <Fade in {...fadeDefault}>
          <div className="home-c0 column-container">
            <div className="home-c1 row-container">
              <Typography
                variant="caption"
                color="secondary"
                className="home-label"
              >
                <strong>FOR STUDENTS </strong>
              </Typography>
              <Typography variant="h2" color="secondary" className="home-title">
                Get up to a <span className="teal-highlight">$5,000</span> tax
                refund in <span className="teal-highlight">10 minutes</span>.
              </Typography>
              <Typography
                variant="body1"
                color="secondary"
                className="home-subtitle-lower"
              >
                We qualify students for unclaimed tax credits.{" "}
                <u>
                  You still may qualify for a refund if you had no income or are a dependent.
                </u>
                <br />
                <br />
                The peace of mind of a CPA for the price of lunch. Don't pay
                until you get paid, and if we can't get you a bigger refund we
                waive the $25 fee.
              </Typography>
              <EmbeddedEmailInput
                className="home-input"
                emailValue={email}
                setEmail={setEmail}
                invalid={invalid}
                onKeyPress={(e, val) => keyDown(e, val)}
                navTo={navTo}
                invalidClick={invalidClick}
                loading={loading}
              />
              <Typography
                variant="caption"
                color="secondary"
                className="home-caption"
              >
                <strong>
                  We have a team of tax experts to make sure nothing is left on
                  the table.{" "}
                </strong>
              </Typography>
            </div>
            <img src={ben} className="home-ben"></img>
            {/* <AlertDialog open={open} handleClose={handleClose} /> */}
          </div>
        </Fade>
      </div>
    </ThemeProvider>
  );
}
export default Home;
