import React, { Component } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import WP from '../../image/EN-EB-BigBookofDS.png';
import LogoTriadh from '../../image/logo_new.png'
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
      sendMailLink: "https://e3xo8zk3xc.execute-api.us-west-2.amazonaws.com/default/sendWPMail-dev"

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

    let { contactModel, sendMailLink } = this.state;
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

      const mailLink = sendMailLink + '?email=' + (String(contactModel.email)) + (String('&name=')) + (String(contactModel.name)) + (String('&title=')) + (String(contactModel.title)) + (String('&company=')) + (String(contactModel.company)) + (String('&title=')) + (String(contactModel.title)) + (String('&phone=')) + (String(contactModel.phone));
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
          console.log(error);
          mcontext.setState({ msgAlert: error.message});
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
        nameValid = value.length >= 3;
        fieldValidationErrors.Name = nameValid ? '' : ' is too short';
        break;
      case 'Title':
        titleValid = value.length >= 2;
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
        <section class="article-section custom-container " >
        <div class="container components-main-container">
          <div class="row justify-content-between">
            <div class="component-area column-component col-6 col-md-9 col-lg-9 content-area pb-2 px-xl-0">
              <div class="mt-4">
              <Link className="link " to='/'><img loading="lazy" src={LogoTriadh} alt="Triadh Logo" width="150" height="50" class="alignnone size-medium" role="img" />
            </Link>
             </div>
          </div>
          <div class="component-area column-component col-6 col-md-3 col-lg-3 content-area py-4">
            <p class="h4" style={{color:'#0D9F98'}}>Data science simplified</p>
        </div>
        </div>
        </div>
        </section>
      <section class="article-section custom-container container-fluid has-background"  style={{backgroundColor:'#0D9F98', minHeight:'300px'}}>
        <div class="container components-main-container">
        <div class="row justify-content-between">
          <div class="component-area column-component col-12 col-md-6 col-lg-6 content-area pt-3 pb-0 px-xl-0 mt-4 mt-lg-3 d-flex flex-column justify-content-center">
              <div class="mb-1" style={{ fontFamily: "DM Sans", fontSize: "32px", lineHeight: "46px", color:" #ffffff", fontWeight:"500"}}>eBook
        </div>
            <h1 class="mb-1" style={{ fontFamily: "DM Sans", fontSize: "40px", lineHeight: "52px", color: "#ffffff",fontWeight:"600"}}>The Big Book of Data Science Use Cases</h1>
        <p class="b1-regular" style={{fontSize: "25px", lineHeight: "35px",fontFamily: "DM Sans", color:"#ffffff"}}>Your complete how-to guide to putting data science to work — plus code samples and notebooks</p>
      </div>
      <div class="col-auto component-area mx-auto content-area empty-component ">
        </div>
        <div class="component-area column-component col-12 col-md-3 col-lg-3 content-area p-0 graphic_header">
          <p>
            <img loading="lazy" src={ WP} alt="" width="300" height="300" class="alignleft none size-medium wp-image-196209 lazy lz-entered lz-loaded" sizes="(max-width: 300px) 100vw, 300px" data-ll-status="loaded"/>
            </p>
        </div>
        </div>
        </div>
      </section>
      <section class="article-section custom-container pt-5 mt-4 article-with-form">
          <Grid container component="main" >
            <CssBaseline />
            <div class="container components-main-container">
            <div class="row justify-content-between">
              <div class="component-area column-component col-12 col-md-6 col-lg-6 content-area pb-5 pb-md-0" style ={window.innerWidth > 750 ? {order:"0"} : {order:"1"} }>
                <p>The world of data science is evolving so quickly that it’s challenging to find real-life use cases that are relevant to your day-to-day work.</p>
                <p>That’s why we’ve created this comprehensive guide you can start using right away. Get everything you need — use cases, code samples and notebooks — so you can start putting the Databricks Lakehouse Platform to work today.</p>
                <p>Plus, you’ll get case studies from leading companies like Comcast, Regeneron and Nationwide.</p>
                <p>You’ll learn about:</p>
                <ul class="mb-4">
                  <li>Time series analysis for fraud detection</li>
                  <li>Techniques such as dynamic time warping to improve sales and revenue forecasts</li>
                  <li>How to execute fine-grained time series forecasting at scale with Facebook Prophet</li>
                  <li>Parallelizing large simulations with Apache Spark<sup>TM</sup></li>
                </ul>
              </div>
              <div class="component-area column-component col-12 col-md-6 col-lg-6 content-area pb-5 pb-md-0" style ={window.innerWidth > 750 ? {order:"1"} : {order:"0"} }>
            
              <Box
                sx={{
                  my: 0,//8
                  mx: 4,//4
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                  backgroundPosition: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',

                }}
              >
               
                <Typography component="h1" variant="h5">
                 Read Now

                </Typography>
                {this.state.alertSuccess === 'success' ? <Alert severity="success" onClose={this.onDismiss}>
                  {this.state.msgAlert}
                </Alert>
                  : this.state.alertSuccess === 'danger' ? <Alert severity="error" onClose={this.onDismiss}>
                    {this.state.msgAlert}
                  </Alert> : null}
                <div>
                  <Col md='12' sm="12" xs="12" lg="12" xl="12">
                    <FormErrors formErrors={this.state.formErrors} />
                  </Col>
                </div>
                <div  md="12" sm="12" xs="12" lg="12" xl="12">

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
                        autoFocus
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
                  <Button sx={{ mt: 3, mb: 2, backgroundColor: '#0D9F98' }}
                type="submit"
                fullWidth
                variant="outlined"
                onClick={() => this.submitForm()}
                
              >
                Get the eBook
              </Button>
                {this.state.errMessage ? 
              <div className="container-fluid mt_20 mb_20">
                <Col md='12 vcenter' sm="12" xs="12" lg="12" xl="12">
                  <div className="row text-center error-lbl-textarea">{this.state.errMessage}</div> 
                </Col>
              </div>: null}
                </div>
                
              </Box>
                  </div>
            
          </div>
          </div>
          </Grid>
          </section >
        </ThemeProvider>
      </div >
    );
  }
}

class ContactModel {
  constructor() {

  }
}