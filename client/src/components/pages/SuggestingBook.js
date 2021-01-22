import React, { Component } from "react";
import { Link } from "react-router-dom";

class SuggestingBook extends Component {
  render() {
    return (
      <div className="container entire-vh">
        <div className="row centered">
          <div className="flex-col content-center margin-rl-1">
            <div className="container bg-img under-construction"></div>
            <h1 className="error-code">UNDER CONSTRUCTION</h1>
            <p className="error-message">This page is currently in development. We will announce you when it's done.</p>
            <Link to="/dashboard" className="btn btn-back">
              <i className="material-icons left">keyboard_backspace</i>
              Back to dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SuggestingBook;
