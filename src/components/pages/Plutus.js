import React, { Component } from 'react';

import '../../App.css'

import Plutusimg from '../../image/Plutusimg1.jpg';
import ServOverview from '../../image/ServiceOverview.png';
import { Helmet } from "react-helmet";
var mContext;


export default class Plutus extends Component {
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
        window.scrollTo(0, 50);
    }

    render() {
        return (
            <div className="container-fluid td__top">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Data Product Catalog</title>
                    <meta name="description" content="Data Product Catalog, Data Product Observability, Data Product Discoverability" />
                    {/* <link rel="canonical" href="" /> */}
                </Helmet>

                <div className=" row container-fluid " md="12" sm="12" xs="12" lg="12" xl="12">
                    <div className="td__htp mb_20" >
                        <div className=" td__htp-content" md="6" sm="6" xs="6" lg="6" xl="6">
                            <h2>Plutus</h2>
                               <h3><br />Plutus is  a modern Data Product Catalog <br />that provides 360 view of available products, <br /> its attributes, data quality, lineage and many other characteristics. ​</h3>
                        </div>

                        <div className="td__header-image mb_20 " md="6" sm="6" xs="6" lg="6" xl="6">
                            <img src={Plutusimg} />
                        </div>
                    </div>
                </div>
                <div className=" row container-fluid " md="12" sm="12" xs="12" lg="12" xl="12">
                    <div className="td__htp mb_20" >
                        <div className=" td__htp-content" md="6" sm="6" xs="6" lg="6" xl="6">
                        <h2>Overview</h2>
                        <h3>Plutus enables discoverability and obseravability<br /> of your data products in either a data mesh <br />or as stand-alone products enabling self-serve capabilities with excellent data literacy.  ​</h3>

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
                                        <h3>Data Product Management </h3>
                                        <p>Publish, maintain and monitor domain based data products; easy discoverability of the available data in a centralized place to get a 360 degree view of your customers and operations. </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 text-center animate-box">
                                <div className="services color-1">
                                    <span className="icon">
                                        <i class="fa fa-desktop"  aria-hidden="true"></i>
                                    </span>
                                    <div className="desc">
                                        <h3>Discoverability</h3>
                                        <p>Search your data products using <br />keyword and natural language and apply for creation of reports, analytics and machine learning models.</p>
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
                                        <p>Deploy the portal and <br />its services <br />in your choice of <br />infrastructure. </p>
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
