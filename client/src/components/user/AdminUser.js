import React, { Component } from "react";
import User from "./User";
import Confirm from "../layout/Confirm";

class UserAdmin extends Component {
  render() {
    const { id, name, email } = this.props.userData;
    
    return (
      <User name={name} email={email}>
        <span 
          className="material-icons cursor-pointer" 
          onClick={() =>
            Confirm.show({
              title: "Confirm",
              description: {
                prefix: "Demote",
                main: name,
                suffix: "to regular user?"
              },
              callback: () => this.props.action(id)
            })
          }
        >
          person_remove
        </span>
      </User>
    );
  }
}

export default UserAdmin;
