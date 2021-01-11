import React, { Component } from "react";
import User from "./User";

class UserAdmin extends Component {
  render() {
    return (
      <User 
        name={this.props.userData.name} 
        email={this.props.userData.email}
      >
        <span 
          className="material-icons" 
          onClick={() => this.props.action(this.props.userData.id) }
        >
          person_remove
        </span>
      </User>
    );
  }

}

export default UserAdmin;