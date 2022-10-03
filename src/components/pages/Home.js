import React, { Component } from 'react';

import { Col, } from 'reactstrap';

import ReactCardFlip from 'react-card-flip';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import '../../App.css'




var mContext;
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFlipped1: false,
            isFlipped2: false,
            isFlipped3: false,
            isShow: true,
        };
        mContext = this;
    }
    componentWillMount() {
        window.scrollTo(0, 0);
    }
    handleClick(e, type) {
        e.preventDefault();
        switch (type) {
            case "first":
                mContext.setState(prevState => ({ isFlipped1: !prevState.isFlipped1, isFlipped2: false, isFlipped3: false }));
                break;
            case "second":
                mContext.setState(prevState => ({ isFlipped1: false, isFlipped2: !prevState.isFlipped2, isFlipped3: false }));
                break;
            case "third":
                mContext.setState(prevState => ({ isFlipped1: false, isFlipped2: false, isFlipped3: !prevState.isFlipped3 }));
                break;
            default:
                break;
        }

    }

    componentWillUnmount() {


    }

    render() {
        return (
            <div className="container-fluid text-center">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Triadh Data Mesh Provider</title>
                    <meta name="description" content="Triadh is a Computer/Machine Vision, Data Mesh, Data Product, Data Product Catalog  Provider company based out of Dallas, TX, USA" />
                    {/* <link rel="canonical" href="" /> */}
                </Helmet>
                <div className="row">
                    <Col className='td__header-content td__top' md="12" sm="12" xs="12" lg="12" xl="12" >
                        <h2 >INNOVATE, INVENT AND TRANSFORM</h2>
                        <h3>AN ENGINEERING FIRM DRIVING VALUE GENERATION FOR THE BUSINESS</h3>
                    </Col>

                </div>


                <div className="container-fuild mt_20 mb_20">
                    <div className="row">
                        <Col md="4" sm="12" xs="12" lg="4" xl="4" className="mb_20">
                            <ReactCardFlip isFlipped={this.state.isFlipped1} flipDirection="horizontal" infinite flipSpeedFrontToBack={3.0} flipSpeedBackToFront={3.0}>
                                <div className="frontside" onClick={(e) => this.handleClick(e, "first")}>
                                    <div className="card bg_img_front_1">
                                        <div className="card-body text-center">
                                            <Col md="12 text-center vcenter" sm="12" xs="12" lg="12" xl="12">
                                                {/* <p className="card-text">StoLav</p> */}
                                                <p className="card-text">Deep Learning and <br /> Machine Vision </p>
                                            </Col>
                                        </div>
                                    </div>
                                </div>
                                <div className="backside" onClick={(e) => this.handleClick(e, "first")} >
                                    <div className="card bg_img_back">
                                        <div className="card-body text-center">
                                            <p className="card-text back-text"> Get insights from real-time videos and images, deploy on-prem, cloud, IoT and embedded devices. <Link className="link" to='/Helios'><strong>Learn more</strong></Link></p>

                                        </div>
                                    </div>
                                </div>
                            </ReactCardFlip>
                        </Col>
                        <Col md="4" sm="12" xs="12" lg="4" xl="4" className="mb_20">
                            <ReactCardFlip isFlipped={this.state.isFlipped2} flipDirection="horizontal" infinite flipSpeedFrontToBack={3.0} flipSpeedBackToFront={3.0}>
                                <div className="frontside" onClick={(e) => this.handleClick(e, "second")}>
                                    <div className="card bg_img_front_2">
                                        <div className="card-body text-center">
                                            <Col md="12 text-center vcenter" sm="12" xs="12" lg="12" xl="12">
                                                <p className="card-text second-card">Data Product and Data Mesh</p>
                                            </Col>
                                        </div>
                                    </div>
                                </div>
                                <div className="backside" onClick={(e) => this.handleClick(e, "second")}>
                                    <div className="card bg_img_back">
                                        <div className="card-body text-center">
                                            <p className="card-text back-text">Treat data as a product and bring disparate data into a mesh to get a 360 view of your customers and operations.<Link className="link" to='/Theia'><strong>Learn more</strong></Link></p>
                                        </div>
                                    </div>
                                </div>
                            </ReactCardFlip>
                        </Col>
                        <Col md="4" sm="12" xs="12" lg="4" xl="4" className="mb_20">
                            <ReactCardFlip isFlipped={this.state.isFlipped3} flipDirection="horizontal" infinite flipSpeedFrontToBack={3.0} flipSpeedBackToFront={3.0}>
                                <div className="frontside" onClick={(e) => this.handleClick(e, "third")}>
                                    <div className="card bg_img_front_1">
                                        <div className="card-body text-center">
                                            <Col md="12 text-center vcenter" sm="12" xs="12" lg="12" xl="12">
                                                <p className="card-text">ServiceNow Practice</p>
                                            </Col>
                                        </div>
                                    </div>
                                </div>
                                <div className="backside" onClick={(e) => this.handleClick(e, "third")}>
                                    <div className="card bg_img_back">
                                        <div className="card-body text-center">
                                            <p className="card-text back-text">Optimize your operations and business processes using our solutions and team of architects, consultants, and implementors.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </ReactCardFlip>
                        </Col>
                    </div>
                </div>
            </div>
        );
    }
}