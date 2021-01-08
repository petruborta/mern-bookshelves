import React, { Component } from "react";
import User from "./User";

class UserRegular extends Component {
  render() {
    return (
      <User
        name={this.props.userData.name} 
        email={this.props.userData.email}
      >
        <span 
          className="material-icons" 
          onClick={() => this.props.action(this.props.userData.id)}
        >
          person_add
        </span>
      </User>
    );
  }
}

export default UserRegular;