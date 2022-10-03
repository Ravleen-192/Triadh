

import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
/*import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import WPF from '../../image/Whitepaperform.jpg';
import { CenterFocusStrong } from '@material-ui/icons';*/
import { Alert } from "reactstrap"
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import WP from '../../image/Whitepaper.jpg';
import { FormErrors } from '../FormErrors';
import { Col } from 'reactstrap';

var validator = require("email-validator");
const theme = createTheme();

const  WhitePaper=() => {
  const contactModel = new ContactModel();
  const [errMessage, seterrMessage] = useState("");
  const [msgAlert, setmsgAlert] = useState("");
  const [alertSuccess, setalertSuccess] = useState('');
  const [bVisible, setbVisible] = useState(false);
  const [formErrors, setformErrors] = useState([]);
  const [nameValid, setnameValid] = useState(false);
  const [titleValid, settitleValid] = useState(false);
  const [phoneValid, setphoneValid] = useState(false);
  const [emailValid, setemailValid] = useState(false);
  const [companyValid, setcompanyValid] = useState(false);
  const [formValid, setformValid] = useState(false);

  const onDismiss = () => {
    setbVisible(false);
    setalertSuccess('');
    setmsgAlert("");
  }
  const handleSubmit = (event) => {
    event.preventDefault();

    var errMessage = "";

    if (!contactModel.name)
      errMessage = errMessage + "Name Required. \r\n";
    if (!contactModel.title)
      errMessage = errMessage + "Job Title Required. \r\n";
    if (!contactModel.email) {
      errMessage = errMessage + "Email Required. \r\n";
    } else if (!validator.validate(contactModel.email)) {
      errMessage = errMessage + "Please enter a valid email. \r\n";
    }
    if (!contactModel.phone)
      errMessage = errMessage + "Work Phone Required. \r\n";


    if (!contactModel.company) {
      errMessage = errMessage + "Company name Required. \r\n";
    }
    if (!formValid) {
      errMessage = "Please check all entries."
    }
    if (errMessage === "") {
      var form = new FormData()
      form.append('name', contactModel.name);
      form.append('title', contactModel.jobtitle);
      form.append('email', contactModel.email);
      form.append('phone', contactModel.phone);
      form.append('company', contactModel.company);

      var xhr = new XMLHttpRequest()
      //xhr.withCredentials = true;
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          console.log("status = ", xhr.status);
          if (xhr.status === 200) {
            setmsgAlert("Thank you for the interest. Please check your email for the Download Link.");
            setalertSuccess('success');
            contactModel = new ContactModel();
          } else {
            setmsgAlert("Please try again after some time");
            setalertSuccess('danger');
          }
          console.log(xhr.responseText)
        }
      }
      //xhr.open("POST", "https://toxsswlv99.execute-api.us-east-1.amazonaws.com/prod/dsk");
      xhr.open("POST", "https://hdy1gtzwre.execute-api.us-east-1.amazonaws.com/default/SendEmail-test");
      xhr.setRequestHeader("content-type", "application/json");
      xhr.send(form);
    }
    else {
      console.log("Error Message", errMessage);

      errMessage = "Enter the values for all fields marked (*).";
      seterrMessage(errMessage);
    }
  }
  const validateField = (fieldName, value) =>{

    let fieldValidationErrors = formErrors;
    let nameValid = {nameValid};
    let titleValid = {titleValid};
    let emailValid = {emailValid};
    let phoneValid = {phoneValid};
    let companyValid = {companyValid};
    console.log("Validateield", titleValid);
    switch (fieldName) {
      case 'name':
        console.log("validate field", fieldName);
        nameValid = value.length >= 4;
        fieldValidationErrors.Name = nameValid ? '' : ' is too short';
        break;
      case 'jobtitle':
        titleValid = value.length >= 4;
        fieldValidationErrors.Title = titleValid ? '' : ' is too short';
        break;

      case 'phone':

        phoneValid = value.length >= 10;
        fieldValidationErrors.phone = phoneValid ? '' : ' is not valid';

        break;
      case 'email':
        emailValid = value.match(/^[a-zA-Z0-9.%+-]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)(?!yahoo.co.in)(?!aol.com)(?!live.com)(?!outlook.com)(?!rediffmail.com)([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid. Only business email id allowed.';
        break;
      case 'company':
        companyValid = value.length >= 2;
        fieldValidationErrors.company = companyValid ? '' : ' is too short';
        break;
      default:
        break;
    }

    setformErrors(fieldValidationErrors);
    setnameValid(nameValid);
    settitleValid(titleValid);
    setcompanyValid(companyValid);
    setemailValid(emailValid);
    setphoneValid(phoneValid);

    validateForm();
  }

  const validateForm = () => {
    console.log("validateform", nameValid, titleValid, emailValid, phoneValid, companyValid)
    setformValid(nameValid && titleValid && emailValid && phoneValid && companyValid);
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '600' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${WP})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            textAlign: 'center',
          }}
        >
          <br />
          <br />
          <h2>What are Data Mesh Principles and Logical Architecture</h2>
          <h3>How to Move Beyond a Monolithic Data Lake to a Distributed Data Mesh</h3>


          <h3> Become data-driven, use data to compete, or use data at scale to drive value</h3>
          <h4>Download Triadh’s new white paper to learn: </h4>

          <p>Today’s landscape of operational data and analytical data.
            Operational data sits in databases behind business capabilities served with microservices,
            has a transactional nature, keeps the current state and serves the needs of
            the applications running the business.
            Analytical data is a temporal and aggregated view of the facts of the business over time,
            often modeled to provide retrospective or future-perspective insights;
            it trains the ML models or feeds the analytical reports. </p>
          <h2>Get a headstart now.</h2></Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 4,//8
              mx: 4,//4
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',

            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#0D9F98' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Fill out the form.

            </Typography>
            {alertSuccess === 'success' ? <Alert color="success" isOpen={bVisible} toggle={onDismiss}>
              {msgAlert}
            </Alert>
              : alertSuccess === 'danger' ? <Alert color="danger" isOpen={bVisible} toggle={onDismiss}>
                {msgAlert}
              </Alert> : null}
            <div className="container-fluid text-center  contact-val ">
              <Col md='12' sm="12" xs="12" lg="12" xl="12">
                <FormErrors formErrors={formErrors} />
              </Col>
            </div>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoFocus
                onInvalid={e => e.target.setCustomValidity("Please enter the first name")}
                onInput={e => e.target.setCustomValidity("")}
                onChange={(event) => {
                  event.preventDefault();
                  const name = event.target.name;
                  const value = event.target.value;
                  contactModel.name = event.target.value;
                  seterrMessage(null);
                  validateField(name, value);
                }}

              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="company"
                label="Company"
                name="company"
                onInvalid={e => e.target.setCustomValidity("Please enter the company name")}
                onInput={e => e.target.setCustomValidity("")}
                onChange={(event) => {
                  event.preventDefault();
                  const name = event.target.name;
                  const value = event.target.value;
                  contactModel.company = event.target.value;
                  seterrMessage(null);
                  validateField(name, value);
                }}

              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="jobtitle"
                label="Job Title"
                type="text"
                id="jobtitle"
                onInvalid={e => e.target.setCustomValidity("Please enter the job title")}
                onInput={e => e.target.setCustomValidity("")}
                onChange={(event) => {
                  event.preventDefault();
                  const name = event.target.name;
                  const value = event.target.value;
                  contactModel.jobtitle = event.target.value;
                  seterrMessage(null);
                  validateField(name, value);
                }}

              />
              <PhoneInput
                name="Phone"
                international
                defaultCountry="US"
                limitMaxLength
                required
                fullWidth
                id="phone"
                label="Phone"
                onChange={(value) => {
                  //event.preventDefault();
                  const name = "phone";
                  const val = value;
                  contactModel.phone = value;
                  seterrMessage(null);
                  if (value) {
                    validateField(name, val);
                  }
                }
                }


              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                label="Business email"
                type="text"
                id="email"
                onInvalid={e => e.target.setCustomValidity("Please enter your business email")}
                onInput={e => e.target.setCustomValidity("")}
                onChange={(event) => {
                  event.preventDefault();
                  const name = event.target.name;
                  const value = event.target.value;
                  contactModel.email = event.target.value;
                  seterrMessage(null);
                  validateField(name, value);
                }}

              />
              {/*<FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
          />*/}
              <Button
                type="submit"
                fullWidth

                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: '#0D9F98' }}
              >
                Get the Whitepaper
              </Button>
              <div className="container-fluid mt_20 mb_20">
                <Col md='12 vcenter' sm="12" xs="12" lg="12" xl="12">
                  {errMessage ? <div className="row text-center error-lbl-textarea">{errMessage}</div> : null}
                </Col>
              </div>
              {/* <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
          </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />*/}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default  WhitePaper;
class ContactModel {
  constructor() {

  }
}