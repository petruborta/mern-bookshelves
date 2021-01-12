import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo-sm.png";

class Navbar extends Component {
  render() {
    return (
      <header className="site-header">      
          <nav className="header-main-nav">
            <div className="logo-container">
              <Link to="/" className="logo">
                <img src={logo} alt="bookshelves logo" className="logo-img"/>
                Bookshelves
              </Link>
            </div>

            <div className="header-right-nav">
              <Link to="/register" className="btn">Register</Link>
              <Link to="/login" className="btn">Log In</Link>
            </div>

            <div className="header-menu-btn">
              <div className="header-menu-btn-lines"></div>
            </div>
          </nav>
      </header>
    );
  }
}

export default Navbar;
