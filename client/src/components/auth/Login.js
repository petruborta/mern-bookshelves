import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser, clearErrors } from "../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
    if (this.props.auth.isAuthenticated) {
      this.props.clearErrors();
      this.props.history.push("/dashboard");
    }
  }

  onChange = e => {
    const { name: changedProperty, value: newValue } = e.target;
    
    this.setState({ [changedProperty]: newValue });
  };

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    
    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
    
    return (
      <div className="container entire-vh">
        <div className="row centered">
          <div className="col flex-col">
            <Link to="/" className="btn btn-flex">
              <i className="material-icons left">keyboard_backspace</i> Back to home
            </Link>

            <div className="margin-tb-1">
              <h2>Login below</h2>
              <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>

            <form noValidate onSubmit={this.onSubmit}>
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
                      invalid: errors.email || errors.emailnotfound
                    })}
                  />
                </label>
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
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
                      invalid: errors.password || errors.passwordincorrect
                    })}
                  />
                </label>
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>

              <button type="submit" className="btn btn-fit-content">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
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
  { loginUser, clearErrors }
)(Login);
