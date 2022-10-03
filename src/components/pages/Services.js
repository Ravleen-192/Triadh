import React, { Component } from 'react';
import { Col, } from 'reactstrap';
//import Computer_vision from '../image/Computer_vision.png';
import '../../App.css'
import MV from '../../image/machine-vision.jpg';
import SC from '../../image/consulting-services.jpg';
import PMS from '../../image/professional-managed-services.jpg';
import SS from '../../image/staffing-services.jpg';
import PP1 from '../../image/PrimaryPaletteColor1.png'
import PP2 from '../../image/PrimaryPaletteColor2.png'
import PP3 from '../../image/PrimaryPaletteColor3.png'

import ReactCardFlip from 'react-card-flip';
import { Helmet } from "react-helmet";
var mContext;


export default class Services extends Component {
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
    render() {
        return (
            <div className="column container-fluid td__top">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Data Mesh and Service Now</title>
                    <meta name="description" content="DEEP LEARNING. MACHINE VISION. DATA STRATEGY., DATA PRODUCT. DATA MESH . SERVICE NOW" />
                    {/* <link rel="canonical" href="" /> */}
                </Helmet>

                <div className=" row container-fluid " md="12" sm="12" xs="12" lg="12" xl="12">
                    <div className=" td__header" >
                        <div className=" td__header-content" md="6" sm="6" xs="6" lg="6" xl="6">
                            <h1 >DEEP LEARNING.
                                MACHINE VISION.
                                DATA STRATEGY.
                                DATA PRODUCT.
                                DATA MESH .
                                SERVICE NOW. ​</h1>
                        </div>

                        <div className=" td__header-image" md="6" sm="6" xs="6" lg="6" xl="6">
                            <img src={MV} />
                        </div>

                    </div>
                    <div className=" bg_img_sback_1 " md="12" sm="12" xs="12" lg="12" xl="12">

                        <div className="td__header-content">

                            <h1 className="td__header-content text-center"><br />Our Services focus on meeting your demands <br />in a very flexible engagement model as below.</h1>

                        </div>

                    </div>


                    <Col md="4" sm="12" xs="12" lg="4" xl="4" className="mt_20 mb_20">
                        <ReactCardFlip isFlipped={this.state.isFlipped1} flipDirection="horizontal" infinite flipSpeedFrontToBack={2.0} flipSpeedBackToFront={2.0}>
                            <div className="frontside" onClick={(e) => this.handleClick(e, "first")}>
                                <div className="card ">
                                    <img src={SC} />
                                    <Col md="12" sm="12" xs="12" lg="12" xl="12">
                                        <button className="frmSbtn2" >Consulting Services </button>
                                    </Col>

                                </div>

                            </div>
                            <div className="backside" onClick={(e) => this.handleClick(e, "first")}>
                                <div className="card ">
                                    <img src={PP1} />
                                    <Col md="12" sm="12" xs="12" lg="12" xl="12">
                                        <button className="frmSbtn2" >Consulting Services </button>
                                    </Col>

                                </div>

                            </div>

                            {/* <div className="backside" onClick={(e) => this.handleClick(e, "first")}>
                                <div className="card bg_img_front_1">
                                    <div className="card-body text-center">

                                        <p className="card-text back-text"> Outcome based consulting to define your technology strategy, eliminate pain points and accelerate business value.</p>
                                </div>

                                </div>

                            </div>*/}
                        </ReactCardFlip>
                    </Col>
                    <Col md="4" sm="12" xs="12" lg="4" xl="4" className="mt_20 mb_20">
                        <ReactCardFlip isFlipped={this.state.isFlipped2} flipDirection="horizontal" infinite flipSpeedFrontToBack={3.0} flipSpeedBackToFront={3.0}>
                            <div className="frontside" onClick={(e) => this.handleClick(e, "second")}>
                                <div className="card ">
                                    <img src={PMS} />
                                </div>
                                <div >
                                    <Col md="12 text-bottom " sm="12" xs="12" lg="12" xl="12">
                                        <button className="frmSbtn2">Managed and Professional Services</button>
                                    </Col>
                                </div>
                            </div>
                            <div className="frontside" onClick={(e) => this.handleClick(e, "second")}>
                                <div className="card ">
                                    <img src={PP2} />
                                </div>
                                <div >
                                    <Col md="12 text-bottom " sm="12" xs="12" lg="12" xl="12">
                                        <button className="frmSbtn2">Managed and Professional Services</button>
                                    </Col>
                                </div>
                            </div>
                            {/*<div className="backside" onClick={(e) => this.handleClick(e, "second")}>
                                <div className="card bg_img_front_1">
                                    <div className="card-body text-center">
                                        <p className="card-text back-text">Fixed-bid implementation and managed contracts in an onshore/offshore model. </p>
                                    </div>
                                </div>
                        </div>*/}
                        </ReactCardFlip>
                    </Col>
                    <Col md="4" sm="12" xs="12" lg="4" xl="4" className="mt_20 mb_20">
                        <ReactCardFlip isFlipped={this.state.isFlipped3} flipDirection="horizontal" infinite flipSpeedFrontToBack={3.0} flipSpeedBackToFront={3.0}>
                            <div className="frontside" onClick={(e) => this.handleClick(e, "third")}>
                                <div className="card ">
                                    <img src={SS} />
                                </div>
                                <div >
                                    <Col md="12 text-bottom " sm="12" xs="12" lg="12" xl="12">
                                        <button className="frmSbtn2">Talent</button>
                                    </Col>
                                </div>
                            </div>
                            <div className="backside" onClick={(e) => this.handleClick(e, "third")}>
                                <div className="card ">
                                    <img src={PP3} />
                                </div>
                                <div >
                                    <Col md="12 text-bottom " sm="12" xs="12" lg="12" xl="12">
                                        <button className="frmSbtn2">Talent</button>
                                    </Col>
                                </div>
                            </div>
                            {/*<div className="backside" onClick={(e) => this.handleClick(e, "third")}>
                                <div className="card bg_img_front_1">
                                    <div className="card-body text-center">
                                        <p className="card-text back-text">Time and material contractors.
                                        </p>
                                    </div>
                                </div>
                    </div>*/}
                        </ReactCardFlip>
                    </Col>

                </div>
            </div>
        );
    }
}
