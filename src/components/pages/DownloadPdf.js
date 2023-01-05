import React, { Component } from 'react';
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';
import 'react-phone-number-input/style.css';

import { Col } from 'reactstrap';
import { Helmet } from "react-helmet";
import TopBarProgress from "react-topbar-progress-indicator";

import '../../App.css';

TopBarProgress.config({
  barColors: {
    "0": "#B0EADE",
    "1.0": "#B0EADE"
  },
  shadowBlur: 5,
  shadowColor: "#B0EADE"
});
export default class DownloadPdf extends Component {
  constructor(props) {
    console.log(props)
    super(props);
    this.state = {
      loading: false,
      surl: '',

    };


    this.onDismiss = this.onDismiss.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0, 0);

  }

  onDismiss() {
    this.setState({ visible: false });
    this.setState({ alertSuccess: '' });
    this.setState({ msgAlert: "" });
  }



  render() {
    console.log(this.props.surl);
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Helios Whitepaper</title>
          <meta name="description" content="Data Mesh Principles and Logical Architecture." />
          {/* <link rel="canonical" href="" /> */}
        </Helmet>
        <div className=" container-fluid input-text " md="12" sm="12" xs="12" lg="12" xl="12">

          <div className="td__header " >
            <div className=" td__header-content text-center" md="6" sm="6" xs="6" lg="6" xl="6">

              <Col className='td__header-content td__top' md="12" sm="12" xs="12" lg="12" xl="12" >
                <h1 style={{ color: 'black' }}>Thanks for your interest.</h1>
                <p></p>
                {window.innerWidth < 750 ?
                  <h2 class="h3--navy" style={{ textAlign: 'center', }}>You can download “<a style={{ color: '#0D9F98', fontWeight: 'bold' }} href={this.props.surl} target="_blank">Data Mesh on AWS - Technical Guide</a>” <br />now or access it later from your inbox.</h2>
                  : <h3 class="h3--navy" style={{ textAlign: 'center' }}>You can download “<a style={{ color: '#0D9F98', fontWeight: 'bold' }} href={this.props.surl} target="_blank">Data Mesh on AWS - Technical Guide</a>” <br />now or access it later from your inbox.</h3>
                }
              </Col>
            </div>
          </div>
          <div className="container-fluid text-center mb_20">
            <Col md='12 vcenter' sm="12" xs="12" lg="12" xl="12">
              <Button sx={{
                width: '300px', height: '50px', backgroundColor: '#0D9F98', "&:hover": {
                  border: "1px solid ", color: 'white', backgroundColor: 'gray'
                }, color: 'white'
              }}
                type="submit"
                fontWeight='bold'
                variant="outlined"

              >
                <Typography  >
                  <a style={{ backgroundColor: '#0D9F98', color: 'white' }} sx={{
                    fontWeight: 'bold', "&:hover": {
                      border: "1px solid ", backgroundColor: 'gray'
                    }
                  }} href={this.props.surl} target="_blank">Download Now</a>

                </Typography>
              </Button>
            </Col>
          </div>
        </div>

      </div >
    );
  }
}

