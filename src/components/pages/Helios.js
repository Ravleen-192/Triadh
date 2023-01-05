import React, { Component } from 'react';
import '../../App.css'

import Heliosimg from '../../image/Heliosimg.jpg';
import ServOverview from '../../image/ServiceOverview-new.png';

import { Helmet } from "react-helmet";


export default class Helios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFlipped1: false,
            isFlipped2: false,
            isFlipped3: false,
            isShow: true,
        };
      
    }
    componentWillMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div className="container-fluid td__top">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Computer Vision and Machine Vision</title>
                    <meta name="description" content="DEEP LEARNING. MACHINE VISION. Human Activity Recognition, Smart Factory" />
                    {/* <link rel="canonical" href="" /> */}
                </Helmet>

                <div className=" row container-fluid " md="12" sm="12" xs="12" lg="12" xl="12">
                    <div className="td__htp mb_20" >
                        <div className=" td__htp-content" md="6" sm="6" xs="6" lg="6" xl="6">
                            <h2>Helios</h2>
                                <h3>Helios is a Computer/Machine Vision platform that provides insights on your real-time video and images using 45+ pre-built features and custom Deep Learning models. ​</h3>
                        </div>

                        <div className="td__header-image  mb_20 " md="6" sm="6" xs="6" lg="6" xl="6">
                            <img src={Heliosimg} />
                        </div>
                    </div>
                </div>
                <div className=" row container-fluid " md="12" sm="12" xs="12" lg="12" xl="12">
                    <div className="td__htp mb_20" >
                        <div className=" td__htp-content" md="6" sm="6" xs="6" lg="6" xl="6">
                        <h2>Overview</h2>
                        <h3>Helios platform accelerates the business growth through reducing the marginal cost of implementing Computer/Machine Vison projects.<br />The complexities of capturing, making sense of the data at real-time and deploying in a secure manner in various hardware (cloud, embedded devices, IoT devices) are abstracted, so you can focus on the outcomes rather than implementation. ​</h3>

                        </div>

                        <div className="td__header-image mb_20 " md="6" sm="6" xs="6" lg="6" xl="6">
                            <img src={ServOverview} />
                        </div>
                    </div>
                </div>
                <div>
                <div className=" row container-fluid " md="12" sm="12" xs="12" lg="12" xl="12">
                    <div className="td__htp mb_20" >
                        <div className=" td__htp-content" md="6" sm="6" xs="6" lg="6" xl="6">
                            <h2>Capabilities</h2>
                        </div>
                    </div>
                </div>

                <div>
                    
                        <div className="row row-pt-md">
                            <div className="col-md-4 text-center animate-box">
                                <div className="services color-5">
                                    <span className="icon">
                                        <i class="fa fa-lightbulb-o"  aria-hidden="true"></i>
                                    </span>
                                    <div className="desc">
                                        <h3>Pre-built features</h3>
                                        <p>45+ micro-features for capturing <br />multi-stream video/audio sources, <br />stitcing, inter-leaving, <br />deep learning models. </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 text-center animate-box">
                                <div className="services color-1">
                                    <span className="icon">
                                        <i class="fa fa-desktop"  aria-hidden="true"></i>
                                    </span>
                                    <div className="desc">
                                        <h3>Deployment </h3>
                                        <p>Solution is optimized to run in a cost effective and secure manner in cloud (AWS, Azure, GCP), Single Board Computers (Nvidia Jetson series, custom hardware), IoT/Embedded devices. </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 text-center animate-box">
                                <div className="services color-5">
                                    <span className="icon">
                                        <i class="fa fa-superpowers"  aria-hidden="true"></i>
                                    </span>
                                    <div className="desc">
                                        <h3>Turn key use cases </h3>
                                        <p>End-to-end solution for<br /> mechanical parts defect detection, <br />human safety, human activity recognition, <br />sports/fitness monitoring. </p>
                                    </div>
                                </div>
                            </div>
                        
                    </div>
                </div>
            </div>
            </div>
        );
    }
}
