import React, { Component } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

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
import { Col, Label } from 'reactstrap';
import { Helmet } from "react-helmet";
import TopBarProgress from "react-topbar-progress-indicator";
import { Alert } from '@mui/material';
import '../../App.css';
import axios from 'axios';
var validator = require("email-validator");
const theme = createTheme();
var mcontext;
TopBarProgress.config({
  barColors: {
    "0": "#B0EADE",
    "1.0": "#B0EADE"
  },
  shadowBlur: 5,
  shadowColor: "#B0EADE"
});
export default class WhitePaper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      contactModel: new ContactModel(),
      errMessage: "",
      msgAlert: "",
      alertSuccess: '',
      bVisible: false,
      formErrors: { Name: '', Title: '', Email: '', Phone: '', Company: '', },
      nameValid: false,
      titleValid: false,
      phoneValid: false,
      emailValid: false,
      companyValid: false,
      formValid: false,
      sendMailLink:"https://tnqr3vc7ed.execute-api.us-east-1.amazonaws.com/default/sendwpmail-dev",

    };
    mcontext = this;

    this.onDismiss = this.onDismiss.bind(this);
  }
  componentWillMount() {
    window.scrollTo(0, 0);
  }

  onDismiss() {
    this.setState({ visible: false });
    this.setState({ alertSuccess: '' });
    this.setState({ msgAlert: "" });
  }

  submitForm() {
    var errMessage = "";

    let { contactModel, sendMailLink} = this.state;
    console.log("submit form called");
    console.log(contactModel.name, contactModel.title, contactModel.company, contactModel.phone, contactModel.email)
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


    if (errMessage === "") {
      console.log("No Error", errMessage);
      mcontext.setOnProgress();
      //var form = new FormData()
      //this.getURL();
      const mailLink = sendMailLink + '?email=' + (String(contactModel.email)) + (String('&name=')) + (String(contactModel.name)) + (String('&title=')) + (String(contactModel.title))+ (String('&company=')) + (String(contactModel.company))+ (String('&title=')) + (String(contactModel.title)) + (String('&phone=')) + (String(contactModel.phone));
        //?filename=' + encodeURIComponent(String(folder + filename)).replace(/%2F/g, "/") + (String('&contentType=')) + (String(contentType)) + (String('&apiType=')) + (String(type)) + (String('&text=')) + encodeURIComponent(String(input)).replace(/%20/g, "+")
        console.log(mailLink)
       
        let res = axios.post(mailLink)
            .then(res => {
              mcontext.setOnProgress();
                console.log(res);
                console.log("res.data");
                mcontext.setState({ msgAlert: 'Thank you for the interest. Please check your email for the download link.' });
                mcontext.setState({ alertSuccess: 'success' });
                mcontext.setState({ contactModel: new ContactModel() });

            })
            .catch(error => {
              mcontext.setState({ msgAlert: "Please try again after some time" });
              mcontext.setState({ alertSuccess: 'danger' });
            });; 
          }
      else {
      console.log("Error Message", errMessage);

      errMessage = "Enter the values for all fields marked (*).";
      this.setState({ errMessage: errMessage });

    }
  }
  setOnProgress() {
    mcontext.setState(prevState => ({ loading: !prevState.loading }));
  }
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let titleValid = this.state.titleValid;
    let emailValid = this.state.emailValid;
    let phoneValid = this.state.phoneValid;
    let companyValid = this.state.companyValid;
    switch (fieldName) {
      case 'Name':
        console.log("validate field", fieldName);
        nameValid = value.length >= 4;
        fieldValidationErrors.Name = nameValid ? '' : ' is too short';
        break;
      case 'Title':
        titleValid = value.length >= 4;
        fieldValidationErrors.Title = titleValid ? '' : ' is too short';
        break;

      case 'Phone':

        phoneValid = value.length >= 10;
        fieldValidationErrors.Phone = phoneValid ? '' : ' is not valid';

        break;
      case 'Email':
        emailValid = value.match(/^[a-zA-Z0-9.%+-]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)(?!yahoo.co.in)(?!aol.com)(?!live.com)(?!outlook.com)(?!rediffmail.com)([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.Email = emailValid ? '' : ' is invalid. Only business email id allowed.';
        break;
      case 'Company':
        companyValid = value.length >= 2;
        fieldValidationErrors.Company = companyValid ? '' : ' is too short';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      nameValid: nameValid,
      titleValid: titleValid,
      companyValid: companyValid,
      emailValid: emailValid,
      phoneValid: phoneValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.nameValid && this.state.titleValid && this.state.emailValid && this.state.phoneValid && this.state.companyValid });
    console.log("validatForm", this.state.formValid)
  }
  getURL = async () => {
    let { contactModel } = this.state;
    const bucketName = "triadhdigital-dev";
    const identityPoolId = "us-east-1:7824234e-8819-4890-872f-e2638ffa3650";
    const accessKeyId = "AKIATCQIHVJUF2KJWQHX";
    const secretKey = "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";
    const value1="whitepaper/HeliosWhitepaper.pdf"
    
    require('dotenv')
    require('dotenv').config();
    var AWS = require('aws-sdk');
    var credentials = {
      accessKeyId: accessKeyId,
      secretAccessKey: secretKey,
      identity_pool_id: identityPoolId
    };
    AWS.config.update({ credentials: credentials, region: 'us-east-1' });
    var s3 = new AWS.S3();

    var presignedGETURLatt = s3.getSignedUrl('getObject', {
      Bucket: bucketName,
      Key: `${value1}`, //filename
      Expires: 1000 //time to expire in seconds
    });
    console.log(presignedGETURLatt);
    contactModel.surl=presignedGETURLatt;

  }
  render() {
    let { contactModel } = this.state
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Helios Whitepaper</title>
          <meta name="description" content="Data Mesh Principles and Logical Architecture." />
          {/* <link rel="canonical" href="" /> */}
        </Helmet>
        <div>{this.state.loading && <TopBarProgress />}</div>
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
                {this.state.alertSuccess === 'success' ? <Alert severity="success" onClose={this.onDismiss}>
                  {this.state.msgAlert}
                </Alert>
                  : this.state.alertSuccess === 'danger' ? <Alert severity="error" onClose={this.onDismiss}>
                    {this.state.msgAlert}
                  </Alert> : null}
                <div className="container-fluid text-center  contact-val">
                  <Col md='12' sm="12" xs="12" lg="12" xl="12">
                    <FormErrors formErrors={this.state.formErrors} />
                  </Col>
                </div>
                <div className=" container-fluid input-text " md="12" sm="12" xs="12" lg="12" xl="12">

                  <div className=" td__header-content" md="12" sm="12" xs="12" lg="12" xl="12">
                    <div><Label className="content lbl_txt">Name:<sup className="red_star">*</sup></Label></div>

                    <div className='td__header-content__inputwp '>
                      {/* <input type="file" onChange={(event)=>this.Upload(event)}></input> */}
                      <input type="text" className="form-control" name="Name"
                        value={contactModel.name ? contactModel.name : ""}
                        ref={"name"}
                        // onChange={(event) => this.onChange(event)}
                        onChange={(event) => {
                          event.preventDefault();
                          const name = event.target.name;
                          const value = event.target.value;
                          contactModel.name = event.target.value;
                          //this.setState({ contactModel, nameError: null },);
                          this.setState({ msgInfocus: false });
                          this.setState({ errMessage: null })
                          this.setState({ [name]: value },
                            () => { this.validateField(name, value) });

                        }}
                        maxLength={50} required

                      ></input>

                    </div>
                  </div>
                  <div className=" td__header-content" md="12" sm="12" xs="12" lg="12" xl="12">
                    <div><Label className="content lbl_txt">Job Title:<sup className="red_star">*</sup></Label></div>

                    <div className='td__header-content__inputwp '>
                      <input type="text" className="form-control" name="Title"
                        value={contactModel.title ? contactModel.title : ''}
                        ref={"title"}
                        onChange={(event) => {
                          event.preventDefault();
                          const name = event.target.name;
                          const value = event.target.value;
                          contactModel.title = event.target.value;
                          //this.setState({ contactModel, nameError: null },);
                          this.setState({ msgInfocus: false });
                          this.setState({ errMessage: null })
                          this.setState({ [name]: value },
                            () => { this.validateField(name, value) });

                        }}
                        maxLength={30}
                        required></input>
                    </div>
                  </div>
                  <div className=" td__header-content" md="12" sm="12" xs="12" lg="12" xl="12">
                    <div><Label className="content lbl_txt">Company:<sup className="red_star">*</sup></Label></div>

                    <div className='td__header-content__inputwp '>
                      <input type="text" className="form-control" name="Company"
                        value={contactModel.company ? contactModel.company : ''}
                        ref={"company"}
                        onChange={(event) => {
                          event.preventDefault();
                          const name = event.target.name;
                          const value = event.target.value;
                          contactModel.company = event.target.value;

                          this.setState({ errMessage: null })
                          this.setState({ [name]: value },
                            () => { this.validateField(name, value) });

                        }}
                        maxLength={30}
                        required></input>
                    </div>
                  </div>

                  <div className=" td__header-content" md="12" sm="12" xs="12" lg="12" xl="12">
                    <div><Label className="content lbl_txt">Work Email:<sup className="red_star">*</sup></Label></div>

                    <div className='td__header-content__inputwp '>
                      <input type="email" className="form-control" name="Email"
                        value={contactModel.email ? contactModel.email : ''}
                        ref={"email"}
                        onChange={(event) => {
                          const name = event.target.name;
                          const value = event.target.value;
                          contactModel.email = event.target.value;

                          this.setState({ errMessage: null });
                          this.setState({ [name]: value },
                            () => { this.validateField(name, value) });

                        }}
                        required></input>
                    </div>
                  </div>
                  <div className=" td__header-content" md="12" sm="12" xs="12" lg="12" xl="12">

                    <div><Label className="content lbl_txt">Work Phone:<sup className="red_star">*</sup></Label></div>

                    <div className='td__header-content__inputwp '>
                      <PhoneInput name="Phone"
                        international
                        defaultCountry="US"
                        value={contactModel.phone ? contactModel.phone : ""}
                        limitMaxLength
                        autoFocus={this.state.autoFocus}
                        onChange={(value) => {
                          //event.preventDefault();
                          const name = "Phone";
                          const val = value;
                          contactModel.phone = value;

                          this.setState({ errMessage: null });

                          if (value) {
                            this.setState({ [name]: value },
                              () => { this.validateField(name, val) });
                          }

                        }}
                      />

                    </div>
                  </div>
                </div>
                <div className="container-fluid input-text">
                  <Col >
                    <div className="container-fluid text-center">
                      <Col md='12 vcenter' sm="12" xs="12" lg="12" xl="12">
                        <Button className="submitBtn" onClick={() => this.submitForm()}>Submit</Button>
                      </Col>
                    </div>
                    <div className="container-fluid mb_10">
                      <Col md='12 vcenter' sm="12" xs="12" lg="12" xl="12">
                        {this.state.errMessage ? <div className="row text-center error-lbl-textarea">{this.state.errMessage}</div> : null}
                      </Col>
                    </div>
                  </Col>
                </div>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      </div >
    );
  }
}

class ContactModel {
  constructor() {

  }
}