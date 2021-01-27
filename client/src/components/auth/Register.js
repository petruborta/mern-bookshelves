import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser, clearErrors } from "../../actions/authActions";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    this.props.clearErrors();

    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { errors: nextErrors } = nextProps;
    
    return nextErrors !== prevState.errors 
      ? { errors: nextErrors }
      : null;
  }

  componentDidUpdate(nextProps) {
    const { errors } = nextProps;
    
    if (this.state.errors === {}) {
      this.setState({ errors });
    }
  }

  onChange = e => {
    const { name: changedProperty, value: newValue } = e.target;
    
    this.setState({ [changedProperty]: newValue });
  };
  
  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    
    this.props.registerUser(newUser, this.props.history); 
  };

  render() {
    const { errors } = this.state;
    
    return (
      <div className="container entire-vh">
        <div className="row centered">
          <div className="col flex-col">
            <Link to="/" className="btn btn-flex">
              <i className="material-icons left">keyboard_backspace</i>Back to home
            </Link>

            <div className="margin-tb-1">
              <h2>Register below</h2>
              <p>Already have an account? <Link to="/login">Log in</Link></p>
            </div>

            <form noValidate onSubmit={this.onSubmit}>
              <div className="margin-b-1">
                <label className="flex-col">
                  Name
                  <input
                      onChange={this.onChange}
                      value={this.state.name}
                      error={errors.name}
                      name="name"
                      type="text"
                      className={classnames("", {
                        invalid: errors.name
                      })}
                    />
                  </label>
                <span className="red-text">{errors.name}</span>
              </div>

              <div className="margin-b-1">
                <label className="flex-col">
                  Email
                  <input
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    name="email"
                    type="email"
                    className={classnames("", {
                      invalid: errors.email
                    })}
                  />
                </label>
                <span className="red-text">{errors.email}</span>
              </div>

              <div className="margin-b-1">
                <label className="flex-col">
                  Password
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    name="password"
                    type="password"
                    className={classnames("", {
                      invalid: errors.password
                    })}
                  />
                </label>
                <span className="red-text">{errors.password}</span>
              </div>

              <div className="margin-b-1">
                <label className="flex-col">
                  Confirm Password
                  <input
                    onChange={this.onChange}
                    value={this.state.password2}
                    error={errors.password2}
                    name="password2"
                    type="password"
                    className={classnames("", {
                      invalid: errors.password2
                    })}
                  />
                </label>
                <span className="red-text">{errors.password2}</span>
              </div>

              <button type="submit" className="btn btn-fit-content">Sign up</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser, clearErrors }
)(withRouter(Register));
