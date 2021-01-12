import React, { Component } from "react";
import User from "./User";
import Confirm from "../layout/Confirm";

class UserAdmin extends Component {
  render() {
    const { id, name, email } = this.props.userData;
    
    return (
      <Confirm 
        title="Confirm"
        description={{
          prefix: "Demote",
          main: name,
          suffix: "to regular user?"
        }}
      >
        {confirm => (
          <User name={name} email={email}>
            <span 
              className="material-icons cursor-pointer" 
              onClick={() => confirm(() => this.props.action(id))}
            >
              person_remove
            </span>
          </User>
        )}
      </Confirm>
    );
  }

}

export default UserAdmin;