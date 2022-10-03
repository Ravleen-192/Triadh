import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import logo from '../../image/logo_new.png'
import icon1 from '../../image/heliosicon.jpg';
import icon2 from '../../image/theiaIcon.jpg';
import icon3 from '../../image/plutusIcon.jpg';
import './Navbar.styles.css'
import '../../App.css'
import '../../css/TrayMenu.css'

function Navigate() {
    const [click, setClick] = useState(false);
    const [tmClick, settmClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const handletmClose = () => { settmClick(false); }
    const handletmClick = () => {

        settmClick(!tmClick);
        setClick(false);
    }
    const handleSignin = () => {
        var url = "https://master.d36f8cafq27e48.amplifyapp.com/";
        window.open(url, "_blank");
    }
    const closeMobileMenu = () => { setClick(false); settmClick(false); }

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, [])

    window.addEventListener('resize', showButton);

    let drawerClasses = 'side-drawer open row container-fuild';
    return (
        <>  {(tmClick === true) ?

            <div>

                <nav className='navbar'>
                    <div className='navbar-container'>
                        <Link to="/" className='navbar-logo nav-item' onClick={closeMobileMenu}>

                            <img
                                src={logo}
                                alt="Triadh"
                            />
                        </Link>
                        <div className='menu-icon' onClick={handleClick}>
                            <i className={click ? "fas fa-times" : "fas fa-bars"} />
                        </div>
                        <ul className={click ? "nav-menu active" : "nav-menu"}>
                            <li className="nav-item">
                                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/services" className="nav-links" onClick={closeMobileMenu}>
                                    Services
                                </Link>
                            </li>
                            <li className="nav-item">
                                <div className="nav-links" onClick={handletmClick}>
                                    Products
                                </div>
                            </li>

                            <li className="nav-item">
                                <Link
                                    to="/company"
                                    className="nav-links"
                                    onClick={closeMobileMenu}
                                >
                                    Company
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to="/whitepaper"
                                    className="nav-links"
                                    onClick={closeMobileMenu}
                                >
                                    Whitepaper  <i class="fa fa-download" aria-hidden="true"></i>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <div className="nav-links" onClick={handleSignin}>
                                    Signin
                                </div>
                            </li>
                            <button className="frmbtn2">
                                <Link
                                    to="/contact"

                                    onClick={closeMobileMenu}
                                >
                                    Lets Talk
                                </Link>
                            </button>

                        </ul>


                    </div>
                </nav>
                <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasWithBackdrop" aria-labelledby="offcanvasWithBackdropLabel">

                    <div class="offcanvas-body">
                        <nav className={drawerClasses}>

                            <button class="closebtn" onClick={handletmClose}>&times;</button>
                            <div className="  td__Prodheader-content prod-text" onClick={handletmClose}>

                                <Link to="/Helios" >
                                    <img
                                        src={icon1}
                                        alt="Helios"
                                    />
                                    <h3 >Helios</h3>
                                    <p>Vision platform</p>
                                </Link>
                            </div>
                            <div className="  td__Prodheader-content  prod-text" onClick={handletmClose}>
                                <Link to="/Theia">
                                    <img
                                        src={icon2}
                                        alt="Theia"
                                    />

                                    <h3 >Theia</h3>
                                    <p>Data mesh portal </p>
                                </Link>

                            </div>
                            <div className="  td__Prodheader-content  prod-text" onClick={handletmClose}>
                                <Link to="/Plutus">
                                    <img
                                        src={icon3}
                                        alt="Plutus"
                                    />

                                    <h3 >Plutus </h3>
                                    <p>Data product catalog</p>
                                </Link>

                            </div>
                        </nav>
                    </div>
                </div>
            </div> :
            <div>
                <nav className='navbar ' >
                    <div className='navbar-container'>
                        <Link to="/" className='navbar-logo nav-item' onClick={closeMobileMenu}>

                            <img
                                src={logo}
                                alt="Triadh"
                            />
                        </Link>
                        <div className='menu-icon' onClick={handleClick}>
                            <i className={click ? "fas fa-times" : "fas fa-bars"} />
                        </div>
                        <ul className={click ? "nav-menu active" : "nav-menu"}>
                            <li className="nav-item">
                                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/services" className="nav-links" onClick={closeMobileMenu}>
                                    Services
                                </Link>
                            </li>

                            <li className="nav-item">
                                <div className="nav-links" onClick={handletmClick}>
                                    Products
                                </div>
                            </li>

                            <li className="nav-item">
                                <Link
                                    to="/company"
                                    className="nav-links"
                                    onClick={closeMobileMenu}
                                >
                                    Company
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to="/whitepaper"
                                    className="nav-links"
                                    onClick={closeMobileMenu}
                                >
                                    <i class="fa fa-download" aria-hidden="true"></i> 
                                </Link>
                            </li>

                            <li className="nav-item">
                                <div className="nav-links" onClick={handleSignin}>
                                    Signin
                                </div>
                            </li>
                            <button className="frmbtn2">
                                <Link
                                    to="/contact"

                                    onClick={closeMobileMenu}
                                >
                                    Lets Talk
                                </Link>
                            </button>

                        </ul>


                    </div>
                </nav>
            </div>}

        </>
    )
}

export default Navigate