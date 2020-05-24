import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { HOME, BLOG, ABOUT, CONTACT } from '../globals'
import './navbar.css';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navMobileOpen: false
        }
    }

    toggleNavBar = () => {
        this.setState(prevstate => ({
            navMobileOpen: !prevstate.navMobileOpen
        }))
    }

    render() {
        return (
            <div className="navigation-container">
                <div className="navbar-mobile-container">
                    <div className="nav-menu-btn" onClick={this.toggleNavBar}>
                        <span id="one"></span>
                        <span id="two"></span>
                        <span id="three"></span>
                    </div>
                    <div id="mobile-nav" className={this.state.navMobileOpen ? "nav-menu-mobile-overlay show-overlay" : "nav-menu-mobile-overlay"}>
                        <div className={this.state.navMobileOpen ? "nav-menu-mobile show-nav-menu-mobile " : "nav-menu-mobile"}>
                            <div className="closebtn" onClick={this.toggleNavBar}>&times;</div>
                            <div className="nav-mobile-btn-container">
                                <Link onClick={this.toggleNavBar} to="/" className="nav-mobile-btn">
                                    <FontAwesomeIcon className="nav-icon" icon={faHome} />
                                    <p className="nav-text">{HOME}</p>
                                </Link>
                                <Link onClick={this.toggleNavBar} to="/blog" className="nav-mobile-btn">
                                    <FontAwesomeIcon className="nav-icon" icon={faHome} />
                                    <p className="nav-text">{BLOG}</p>
                                </Link>
                                <Link onClick={this.toggleNavBar} to="/about" className="nav-mobile-btn">
                                    <FontAwesomeIcon className="nav-icon" icon={faHome} />
                                    <p className="nav-text">{ABOUT}</p>
                                </Link>
                                <Link onClick={this.toggleNavBar} to="/contact" className="nav-mobile-btn">
                                    <FontAwesomeIcon className="nav-icon" icon={faHome} />
                                    <p className="nav-text">{CONTACT}</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="navbar-container">

                </div>

            </div>
        )
    }
}

export default Navbar;