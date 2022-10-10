import { React, Component } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
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
import { Helmet } from "react-helmet";

import TopBarProgress from "react-topbar-progress-indicator";


var validator = require("email-validator");

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
      theme: createTheme(),
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
      sendMailLink: "https://tnqr3vc7ed.execute-api.us-east-1.amazonaws.com/default/sendwpmail-dev",
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

  handleSubmit() {
    var errMessage = "";

    let { contactModel, sendMailLink } = this.state;
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
    if (!this.state.formValid) {
      errMessage = "Please check all entries."
    }
    if (errMessage === "") {
      mcontext.setOnProgress();
      var form = new FormData()
      form.append('name', contactModel.name);
      form.append('title', contactModel.title);
      form.append('email', contactModel.email);
      form.append('phone', contactModel.phone);
      form.append('company', contactModel.company);
      form.append('surl', contactModel.surl);
      var mailLink = sendMailLink + '?rcptTo=' + (String(contactModel.email))
      //?filename=' + encodeURIComponent(String(folder + filename)).replace(/%2F/g, "/") + (String('&contentType=')) + (String(contentType)) + (String('&apiType=')) + (String(type)) + (String('&text=')) + encodeURIComponent(String(input)).replace(/%20/g, "+")
      console.log(mailLink)
      var xhr = new XMLHttpRequest()
      //xhr.withCredentials = true;
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          console.log("status = ", xhr.status);
          mcontext.setOnProgress();
          if (xhr.status === 200) {
            mcontext.setState({ msgAlert: 'Thank you for the interest. We will contact you within one business day.' });
            mcontext.setState({ alertSuccess: 'success' });
            mcontext.setState({ contactModel: new ContactModel() });
          } else {
            mcontext.setState({ msgAlert: "Please try again after some time" });
            mcontext.setState({ alertSuccess: 'danger' });
          }
          console.log(xhr.responseText)
        }
      }
      // xhr.open("POST", "https://toxsswlv99.execute-api.us-east-1.amazonaws.com/prod/dsk");
      xhr.open("POST", mailLink);
      xhr.setRequestHeader("content-type", "application/json");
      xhr.send(form);
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
      case 'Message':
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
    this.setState({ formValid: this.state.nameValid && this.state.titleValid && this.state.emailValid && this.state.companyValid });
  }
  render() {
    let { contactModel } = this.state;

    //const phoneInputRef = useRef(null);
    return (
      <div>
         <Helmet>
          <meta charSet="utf-8" />
          <title>Triadh Contact</title>
          <meta name="description" content="Get in touch for predictable, scalable, cost effective AI, Machine Learning, Deep Learning and AWS Sagemaker Services." />
          {/* <link rel="canonical" href="" /> */}
        </Helmet>
        <div>{this.state.loading && <TopBarProgress />}</div>
        <ThemeProvider theme={this.state.theme}>
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
                {this.state.alertSuccess === 'success' ? <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
                  {this.state.msgAlert}
                </Alert>
                  : this.state.alertSuccess === 'danger' ? <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                    {this.state.msgAlert}
                  </Alert> : null}
                <div className="container-fluid text-center  contact-val">
                  <Col md='12' sm="12" xs="12" lg="12" xl="12">
                    <FormErrors formErrors={this.state.formErrors} />
                  </Col>
                </div>
                <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 1 }}>
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
                      this.setState({ errMessage: null })
                      this.setState({ [name]: value },
                        () => { this.validateField(name, value) });
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
                      this.setState({ errMessage: null })
                      this.setState({ [name]: value },
                        () => { this.validateField(name, value) });
                    }}

                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="title"
                    label="Title"
                    type="text"
                    id="title"
                    onInvalid={e => e.target.setCustomValidity("Please enter the job title")}
                    onInput={e => e.target.setCustomValidity("")}
                    onChange={(event) => {
                      event.preventDefault();
                      const name = event.target.name;
                      const value = event.target.value;
                      contactModel.title = event.target.value;
                      this.setState({ errMessage: null })
                      this.setState({ [name]: value },
                        () => { this.validateField(name, value) });
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
                      this.setState({ errMessage: null })
                      if (value) {
                        this.setState({ [name]: value },
                          () => { this.validateField(name, val) });
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
                      this.setState({ errMessage: null })
                      this.setState({ [name]: value },
                        () => { this.validateField(name, value) });
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
                      {this.state.errMessage ? <div className="row text-center error-lbl-textarea">{this.state.errMessage}</div> : null}
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
      </div>
    );
  }
};

class ContactModel {
  constructor() {

  }
}