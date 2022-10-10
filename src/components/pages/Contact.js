import React, { Component } from 'react';
import { Col, Label, Button } from 'reactstrap';
import { FormErrors } from '../FormErrors';
import { Alert } from '@mui/material';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Helmet } from "react-helmet";
import { GoogleReCaptchaProvider, GoogleReCaptcha } from 'react-google-recaptcha-v3';
import TopBarProgress from "react-topbar-progress-indicator";
import '../../App.css';
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
export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msgInfocus: false,
      email: '',
      phone: '',
      name: '',
      title: '',
      msg: '',
      formErrors: { Name: '', Title: '', Email: '', Phone: '', Message: '', },
      nameValid: false,
      titleValid: false,
      phoneValid: false,
      emailValid: false,
      msgValid: false,
      formValid: false,
      contactModel: new ContactModel(),
      autoFocus: false,
      loading: false,
      errMessage: "",
      visible: true,
      msgAlert: "",
      alertSuccess: '',

    };
    mcontext = this;
    this.focusRef = React.createRef();
    this.onDismiss = this.onDismiss.bind(this);
  }
  componentWillMount() {
    window.scrollTo(0, 0);
  }
  callback(token) {
    console.log(token);
  }
  onDismiss() {
    this.setState({ visible: false });
    this.setState({ alertSuccess: '' });
    this.setState({ msgAlert: "" });
  }
  submitForm() {

    var errMessage = "";

    let { contactModel } = this.state;
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


    if (!contactModel.message) {
      errMessage = errMessage + "Message Required. \r\n";
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
      //form.append('comname', contactModel.comname);
      form.append('message', contactModel.message);
      form.append('recaptcha', this.captchatoken);
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
      //xhr.open("POST", "https://toxsswlv99.execute-api.us-east-1.amazonaws.com/prod/dsk");
      xhr.open("POST", "https://hdy1gtzwre.execute-api.us-east-1.amazonaws.com/default/SendEmail-test");
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
    let msgValid = this.state.msgValid;


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
        msgValid = value.length >= 2;
        fieldValidationErrors.Message = msgValid ? '' : ' is too short';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      nameValid: nameValid,
      titleValid: titleValid,
      msgValid: msgValid,
      emailValid: emailValid,
      phoneValid: phoneValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.nameValid && this.state.titleValid && this.state.emailValid && this.state.phoneValid });
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }

  render() {
    let { contactModel } = this.state;

    //const phoneInputRef = useRef(null);
    return (
      <div className="container-fluid td__top ">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Triadh Contact</title>
          <meta name="description" content="Get in touch for predictable, scalable, cost effective AI, Machine Learning, Deep Learning and AWS Sagemaker Services." />
          {/* <link rel="canonical" href="" /> */}
        </Helmet>
        <div>{this.state.loading && <TopBarProgress />}</div>


        <GoogleReCaptchaProvider reCaptchaKey="6LcsnPIUAAAAAFtykko0C3nRDGC52DmOaLsSZbKx">
          <GoogleReCaptcha
            ref={"captcha"}
            onVerify={
              token => {
                console.log("received token -->", token)
                this.captchatoken = token;
              }
            } />
        </GoogleReCaptchaProvider>

        {!this.state.msgInfocus ?
          <div className="container-fluid text-center  contact-val ">
            <Col md='12' sm="12" xs="12" lg="12" xl="12">
              <FormErrors formErrors={this.state.formErrors} />
            </Col>
          </div> : null}
        <div className=" container-fluid input-text " md="12" sm="12" xs="12" lg="12" xl="12">

          <div className="td__header mb_20" >
            <div className=" td__header-content text-center" md="6" sm="6" xs="6" lg="6" xl="6">


              <div ><Label className="content lbl_txt">Name:<sup className="red_star">*</sup></Label></div>

              <div className='td__header-content__input '>
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
                {this.state.nameError ? <span className="error-lbl">{this.state.nameError}</span> : null}

              </div>

              <div><Label className="content lbl_txt">Job Title:<sup className="red_star">*</sup></Label></div>

              <div className='td__header-content__input '>
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
                {this.state.titleError ? <span className="error-lbl">{this.state.titleError}</span> : null}
              </div>
            </div>
            <div className=" td__header-content" md="6" sm="6" xs="6" lg="6" xl="6">
              <div><Label className="content lbl_txt">Work Email:<sup className="red_star">*</sup></Label></div>

              <div className='td__header-content__input '>
                <input type="email" className="form-control" name="Email"
                  value={contactModel.email ? contactModel.email : ''}
                  ref={"email"}
                  onChange={(event) => {
                    const name = event.target.name;
                    const value = event.target.value;
                    contactModel.email = event.target.value;
                    //this.setState({ contactModel, nameError: null },);
                    this.setState({ msgInfocus: false });
                    this.setState({ errMessage: null });
                    this.setState({ [name]: value },
                      () => { this.validateField(name, value) });

                  }}
                  required></input>
                {this.state.emailError ? <span className="error-lbl">{this.state.emailError}</span> : null}
              </div>
              <div><Label className="content lbl_txt">Work Phone:<sup className="red_star">*</sup></Label></div>

              <div className='td__header-content__input '>
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
                    //this.setState({ contactModel, nameError: null },);
                    this.setState({ errMessage: null });
                    this.setState({ msgInfocus: true });
                    if (value) {
                      this.setState({ [name]: value },
                        () => { this.validateField(name, val) });
                    }

                  }}
                />
                {this.state.phoneError ? <span className="error-lbl">{this.state.phoneError}</span> : null}

              </div>

            </div>

          </div>

        </div>
        {this.state.msgInfocus ?
          <div className="container-fluid text-center  contact-val">
            <Col md='12' sm="12" xs="12" lg="12" xl="12">
              <FormErrors formErrors={this.state.formErrors} />
            </Col>
          </div> : null}
        <div className="container-fluid text-left  contact">
          <Col >
            <h6 className="title-txt">HOW CAN WE HELP YOU?</h6>
          </Col>
        </div>

        <div className="container-fluid input-text  mb_20">
          <Col >
            <div className="row mt_20 mb_20">

              <Col md="2" lg="2" xl="2"></Col>

              <Col md='8' sm="12" xs="12" lg="8" xl="8">

                <textarea className="form-control content" type="textarea" id="message" name="Message" placeholder="Message"
                  value={contactModel.message ? contactModel.message : ""}
                  ref={"message"}
                  onChange={(event) => {
                    event.preventDefault();
                    const name = event.target.name;
                    const value = event.target.value;
                    contactModel.message = event.target.value;
                    this.setState({ msgInfocus: true });
                    this.setState({ [name]: value },
                      () => { this.validateField(name, value) });

                  }}
                  maxLength={2000} rows="7"></textarea>

              </Col>

              <Col md="2" lg="2" xl="2"></Col>
            </div>
            {this.state.alertSuccess === 'success' ? <Alert severity="success" onClose={this.onDismiss}>
              {this.state.msgAlert}
            </Alert>
              : this.state.alertSuccess === 'danger' ? <Alert severity="error" onClose={this.onDismiss}>
                {this.state.msgAlert}
              </Alert> : null}
            <div className="container-fluid text-center mt_20 mb_20">
              <Col md='12 vcenter' sm="12" xs="12" lg="12" xl="12">
                <Button className="submitBtn" onClick={() => this.submitForm()}>Submit</Button>
              </Col>
            </div>
            <div className="container-fluid mt_20 mb_20">
              <Col md='12 vcenter' sm="12" xs="12" lg="12" xl="12">
                {this.state.errMessage ? <div className="row text-center error-lbl-textarea">{this.state.errMessage}</div> : null}
              </Col>
            </div>
          </Col>
        </div>
      </div >




    );
  }
}

/*export default () => {
  const alert = useAlert();
  return (
    <Contact alert={alert} />
  )
}*/
class ContactModel {
  constructor() {
    // this.name="test";
    // this.title="test";
    // this.email="test@gmail.com";
    // this.phone="911234567890";
    // this.comname="test";
    // this.message="test"
  }
}