import React, { Component } from 'react';
import { Col, } from 'reactstrap';

import '../../App.css'

import Theiaimg from '../../image/Theiaimg.jpg';
import ServOverview from '../../image/ServiceOverview.png';

import { Helmet } from "react-helmet";



export default class Theia extends Component {
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
                    <title>Data Mesh and Data Product Portal</title>
                    <meta name="description" content="Data Mesh, Data Product, Data Product catalog, Data Platform Services, Data Product Publish, Data Product Monitoring" />
                    {/* <link rel="canonical" href="" /> */}
                </Helmet>

                <div className=" row container-fluid " md="12" sm="12" xs="12" lg="12" xl="12">
                    <div className="td__htp mb_20" >
                        <div className=" td__htp-content" md="6" sm="6" xs="6" lg="6" xl="6">
                            <h2>Theia</h2>
                                 <h3><br />Theia is an easy to use portal  that provides a single pane of glass view of your data products   and data mesh, ability to manage and govern them in a cost effective manner. ​</h3>
                        </div>

                        <div className="td__header-image mb_20 " md="6" sm="6" xs="6" lg="6" xl="6">
                            <img src={Theiaimg} />
                        </div>
                    </div>
                </div>
                <div className=" row container-fluid " md="12" sm="12" xs="12" lg="12" xl="12">
                    <div className="td__htp mb_20" >
                        <div className=" td__htp-content" md="6" sm="6" xs="6" lg="6" xl="6">
                            <h2>Overview</h2>
                                <h3> Theia portal helps businesses with accelerated adoption  of data product and data mesh architecture.  <br />It provides the template for provisioning cloud hardware and services to extract, transform and load data products with the highest quality to the data mesh.  ​</h3>
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
                                        <h3>Manage Data Products</h3>
                                        <p>Publish, maintain and monitor <br />domain based data products; easy discoverability of the available data in a centralized place to get a 360 degree view of your customers and operations.  </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 text-center animate-box">
                                <div className="services color-1">
                                    <span className="icon">
                                        <i class="fa fa-desktop"  aria-hidden="true"></i>
                                    </span>
                                    <div className="desc">
                                        <h3>Platform Services and Governance </h3>
                                        <p>Minimize the cognitive load of your domain teams by automating  the creation of data platform to publish the data products by using pre-defined templates (on-prem, AWS, Azure and GCP with connectors for your data sources).</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 text-center animate-box">
                                <div className="services color-5">
                                    <span className="icon">
                                        <i class="fa fa-superpowers"  aria-hidden="true"></i>
                                    </span>
                                    <div className="desc">
                                        <h3>Deploy Anywhere</h3>
                                        <p>Deploy the portal <br />and <br />its services <br />in your choice of <br />infrastructure. </p>
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
