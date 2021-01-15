import React, { Component } from "react";

class User extends Component {
  render() {
    return (
      <div className="table-row">
        <div className="col1">{this.props.name}</div>
        <div className="col2">{this.props.email}</div>
        <div className="col3 action">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default User;
