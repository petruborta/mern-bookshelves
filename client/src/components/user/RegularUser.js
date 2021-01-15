import React, { Component } from "react";
import User from "./User";
import Confirm from "../layout/Confirm";

class UserRegular extends Component {
  render() {
    const { id, name, email } = this.props.data;

    return (
      <User name={name}  email={email}>
        <span 
          className="material-icons cursor-pointer" 
          onClick={() =>
            Confirm.show({
              title: "Confirm",
              description: {
                prefix: "Promote",
                main: name,
                suffix: "to admin?"
              },
              callback: () => this.props.action(id)
            })
          }
        >
          person_add
        </span>
      </User>
    );
  }
}

export default UserRegular;
