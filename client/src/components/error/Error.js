import React, { Component } from "react";
import { Link } from "react-router-dom";

class Error extends Component {
  render() {
    const { cssClass, error, message } = this.props;

    return (
      <div className="container flex-col entire-vh justify-center">
        <div className="row centered">
          <div className="flex-col content-center margin-rl-1">
            <div className={`container bg-img ${cssClass || "error-404"}`}></div>
            <h2 className="error-code">{error || "PAGE NOT FOUND"}</h2>
            <p className="error-message">{message || "The page you are looking for might have been removed, had its name changed or is temporarily unavailable."}</p>
            <Link to="/dashboard" className="btn btn-flex">
              <i className="material-icons left">keyboard_backspace</i>
              Back to dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Error;
