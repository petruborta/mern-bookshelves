import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Error from "../error/Error";

const PrivateRoute = ({ component, auth, ...rest }) => {
  let Component;
  const adminRoutes = ["SearchingBooksAPI", "ManagingBooks", "ManagingAdmins"];

  if (Array.isArray(component)) {
    const Dashboard = component[0];
    const AdminDashboard = component[1];
    Component = !auth.user.isAdmin ? Dashboard : AdminDashboard;
  } 
  else {
    Component = component;
  }

  return (
    <Route
      {...rest}
      render={props => {
        if (auth.isAuthenticated) {
          if (!auth.user.isAdmin 
            && Component.hasOwnProperty("WrappedComponent") 
            && adminRoutes.includes(Component["WrappedComponent"].name)) {
              return <Error message={"Access denied/forbidden"} />;
          }
          else {
            return <Component {...props} />;
          }
        }
        else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
