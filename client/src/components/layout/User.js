import React, { Component } from "react";

class User extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.email}</td>
        <td className="action">
          {this.props.children}
        </td>
      </tr>
    );
  }
}

export default User;