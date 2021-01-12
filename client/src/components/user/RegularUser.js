import React, { Component } from "react";
import User from "./User";
import Confirm from "../layout/Confirm";

class UserRegular extends Component {
  render() {
    const { id, name, email } = this.props.userData;

    return (
      <Confirm 
        title="Confirm"
        description={{
          prefix: "Promote",
          main: name,
          suffix: "to admin?"
        }}
      >
        {confirm => (
          <User name={name}  email={email}>
            <span 
              className="material-icons cursor-pointer" 
              onClick={() => confirm(() => this.props.action(id))}
            >
              person_add
            </span>
          </User>
        )}
      </Confirm>
    );
  }
}

export default UserRegular;