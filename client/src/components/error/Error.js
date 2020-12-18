import React, { Component } from "react";

class Error extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h1>An error has occurred</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Error;