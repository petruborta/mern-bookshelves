import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchRegularUsers, fetchAdminUsers, makeAdmin, removeAdmin } from "../../actions/userActions";
import RegularUser from "../user/RegularUser";
import AdminUser from "../user/AdminUser";

class ManagingAdmins extends Component {
  constructor() {
    super();
    this.state = {
      userInput: "",
      userType: "default",
      searchOption: "name",
      users: []
    };
  }

  onChange = e => {
    const {
      name: changedProperty,
      value: newValue
    } = e.target;

    this.setState({ [changedProperty]: newValue });
  };
  
  componentDidMount() {
    const { user } = this.props.auth;
    
    this.props.fetchRegularUsers();
    this.props.fetchAdminUsers(user.id);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.userType === "default") return null;

    const { user } = nextProps.auth;

    const isNotEmpty = prop => prop !== "";
    const filter = (users, { searchOption, userInput }) => {
      const regExp = new RegExp(userInput.trim(), "i");

      return users.filter(user => 
        user[searchOption].match(regExp)
      );
    };

    const nextUsers = isNotEmpty(prevState.userInput) 
      ? filter(user.usersAtlas[prevState.userType], prevState)
      : user.usersAtlas[prevState.userType];
    
    return nextUsers !== prevState.users
      ? { users: nextUsers }
      : null;
  }

  createUserComponents(UserType, funcBody) {
    return this.state.users.map(user => (
      <UserType
        key={user.id}
        userData={{
          id: user.id,
          name: user.name,
          email: user.email
        }}
        action={funcBody}
      />
    )); 
  }

  renderUsers() {  
    switch(this.state.userType) {
      case "regularUsers":
        return this.createUserComponents(RegularUser, this.props.makeAdmin);
      case "adminUsers":
        return this.createUserComponents(AdminUser, this.props.removeAdmin);
      default:
        return null;
    }
  }

  render() {
    return(
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="search-form-container">
            <Link to="/dashboard" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i>
              Back to dashboard
            </Link>

            <form>
              <div className="col s12">
                <label htmlFor="userInput">Search for...</label>
                <input
                  type="text"
                  name="userInput"
                  value={this.state.userInput}
                  onChange={this.onChange}
                />
              </div>

              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <p>Please select where to search in:</p>
                <label>
                  <input 
                    type="radio" 
                    name="searchOption" 
                    value="name" 
                    checked={this.state.searchOption === "name"}
                    onChange={this.onChange}
                  />
                  Name
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="searchOption" 
                    value="email"
                    checked={this.state.searchOption === "email"}
                    onChange={this.onChange}
                  />
                  Email
                </label>
              </div>
            </form>
          </div>

          <div className="select-field">
            <label htmlFor="userType">User type:</label>
            <select 
              name="userType"
              value={this.state.userType}
              onChange={this.onChange}
            >
              <option value="default">Select user type</option>
              <option value="regularUsers">Regular Users</option>
              <option value="adminUsers">Admin Users</option>
            </select>
          </div>

          <div className={this.state.userType === "default" ? "invisible" : ""}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th className="user-action">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.renderUsers()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

ManagingAdmins.propTypes = {
  fetchRegularUsers: PropTypes.func.isRequired,
  fetchAdminUsers: PropTypes.func.isRequired,
  makeAdmin: PropTypes.func.isRequired,
  removeAdmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { fetchRegularUsers, fetchAdminUsers, makeAdmin, removeAdmin }
)(ManagingAdmins);