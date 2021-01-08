import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchRegularUsers, fetchAdminUsers, makeAdmin, removeAdmin } from "../../actions/userActions";
import classnames from "classnames";
import UserRegular from "./UserRegular";
import UserAdmin from "./UserAdmin";

class ManagingAdmins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      userType: "default",
      errors: {}
    };
  }

  componentDidMount() {
    this.props.fetchRegularUsers();
    this.props.fetchAdminUsers();
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

  };

  onUserTypeChange = e => {
    this.setState({ userType: e.target.value });
  };

  renderUsers() {
    const { adminUsers, regularUsers } = this.props.auth.user.usersAtlas;
    
    switch(this.state.userType) {
      case "regular-users":
        return this.createUserComponents(regularUsers, UserRegular, this.props.makeAdmin);
      case "admin-users":
        return this.createUserComponents(adminUsers, UserAdmin, this.props.removeAdmin);
      default:
        return (null);
    }
  }
  
  createUserComponents(users, UserType, funcBody) {
    return users.map(user => (
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

  render() {
    const { errors } = this.state;

    return(
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="search-form-container">
            <Link to="/dashboard" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i>
              Back to dashboard
            </Link>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.userInput}
                  error={errors.userInput}
                  id="userInput"
                  type="text"
                  className={classnames("", {
                    invalid: errors.userInput
                  })}
                />
                <label htmlFor="userInput">Search for...</label>
                <span className="red-text">{errors.password2}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          <div className="select-field">
            <label htmlFor="userType">Type:</label>
            <select 
              name="userType" 
              id="userType"
              onChange={this.onUserTypeChange} 
              value={this.state.userType}
            >
              <option value="default">Select type</option>
              <option value="regular-users">Users</option>
              <option value="admin-users">Administrators</option>
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
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { fetchRegularUsers, fetchAdminUsers, makeAdmin, removeAdmin }
)(ManagingAdmins);