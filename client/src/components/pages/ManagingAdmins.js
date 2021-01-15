import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchRegularUsers, fetchAdminUsers, makeAdmin, removeAdmin } from "../../actions/userActions";
import RegularUser from "../user/RegularUser";
import AdminUser from "../user/AdminUser";
import Pagination from "../layout/Pagination";

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

  createPagination(UserType, funcBody) {
    const users = this.state.users.map(user => {
      return {
        id: user.id,
        name: user.name,
        email: user.email
      };
    });
    
    return (
      <Pagination 
        key={`${new Date().getTime()}`}
        data={{
          elements: users,
          elementsType: UserType,
          action: funcBody
        }} 
      />
    );
  }

  renderPagination() {  
    switch(this.state.userType) {
      case "regularUsers":
        return this.createPagination(RegularUser, this.props.makeAdmin);
      case "adminUsers":
        return this.createPagination(AdminUser, this.props.removeAdmin);
      default:
        return null;
    }
  }

  render() {
    const { userInput, userType, searchOption } = this.state;

    return (
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
                  value={userInput}
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
                    checked={searchOption === "name"}
                    onChange={this.onChange}
                  />
                  Name
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="searchOption" 
                    value="email"
                    checked={searchOption === "email"}
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
              value={userType}
              onChange={this.onChange}
            >
              <option value="default">Select user type</option>
              <option value="regularUsers">Regular Users</option>
              <option value="adminUsers">Admin Users</option>
            </select>
          </div>

          <div className={`table ${userType === "default" ? "invisible" : ""}`}>
            <div className="table-header-row">
              <div className="col1">Name</div>
              <div className="col2">Email</div>
              <div className="col3 action">Action</div>
            </div>
            <div className="users">
              {this.renderPagination()}
            </div>
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
