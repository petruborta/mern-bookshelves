import React, { Component } from "react";
import { Link } from "react-router-dom";

class SuggestingBook extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <Link to="/dashboard" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i>
              Back to dashboard
            </Link>
            <h1>Work in progress</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default SuggestingBook;
